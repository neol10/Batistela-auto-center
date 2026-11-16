import React, { useEffect, useRef, useState, useCallback } from 'react';
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap';
import { SITE_CONFIG } from '@/config/siteConfig';
import { Container } from '@/components/common/Container';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface EditorialMoment {
  id: string;
  startPct: number;
  endPct: number;
  title: string;
  text: string;
}

export const EDITORIAL_MOMENTS: EditorialMoment[] = [
  {
    id: 'moment-1',
    startPct: 0,
    endPct: 22,
    title: 'ENGENHARIA DE PRECISÃO.',
    text: 'Atenção aos detalhes que fazem a diferença na sua experiência ao dirigir.',
  },
  {
    id: 'moment-2',
    startPct: 25,
    endPct: 50,
    title: 'TECNOLOGIA EM MOVIMENTO.',
    text: 'Alinhamento 3D e balanceamento para uma condução mais estável e segura.',
  },
  {
    id: 'moment-3',
    startPct: 55,
    endPct: 78,
    title: 'CUIDADO EM CADA ESCOLHA.',
    text: 'Pneus, rodas e serviços automotivos pensados para o seu veículo.',
  },
  {
    id: 'moment-4',
    startPct: 82,
    endPct: 100,
    title: 'PRONTO PARA SEGUIR.',
    text: 'A confiança de contar com a Batistela Auto Center.',
  },
];

// Limiar mínimo de diferença de tempo (em segundos) para evitar seeks redundantes (~0.75 frame a 30fps)
const MIN_SEEK_DELTA_SEC = 0.025;
// Timeout para detectar falha persistente de seek (ms)
const SEEK_TIMEOUT_MS = 2200;

interface ScrollTelemetry {
  seeksIssued: number;
  seeksCompleted: number;
  seeksCoalesced: number;
  lastSeekLatencyMs: number;
  maxSeekLatencyMs: number;
  videoLoadTimeMs: number | null;
  fallbackActive: boolean;
  fallbackReason: string | null;
}

declare global {
  interface Window {
    __BATISTELA_SCROLL_TELEMETRY__?: ScrollTelemetry;
  }
}

function detectSaveData(): boolean {
  if (typeof navigator === 'undefined') return false;
  const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
  return Boolean(conn?.saveData);
}

export const CinematicScroll: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const pinStageRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const prefersReducedMotion = useReducedMotion();
  const [saveDataEnabled] = useState<boolean>(() => detectSaveData());
  const [videoError, setVideoError] = useState<boolean>(false);
  const [persistentSeekFailure, setPersistentSeekFailure] = useState<boolean>(false);
  const [isVideoReady, setIsVideoReady] = useState<boolean>(false);

  // Refs de controle da sincronização de vídeo sem re-renderizações do React
  const hasRequestedLoadRef = useRef<boolean>(false);
  const loadStartTimestampRef = useRef<number | null>(null);
  const durationRef = useRef<number>(0);
  const targetTimeRef = useRef<number>(0);
  const pendingTimeRef = useRef<number | null>(null);
  const rafIdRef = useRef<number | null>(null);
  const seekStartTimeRef = useRef<number>(0);
  const consecutiveSeekTimeoutsRef = useRef<number>(0);

  // Determina se o modo fallback estático (sem pin obrigatório) deve estar ativo
  const fallbackReason = prefersReducedMotion
    ? 'prefers-reduced-motion'
    : saveDataEnabled
      ? 'save-data'
      : videoError
        ? 'video-error'
        : persistentSeekFailure
          ? 'persistent-seek-failure'
          : null;

  const isFallbackMode = fallbackReason !== null;

  // Inicializa telemetria de diagnóstico para inspeção técnica
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.__BATISTELA_SCROLL_TELEMETRY__ = {
        seeksIssued: 0,
        seeksCompleted: 0,
        seeksCoalesced: 0,
        lastSeekLatencyMs: 0,
        maxSeekLatencyMs: 0,
        videoLoadTimeMs: null,
        fallbackActive: isFallbackMode,
        fallbackReason,
      };
    }
  }, [isFallbackMode, fallbackReason]);

  // Função controlada de sincronização de currentTime respeitando o decodificador
  const commitVideoSeek = useCallback((desiredTime: number) => {
    const video = videoRef.current;
    if (!video || durationRef.current <= 0 || video.readyState < 1) return;

    // Garante que o vídeo nunca entre em reprodução contínua automática
    if (!video.paused) {
      video.pause();
    }

    // Clamping seguro para evitar fim de stream (ended state) que pode piscar quadro preto
    const maxSafeTime = Math.max(durationRef.current - 0.04, 0);
    const clampedTime = Math.min(Math.max(desiredTime, 0.001), maxSafeTime);

    const delta = Math.abs(video.currentTime - clampedTime);
    if (delta < MIN_SEEK_DELTA_SEC) {
      if (window.__BATISTELA_SCROLL_TELEMETRY__) {
        window.__BATISTELA_SCROLL_TELEMETRY__.seeksCoalesced += 1;
      }
      return;
    }

    // Se o navegador ainda está decodificando um seek anterior, guarda apenas o último alvo
    if (video.seeking) {
      const now = performance.now();
      if (seekStartTimeRef.current > 0 && now - seekStartTimeRef.current > SEEK_TIMEOUT_MS) {
        consecutiveSeekTimeoutsRef.current += 1;
        seekStartTimeRef.current = now;
        // No mobile, não ativa modo estático agressivamente por latência transitória de decodificação
        if (consecutiveSeekTimeoutsRef.current >= 8) {
          setPersistentSeekFailure(true);
          return;
        }
      } else {
        pendingTimeRef.current = clampedTime;
        if (window.__BATISTELA_SCROLL_TELEMETRY__) {
          window.__BATISTELA_SCROLL_TELEMETRY__.seeksCoalesced += 1;
        }
        return;
      }
    }

    try {
      seekStartTimeRef.current = performance.now();
      pendingTimeRef.current = null;
      video.currentTime = clampedTime;
      if (window.__BATISTELA_SCROLL_TELEMETRY__) {
        window.__BATISTELA_SCROLL_TELEMETRY__.seeksIssued += 1;
      }
    } catch {
      setVideoError(true);
    }
  }, []);

  const scheduleVideoSync = useCallback(
    (normalizedProgress: number) => {
      if (durationRef.current <= 0) return;
      targetTimeRef.current = normalizedProgress * durationRef.current;

      if (rafIdRef.current !== null) return;
      rafIdRef.current = window.requestAnimationFrame(() => {
        rafIdRef.current = null;
        commitVideoSeek(targetTimeRef.current);
      });
    },
    [commitVideoSeek]
  );

  // Pré-carregamento antecipado ao se aproximar da seção (evita peso na primeira dobra)
  useEffect(() => {
    if (isFallbackMode) return;
    const sectionEl = sectionRef.current;
    const videoEl = videoRef.current;
    if (!sectionEl || !videoEl) return;

    const triggerVideoLoad = () => {
      if (hasRequestedLoadRef.current) return;
      hasRequestedLoadRef.current = true;
      loadStartTimestampRef.current = performance.now();
      videoEl.preload = 'auto';
      // Desperta o pipeline de decodificação móvel (iOS Safari / Android Chrome)
      const playPromise = videoEl.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            videoEl.pause();
          })
          .catch(() => {
            // Em caso de restrição de autoplay, carrega os dados diretamente
            videoEl.load();
          });
      } else {
        videoEl.load();
      }
    };

    if (typeof IntersectionObserver === 'undefined') {
      triggerVideoLoad();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            triggerVideoLoad();
            observer.disconnect();
            break;
          }
        }
      },
      {
        // Inicia o carregamento quando o usuário rola pela seção institucional (~350px antes da seção)
        rootMargin: '350px 0px 350px 0px',
        threshold: 0.01,
      }
    );

    observer.observe(sectionEl);

    return () => {
      observer.disconnect();
      if (rafIdRef.current !== null) {
        window.cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
    };
  }, [isFallbackMode]);

  // Handlers nativos do elemento <video>
  const handleLoadedMetadata = () => {
    const video = videoRef.current;
    if (!video) return;

    video.pause();
    const dur = Number.isFinite(video.duration) && video.duration > 0 ? video.duration : 16.667;
    durationRef.current = dur;

    if (loadStartTimestampRef.current !== null && window.__BATISTELA_SCROLL_TELEMETRY__) {
      window.__BATISTELA_SCROLL_TELEMETRY__.videoLoadTimeMs = Math.round(
        performance.now() - loadStartTimestampRef.current
      );
    }

    // Posiciona no primeiro frame real ou no progresso já atingido pelo usuário
    const initialTarget = targetTimeRef.current > 0 ? targetTimeRef.current : 0.001;
    commitVideoSeek(initialTarget);
  };

  const handleLoadedData = () => {
    setIsVideoReady(true);
  };

  const handleSeeked = () => {
    consecutiveSeekTimeoutsRef.current = 0;
    if (seekStartTimeRef.current > 0) {
      const latency = performance.now() - seekStartTimeRef.current;
      seekStartTimeRef.current = 0;
      if (window.__BATISTELA_SCROLL_TELEMETRY__) {
        const tel = window.__BATISTELA_SCROLL_TELEMETRY__;
        tel.seeksCompleted += 1;
        tel.lastSeekLatencyMs = Number(latency.toFixed(2));
        if (latency > tel.maxSeekLatencyMs) {
          tel.maxSeekLatencyMs = Number(latency.toFixed(2));
        }
      }
    }

    // Se houve rolagem enquanto o decodificador estava ocupado, aplica o último tempo-alvo pendente
    if (pendingTimeRef.current !== null) {
      const nextTime = pendingTimeRef.current;
      pendingTimeRef.current = null;
      commitVideoSeek(nextTime);
    }
  };

  const handleVideoError = () => {
    setVideoError(true);
  };

  // Configuração principal do GSAP ScrollTrigger + Timeline dos 4 momentos editoriais
  useGSAP(
    () => {
      if (isFallbackMode || !pinStageRef.current) return;

      const { mm, conditions } = {
        mm: gsap.matchMedia(),
        conditions: {
          isDesktop: '(min-width: 768px)',
          isMobile: '(max-width: 767px)',
        },
      };

      mm.add(conditions, (context) => {
        const { isDesktop } = context.conditions as { isDesktop: boolean; isMobile: boolean };

        // Distância de scroll ampliada em +50% para cadência cinematográfica mais lenta e confortável:
        // Desktop: +=390% (anterior: +=260%) | Mobile: +=330% (anterior: +=220%)
        const scrollDistance = isDesktop ? '+=390%' : '+=330%';

        // Estado inicial dos 4 momentos editoriais:
        // Momento 1 começa visível (0% a 22%); Momentos 2, 3 e 4 começam ocultos abaixo
        gsap.set('[data-moment="0"]', { opacity: 1, y: 0 });
        gsap.set('[data-moment="1"], [data-moment="2"], [data-moment="3"]', {
          opacity: 0,
          y: 28,
        });

        // Timeline normalizada com duração total = 100 unidades (1 unidade = 1% do progresso)
        const tl = gsap.timeline({
          defaults: { ease: 'power2.inOut' },
          scrollTrigger: {
            id: 'cinematic-scroll-trigger',
            trigger: pinStageRef.current,
            start: 'top top',
            end: scrollDistance,
            pin: true,
            pinSpacing: true,
            scrub: 0.35,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            refreshPriority: 0,
            onUpdate: (self) => {
              scheduleVideoSync(self.progress);
            },
          },
        });

        // Ancora a duração exata da timeline em 100 unidades para sincronizar os 4 momentos editoriais
        tl.to({}, { duration: 100 }, 0);

        // MOMENTO 1 — 0% A 22% (Inicia visível em 0, sai suavemente entre 18 e 22)
        tl.to(
          '[data-moment="0"]',
          {
            opacity: 0,
            y: -22,
            duration: 4,
          },
          18
        );

        // MOMENTO 2 — 25% A 50% (Entra entre 25 e 30, permanece até 46, sai entre 46 e 50)
        tl.to(
          '[data-moment="1"]',
          {
            opacity: 1,
            y: 0,
            duration: 5,
          },
          25
        ).to(
          '[data-moment="1"]',
          {
            opacity: 0,
            y: -22,
            duration: 4,
          },
          46
        );

        // MOMENTO 3 — 55% A 78% (Entra entre 55 e 60, permanece até 74, sai entre 74 e 78)
        tl.to(
          '[data-moment="2"]',
          {
            opacity: 1,
            y: 0,
            duration: 5,
          },
          55
        ).to(
          '[data-moment="2"]',
          {
            opacity: 0,
            y: -22,
            duration: 4,
          },
          74
        );

        // MOMENTO 4 — 82% A 100% (Entra entre 82 e 87 e permanece firme até 100% ao liberar o pin)
        tl.to(
          '[data-moment="3"]',
          {
            opacity: 1,
            y: 0,
            duration: 5,
          },
          82
        );
      });

      // Garante recálculo preciso após montagem do layout pinado
      ScrollTrigger.refresh();

      return () => {
        mm.revert();
      };
    },
    { scope: sectionRef, dependencies: [isFallbackMode, scheduleVideoSync] }
  );

  return (
    <section
      id="experiencia"
      ref={sectionRef}
      aria-label="Experiência Cinematográfica Interativa Batistela Auto Center"
      data-fallback-active={isFallbackMode ? 'true' : 'false'}
      data-fallback-reason={fallbackReason ?? ''}
      className="relative bg-obsidian text-text-white overflow-hidden"
    >
      {/* RENDERIZAÇÃO DE FALLBACK ESTÁTICO E ACESSÍVEL (prefers-reduced-motion, Save-Data ou erro no vídeo) */}
      {isFallbackMode && (
        <div className="py-20 sm:py-28 border-t border-white/[0.06]">
          <Container className="relative z-10 space-y-12">
            {/* Cabeçalho da seção no modo estático */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-border-metallic pb-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-accent-red" aria-hidden="true" />
                  <span className="font-mono text-xs uppercase tracking-[0.22em] text-text-chrome">
                    EXPERIÊNCIA BATISTELA
                  </span>
                </div>
                <h2
                  id="experiencia-fallback-heading"
                  className="font-display text-2xl sm:text-4xl font-bold uppercase tracking-tight text-white"
                >
                  PRECISÃO EM CADA ETAPA.
                </h2>
              </div>
              <span className="font-mono text-xs text-text-chrome/70 uppercase tracking-widest">
                MODO ACESSÍVEL ESTÁTICO
              </span>
            </div>

            {/* Quadro visual com o poster oficial */}
            <div className="relative rounded-2xl overflow-hidden border border-border-metallic bg-carbon aspect-[16/9] max-h-[480px] w-full">
              <img
                src={SITE_CONFIG.media.scrollPoster}
                alt="Visão cinematográfica do cuidado automotivo na Batistela Auto Center"
                className="w-full h-full object-cover object-center"
                loading="lazy"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/40 to-transparent"
                aria-hidden="true"
              />
              <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 flex items-center justify-between">
                <span className="font-mono text-xs uppercase tracking-widest text-white/90 bg-obsidian/80 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-white/10">
                  BATISTELA AUTO CENTER • ENGENHEIRO COELHO
                </span>
              </div>
            </div>

            {/* Os 4 momentos editoriais exibidos sem pinning obrigatório */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
              {EDITORIAL_MOMENTS.map((moment) => (
                <article
                  key={moment.id}
                  className="rounded-2xl p-6 sm:p-8 bg-graphite/60 border border-border-metallic flex flex-col justify-between space-y-2"
                >
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-white tracking-tight">
                    {moment.title}
                  </h3>
                  <p className="text-sm sm:text-base text-text-chrome leading-relaxed">
                    {moment.text}
                  </p>
                </article>
              ))}
            </div>
          </Container>
        </div>
      )}

      {/* Wrapper estável para o palco pinado (evita colisão DOM entre React e pin-spacer do GSAP ao alternar modos) */}
      <div className={isFallbackMode ? 'hidden' : 'block'} aria-hidden={isFallbackMode}>
        {/* Palco 100dvh fixado pelo ScrollTrigger */}
        <div
          ref={pinStageRef}
          className="relative w-full h-screen h-[100dvh] overflow-hidden bg-obsidian select-none"
        >
          {/* Poster estático de segurança enquanto os frames do vídeo carregam */}
          <img
            src={SITE_CONFIG.media.scrollPoster}
            alt=""
            aria-hidden="true"
            className={`
              absolute inset-0 w-full h-full object-cover object-[56%_center] sm:object-center
              transition-opacity duration-500 pointer-events-none
              ${isVideoReady ? 'opacity-0' : 'opacity-100'}
            `}
          />

          {/* Vídeo MP4 GOP-4 otimizado controlado exclusivamente por currentTime */}
          <video
            ref={videoRef}
            src={SITE_CONFIG.media.scrollVideo}
            poster={SITE_CONFIG.media.scrollPoster}
            muted
            playsInline
            {...{ 'webkit-playsinline': 'true' }}
            preload="metadata"
            disablePictureInPicture
            onLoadedMetadata={handleLoadedMetadata}
            onLoadedData={handleLoadedData}
            onSeeked={handleSeeked}
            onError={handleVideoError}
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover object-[56%_center] sm:object-center pointer-events-none"
          />

          {/* Camadas de contraste direcional para proteger a leitura sem escurecer o centro da cena */}
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-b from-obsidian/85 via-transparent to-obsidian/95"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/55 to-transparent sm:via-obsidian/30"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute inset-0 hidden sm:block bg-gradient-to-r from-obsidian/80 via-obsidian/25 to-transparent"
            aria-hidden="true"
          />

          {/* Palco Editorial Inferior: Somente os 4 Momentos Editoriais sincronizados */}
          <Container className="relative z-10 h-full flex flex-col justify-end pb-10 sm:pb-14 lg:pb-16">
            <div className="relative min-h-[120px] sm:min-h-[140px] flex items-end">
              {EDITORIAL_MOMENTS.map((moment, idx) => (
                <div
                  key={moment.id}
                  data-moment={idx}
                  className={`w-full max-w-2xl space-y-2.5 sm:space-y-3.5 ${
                    idx === 0 ? 'relative' : 'absolute inset-x-0 bottom-0'
                  }`}
                >
                  <h2 className="font-display font-bold uppercase tracking-tight text-white text-2xl sm:text-4xl lg:text-[2.75rem] leading-[1.06] drop-shadow-[0_2px_16px_rgba(0,0,0,0.9)]">
                    {moment.title}
                  </h2>

                  <p className="text-sm sm:text-base lg:text-lg text-text-white/90 font-normal leading-relaxed max-w-[48ch] drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)]">
                    {moment.text}
                  </p>
                </div>
              ))}
            </div>
          </Container>
        </div>
      </div>
    </section>
  );
};

export default CinematicScroll;

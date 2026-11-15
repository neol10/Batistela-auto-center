import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap';
import { SITE_CONFIG } from '@/config/siteConfig';
import { Container } from '@/components/common/Container';
import { Button } from '@/components/common/Button';
import { MessageSquare, ArrowRight, ShieldCheck, MapPin } from 'lucide-react';

interface HeroProps {
  onExploreClick?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick }) => {
  const containerRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Orquestração de animação de entrada com GSAP
  useGSAP(
    () => {
      // Verifica prefers-reduced-motion via matchMedia
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (prefersReducedMotion) {
        gsap.set(['.hero-badge', '.hero-title-line', '.hero-subtitle', '.hero-cta', '.hero-trust'], {
          opacity: 1,
          y: 0,
        });
        return;
      }

      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' },
      });

      tl.fromTo(
        '.hero-badge',
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.6, delay: 0.2 }
      )
        .fromTo(
          '.hero-title-line',
          { opacity: 0, y: 35, skewY: 1.5 },
          { opacity: 1, y: 0, skewY: 0, duration: 0.85, stagger: 0.15 },
          '-=0.3'
        )
        .fromTo(
          '.hero-subtitle',
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.7 },
          '-=0.4'
        )
        .fromTo(
          '.hero-cta',
          { opacity: 0, y: 20, scale: 0.98 },
          { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.1 },
          '-=0.3'
        )
        .fromTo(
          '.hero-trust',
          { opacity: 0 },
          { opacity: 1, duration: 0.8 },
          '-=0.2'
        );
    },
    { scope: containerRef }
  );

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative w-full min-h-screen min-h-[100svh] sm:min-h-[100dvh] flex items-center justify-center overflow-hidden bg-obsidian"
      aria-label="Apresentação Batistela Auto Center"
    >
      {/* VÍDEO DE FUNDO CINEMATOGRÁFICO */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden pointer-events-none">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={SITE_CONFIG.media.heroPoster}
          className="w-full h-full object-cover object-center scale-[1.02] transform-gpu"
          aria-hidden="true"
        >
          <source src={SITE_CONFIG.media.heroVideo} type="video/mp4" />
          Seu navegador não suporta reprodução de vídeo HTML5.
        </video>

        {/* OVERLAYS CINEMATOGRÁFICOS DE GRADIENTE (Legibilidade técnica mantendo a roda como protagonista) */}
        {/* 1. Vinheta suave superior para contraste do Header */}
        <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/80 via-black/25 to-transparent h-32 sm:h-40 pointer-events-none" />

        {/* 2. Gradiente mobile vertical/localizado na região de leitura (preservando a janela da roda e detalhes superiores) */}
        <div className="sm:hidden absolute inset-0 bg-[linear-gradient(180deg,rgba(7,7,9,0.52)_0%,rgba(7,7,9,0.22)_24%,rgba(7,7,9,0.68)_50%,rgba(7,7,9,0.88)_78%,rgba(7,7,9,0.96)_100%)] pointer-events-none" />

        {/* 3. Gradiente direcional desktop (80-90% à esquerda -> 30-45% ao centro -> mínimo à direita preservando o vídeo) */}
        <div className="hidden sm:block absolute inset-0 bg-[linear-gradient(90deg,rgba(7,7,9,0.88)_0%,rgba(7,7,9,0.78)_28%,rgba(7,7,9,0.42)_54%,rgba(7,7,9,0.12)_76%,rgba(7,7,9,0.02)_100%)] pointer-events-none" />

        {/* 4. Gradiente inferior profundo integrando com a próxima seção */}
        <div className="absolute bottom-0 left-0 right-0 h-36 sm:h-48 bg-gradient-to-t from-obsidian via-obsidian/75 to-transparent pointer-events-none" />
      </div>

      {/* CONTEÚDO EDITORIAL PRINCIPAL */}
      <Container className="relative z-10 pt-24 pb-10 sm:pt-32 sm:pb-20 md:py-32 flex flex-col justify-center">
        <div className="max-w-3xl flex flex-col">
          {/* Identificação Discreta / Eyebrow */}
          <div className="hero-badge flex flex-wrap items-center gap-2 sm:gap-2.5 text-[11px] sm:text-sm font-mono tracking-wider uppercase text-text-chrome mb-4 sm:mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#070709]/65 border border-white/15 sm:border-white/12 text-white backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-red animate-pulse" />
              {SITE_CONFIG.name}
            </span>
            <span className="inline-flex items-center gap-1 text-white/85 sm:text-white/80 text-[11px] sm:text-xs [text-shadow:0_1px_10px_rgba(0,0,0,0.85)]">
              <MapPin className="w-3.5 h-3.5 text-accent-red shrink-0" />
              Engenheiro Coelho — SP
            </span>
          </div>

          {/* Headline Forte e Elegante com proteção difusa de contraste */}
          <h1 className="font-display text-[clamp(2.2rem,9vw,3.35rem)] sm:text-fluid-display font-bold tracking-[-0.02em] sm:tracking-tight text-white leading-[1.06] sm:leading-[0.98] uppercase mb-4 sm:mb-6 drop-shadow-[0_4px_22px_rgba(0,0,0,0.85)]">
            <span className="block hero-title-line [text-shadow:0_2px_18px_rgba(0,0,0,0.75)]">
              PRECISÃO QUE
            </span>
            <span className="block hero-title-line">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-text-white to-text-chrome">
                MOVE{' '}
              </span>
              <span className="text-accent-red [text-shadow:0_2px_18px_rgba(0,0,0,0.75)]">
                VOCÊ.
              </span>
            </span>
          </h1>

          {/* Subtítulo Técnico e Confiante com text-shadow sutil e difuso em todas as resoluções */}
          <p className="hero-subtitle text-[15px] xs:text-base sm:text-fluid-body text-[#F5F7FA]/95 sm:text-[#F5F7FA]/90 max-w-xl font-normal leading-[1.6] sm:leading-relaxed text-pretty sm:text-balance [text-shadow:0_2px_16px_rgba(0,0,0,0.9),0_1px_4px_rgba(0,0,0,0.85)] mb-7 sm:mb-8">
            Pneus, rodas, alinhamento 3D e cuidados automotivos com a confiança que seu veículo merece.
          </p>

          {/* Ações / CTAs de Conversão e Exploração (Empilhados no mobile, lado a lado a partir de sm/tablet) */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
            <Button
              href={SITE_CONFIG.contact.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              variant="primary"
              size="lg"
              icon={<MessageSquare className="w-4 h-4 sm:w-5 sm:h-5" />}
              className="hero-cta w-full sm:w-auto px-5 sm:px-7 py-3.5 sm:py-3 text-[13px] xs:text-sm sm:text-base justify-center text-center whitespace-nowrap shadow-red-glow font-bold uppercase tracking-wider"
              aria-label="Agendar atendimento especializado pelo WhatsApp (abre em nova aba)"
            >
              Agendar pelo WhatsApp
            </Button>

            <Button
              type="button"
              onClick={onExploreClick}
              variant="metallic"
              size="lg"
              icon={<ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-accent-red" />}
              className="hero-cta w-full sm:w-auto px-5 sm:px-7 py-3.5 sm:py-3 text-[13px] xs:text-sm sm:text-base justify-center text-center whitespace-nowrap border-border-metallic hover:border-white/30 uppercase tracking-wider bg-carbon/90 backdrop-blur-sm sm:bg-carbon"
              aria-label="Conhecer serviços automotivos da Batistela"
            >
              Conhecer Serviços
            </Button>
          </div>

          {/* Selo Técnico Discreto de Confiança com contraste reforçado e superfície translúcida localizada sutil */}
          <div className="hero-trust mt-8 pt-5 sm:mt-8 sm:pt-6 border-t border-white/[0.14] grid grid-cols-1 gap-2 sm:flex sm:flex-wrap sm:items-center sm:gap-3 text-xs font-mono text-[#F5F7FA]/95 sm:text-[#F5F7FA]/90 [text-shadow:0_1px_10px_rgba(0,0,0,0.9)]">
            <div className="flex items-center gap-2.5 sm:gap-2 px-2.5 py-1 -mx-2.5 sm:mx-0 rounded-lg bg-[#070709]/55 backdrop-blur-[2px] border border-white/[0.07] w-fit">
              <ShieldCheck className="w-4 h-4 text-accent-red shrink-0" />
              <span>Geometria Computadorizada 3D</span>
            </div>
            <div className="flex items-center gap-2.5 sm:gap-2 px-2.5 py-1 -mx-2.5 sm:mx-0 rounded-lg bg-[#070709]/55 backdrop-blur-[2px] border border-white/[0.07] w-fit">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-red/85 shrink-0 ml-1 sm:ml-0" />
              <span className="ml-0.5 sm:ml-0">Estoque de Pneus Selecionados</span>
            </div>
            <div className="flex items-center gap-2.5 sm:gap-2 px-2.5 py-1 -mx-2.5 sm:mx-0 rounded-lg bg-[#070709]/55 backdrop-blur-[2px] border border-white/[0.07] w-fit">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-red/85 shrink-0 ml-1 sm:ml-0" />
              <span className="ml-0.5 sm:ml-0">Atendimento Direto e Transparente</span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

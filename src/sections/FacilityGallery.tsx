import React, { useState, useRef, useEffect, useCallback } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';
import { Container } from '@/components/common/Container';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useScrollLock } from '@/hooks/useScrollLock';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';

export interface GalleryPhotoItem {
  id: string;
  indexLabel: string;
  title: string;
  category: string;
  description: string;
  src: string;
  largeSrc?: string;
  srcSet?: string;
  sizes?: string;
  width: number;
  height: number;
  maxUsefulWidthPx: number;
  isFeatured?: boolean;
  alt: string;
}

export const GALLERY_PHOTOS: GalleryPhotoItem[] = [
  {
    id: 'foto-box-principal',
    indexLabel: '01',
    title: 'Box Principal e Rampa de Geometria',
    category: 'INTERIOR DA OFICINA',
    description:
      'Área interna de serviços com rampa de alinhamento, mostruário de rodas esportivas na parede lateral e bancadas de apoio organizadas.',
    src: '/media/galeria-01-box-principal-sm.webp',
    largeSrc: '/media/galeria-01-box-principal-lg.webp',
    srcSet: '/media/galeria-01-box-principal-sm.webp 720w, /media/galeria-01-box-principal-lg.webp 1152w',
    sizes: '(max-width: 1023px) 100vw, 55vw',
    width: 720,
    height: 900,
    maxUsefulWidthPx: 560,
    isFeatured: true,
    alt: 'Interior amplo da Batistela Auto Center com caminhonete na rampa de alinhamento e mostruário de rodas na parede',
  },
  {
    id: 'foto-fachada-oficial',
    indexLabel: '02',
    title: 'Fachada e Entrada Principal',
    category: 'EXTERIOR E RECEPÇÃO',
    description:
      'Fachada oficial da Batistela Auto Center em Engenheiro Coelho, com acesso amplo ao salão de atendimento.',
    src: '/media/galeria-02-fachada.webp',
    width: 224,
    height: 298,
    maxUsefulWidthPx: 240,
    alt: 'Fachada frontal da Batistela Auto Center com identificação da marca e entrada da oficina',
  },
  {
    id: 'foto-rampa-atendimento',
    indexLabel: '03',
    title: 'Alinhamento e Atendimento Interno',
    category: 'AMBIENTE OPERACIONAL',
    description:
      'Veículo utilitário posicionado na rampa com leitura de geometria, ao lado da mesa de atendimento e mostruário de rodas.',
    src: '/media/galeria-03-rampa-atendimento.webp',
    width: 224,
    height: 298,
    maxUsefulWidthPx: 240,
    alt: 'Ambiente interno da Batistela Auto Center com van na rampa de alinhamento e mesa de atendimento',
  },
  {
    id: 'foto-acesso-baias',
    indexLabel: '04',
    title: 'Acesso às Baias de Serviço',
    category: 'ÁREA EXTERNA',
    description:
      'Vista externa das baias de atendimento automotivo com veículo posicionado na entrada da oficina.',
    src: '/media/galeria-04-acesso-baias.webp',
    width: 224,
    height: 298,
    maxUsefulWidthPx: 240,
    alt: 'Vista externa da Batistela Auto Center com veículo branco posicionado em frente às baias de serviço',
  },
  {
    id: 'foto-identidade-externa',
    indexLabel: '05',
    title: 'Identidade e Exposição Frontal',
    category: 'ESTRUTURA COMERCIAL',
    description:
      'Perspectiva lateral da fachada destacando o letreiro institucional e a exposição frontal de pneus e rodas.',
    src: '/media/galeria-05-identidade-externa.webp',
    width: 202,
    height: 270,
    maxUsefulWidthPx: 220,
    alt: 'Perspectiva lateral da fachada da Batistela Auto Center com pneus e rodas expostos na entrada',
  },
];

export const FacilityGallery: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const lastTriggerIndexRef = useRef<number | null>(null);
  const triggerRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const prevButtonRef = useRef<HTMLButtonElement>(null);
  const nextButtonRef = useRef<HTMLButtonElement>(null);
  const touchStartXRef = useRef<number | null>(null);

  const isLightboxOpen = activeIndex !== null;
  useScrollLock(isLightboxOpen);

  const openLightbox = (index: number) => {
    lastTriggerIndexRef.current = index;
    setActiveIndex(index);
  };

  const closeLightbox = useCallback(() => {
    const returnIdx = lastTriggerIndexRef.current;
    setActiveIndex(null);
    window.requestAnimationFrame(() => {
      if (returnIdx !== null && triggerRefs.current[returnIdx]) {
        triggerRefs.current[returnIdx]?.focus();
      }
    });
  }, []);

  const showPrev = useCallback(() => {
    setActiveIndex((curr) => {
      if (curr === null) return null;
      return (curr - 1 + GALLERY_PHOTOS.length) % GALLERY_PHOTOS.length;
    });
  }, []);

  const showNext = useCallback(() => {
    setActiveIndex((curr) => {
      if (curr === null) return null;
      return (curr + 1) % GALLERY_PHOTOS.length;
    });
  }, []);

  // Gerenciamento de teclado (Escape, Setas e Focus Trap) quando o Lightbox está aberto
  useEffect(() => {
    if (!isLightboxOpen) return;

    closeButtonRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        closeLightbox();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        showPrev();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        showNext();
      } else if (e.key === 'Tab') {
        const focusable = [
          prevButtonRef.current,
          nextButtonRef.current,
          closeButtonRef.current,
        ].filter(Boolean) as HTMLElement[];

        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLightboxOpen, closeLightbox, showPrev, showNext]);

  // Suporte a gesto de swipe no mobile dentro do Lightbox
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      touchStartXRef.current = e.touches[0].clientX;
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null || e.changedTouches.length === 0) return;
    const deltaX = e.changedTouches[0].clientX - touchStartXRef.current;
    touchStartXRef.current = null;

    if (Math.abs(deltaX) > 45) {
      if (deltaX > 0) showPrev();
      else showNext();
    }
  };

  // Animações GSAP discretas de entrada
  useGSAP(
    () => {
      if (prefersReducedMotion) {
        gsap.set('[data-gallery-header], [data-gallery-card]', { opacity: 1, y: 0 });
        return;
      }

      gsap.fromTo(
        '[data-gallery-header]',
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 82%',
            once: true,
            refreshPriority: -2,
          },
        }
      );

      gsap.fromTo(
        '[data-gallery-card]',
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '[data-gallery-grid]',
            start: 'top 82%',
            once: true,
            refreshPriority: -2,
          },
        }
      );
    },
    { scope: sectionRef, dependencies: [prefersReducedMotion] }
  );

  const featuredPhoto = GALLERY_PHOTOS[0];
  const secondaryPhotos = GALLERY_PHOTOS.slice(1);
  const currentLightboxPhoto = activeIndex !== null ? GALLERY_PHOTOS[activeIndex] : null;

  return (
    <section
      id="estrutura"
      ref={sectionRef}
      aria-labelledby="estrutura-heading"
      className="relative bg-obsidian text-text-white py-20 sm:py-28 lg:py-36 border-t border-white/[0.06] scroll-mt-20 sm:scroll-mt-24 overflow-hidden"
    >
      {/* Linha sutil de transição superior */}
      <div
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-px bg-gradient-to-r from-transparent via-white/15 to-transparent"
        aria-hidden="true"
      />

      <Container className="relative z-10">
        {/* ABERTURA EDITORIAL */}
        <header className="max-w-3xl mb-14 sm:mb-18 lg:mb-20 space-y-5 sm:space-y-6">
          <div data-gallery-header className="flex items-center gap-3">
            <span
              className="w-2 h-2 rounded-full bg-accent-red shadow-[0_0_10px_rgba(225,29,42,0.8)]"
              aria-hidden="true"
            />
            <span className="font-mono text-xs uppercase tracking-[0.22em] text-text-white font-semibold">
              NOSSA ESTRUTURA
            </span>
          </div>

          <h2
            id="estrutura-heading"
            data-gallery-header
            className="font-display font-bold uppercase tracking-tight text-white text-[1.9rem] sm:text-4xl lg:text-[2.85rem] leading-[1.06]"
          >
            <span className="block">UM ESPAÇO PREPARADO</span>
            <span className="block mt-1 text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-text-chrome">
              PARA CUIDAR DO <span className="text-accent-red">SEU CARRO.</span>
            </span>
          </h2>

          <p
            data-gallery-header
            className="text-base sm:text-lg text-text-chrome leading-relaxed font-normal max-w-[58ch]"
          >
            Conheça de perto o ambiente, a estrutura e os detalhes da Batistela Auto Center.
          </p>
        </header>

        {/* GRID EDITORIAL ASSIMÉTRICO */}
        <div
          data-gallery-grid
          className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch"
        >
          {/* Fotografia Principal em Destaque (Coluna Esquerda: 6 colunas no desktop) */}
          <div data-gallery-card className="lg:col-span-6 flex">
            <button
              ref={(el) => {
                triggerRefs.current[0] = el;
              }}
              type="button"
              onClick={() => openLightbox(0)}
              data-gallery-trigger="0"
              aria-label={`Ampliar fotografia ${featuredPhoto.indexLabel}: ${featuredPhoto.title}`}
              className="group relative w-full rounded-2xl overflow-hidden bg-carbon border border-border-metallic hover:border-accent-red/40 transition-colors text-left flex flex-col justify-between focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-red"
            >
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-graphite/50">
                <img
                  src={featuredPhoto.src}
                  srcSet={featuredPhoto.srcSet}
                  sizes={featuredPhoto.sizes}
                  alt={featuredPhoto.alt}
                  width={featuredPhoto.width}
                  height={featuredPhoto.height}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.02]"
                />
                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/20 to-transparent"
                  aria-hidden="true"
                />

                {/* Selo superior discreto */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2">
                  <span className="px-3 py-1 rounded-md bg-obsidian/80 backdrop-blur-sm border border-white/10 font-mono text-[11px] uppercase tracking-[0.18em] text-white">
                    {featuredPhoto.category}
                  </span>
                  <span className="w-9 h-9 rounded-lg bg-obsidian/80 backdrop-blur-sm border border-white/10 flex items-center justify-center text-text-chrome group-hover:text-white group-hover:border-accent-red/50 transition-colors">
                    <Maximize2 className="w-4 h-4" />
                  </span>
                </div>
              </div>

              {/* Rodapé Editorial da Foto Principal */}
              <div className="p-5 sm:p-6 bg-carbon border-t border-white/[0.06] space-y-2">
                <div className="flex items-center justify-between gap-3 font-mono text-xs">
                  <span className="text-accent-red font-semibold">
                    REGISTRO /{featuredPhoto.indexLabel}
                  </span>
                  <span className="text-text-chrome/70 uppercase tracking-widest text-[11px]">
                    CLIQUE PARA AMPLIAR
                  </span>
                </div>
                <h3 className="font-display text-xl sm:text-2xl font-bold text-white tracking-tight">
                  {featuredPhoto.title}
                </h3>
                <p className="text-sm text-text-chrome leading-relaxed">
                  {featuredPhoto.description}
                </p>
              </div>
            </button>
          </div>

          {/* Fotografias Secundárias em Molduras Arquitetônicas (Coluna Direita: 6 colunas no desktop) */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 content-between">
            {secondaryPhotos.map((photo, idx) => {
              const photoIndex = idx + 1;
              return (
                <div key={photo.id} data-gallery-card className="flex">
                  <button
                    ref={(el) => {
                      triggerRefs.current[photoIndex] = el;
                    }}
                    type="button"
                    onClick={() => openLightbox(photoIndex)}
                    data-gallery-trigger={photoIndex}
                    aria-label={`Ampliar fotografia ${photo.indexLabel}: ${photo.title}`}
                    className="group relative w-full rounded-2xl overflow-hidden bg-carbon border border-border-metallic hover:border-accent-red/40 transition-colors text-left flex flex-col justify-between p-4 sm:p-5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-red"
                  >
                    {/* Cabeçalho do frame secundário */}
                    <div className="flex items-center justify-between gap-2 w-full mb-3.5">
                      <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-chrome">
                        /{photo.indexLabel} • {photo.category}
                      </span>
                      <span className="w-7 h-7 rounded-md bg-graphite/80 border border-white/10 flex items-center justify-center text-text-chrome group-hover:text-white group-hover:border-accent-red/40 transition-colors shrink-0">
                        <Maximize2 className="w-3.5 h-3.5" />
                      </span>
                    </div>

                    {/* Moldura interna que respeita a resolução útil nativa sem esticar a foto */}
                    <div className="w-full py-3 px-2 rounded-xl bg-obsidian/80 border border-white/[0.05] flex items-center justify-center">
                      <div
                        className="relative overflow-hidden rounded-lg border border-white/10 shadow-lg w-full"
                        style={{ maxWidth: `${photo.width}px` }}
                      >
                        <img
                          src={photo.src}
                          alt={photo.alt}
                          width={photo.width}
                          height={photo.height}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-auto object-cover block transition-transform duration-500 group-hover:scale-[1.02]"
                        />
                      </div>
                    </div>

                    {/* Legenda do registro */}
                    <div className="mt-4 pt-3 border-t border-white/[0.06] space-y-1 w-full">
                      <h3 className="font-display text-base sm:text-lg font-bold text-white tracking-tight">
                        {photo.title}
                      </h3>
                      <p className="text-xs text-text-chrome leading-relaxed line-clamp-2">
                        {photo.description}
                      </p>
                    </div>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </Container>

      {/* LIGHTBOX INTERATIVO E ACESSÍVEL */}
      {isLightboxOpen && currentLightboxPhoto && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="lightbox-photo-title"
          data-testid="gallery-lightbox"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10"
        >
          {/* Backdrop escuro translúcido (fecha ao clicar fora) */}
          <div
            data-testid="lightbox-backdrop"
            onClick={closeLightbox}
            className="fixed inset-0 bg-black/90 backdrop-blur-md transition-opacity"
            aria-hidden="true"
          />

          {/* Painel do Lightbox */}
          <div className="relative z-10 w-full max-w-4xl rounded-2xl bg-carbon border border-border-metallic shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            {/* Barra superior de controle */}
            <div className="flex items-center justify-between gap-4 px-4 py-3.5 sm:px-6 sm:py-4 bg-obsidian/90 border-b border-border-metallic">
              <div className="flex items-center gap-3 min-w-0">
                <span className="font-mono text-xs font-semibold text-accent-red shrink-0">
                  /{currentLightboxPhoto.indexLabel}
                </span>
                <span className="font-mono text-xs uppercase tracking-[0.18em] text-text-chrome truncate">
                  {currentLightboxPhoto.category}
                </span>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  ref={prevButtonRef}
                  type="button"
                  onClick={showPrev}
                  data-testid="lightbox-prev"
                  aria-label="Fotografia anterior"
                  className="inline-flex items-center justify-center min-w-[44px] min-h-[44px] rounded-lg bg-graphite/70 hover:bg-graphite text-text-chrome hover:text-white border border-white/10 transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <button
                  ref={nextButtonRef}
                  type="button"
                  onClick={showNext}
                  data-testid="lightbox-next"
                  aria-label="Próxima fotografia"
                  className="inline-flex items-center justify-center min-w-[44px] min-h-[44px] rounded-lg bg-graphite/70 hover:bg-graphite text-text-chrome hover:text-white border border-white/10 transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>

                <button
                  ref={closeButtonRef}
                  type="button"
                  onClick={closeLightbox}
                  data-testid="lightbox-close"
                  aria-label="Fechar visualização ampliada"
                  className="inline-flex items-center justify-center min-w-[44px] min-h-[44px] rounded-lg bg-graphite/70 hover:bg-accent-red text-text-chrome hover:text-white border border-white/10 transition-colors ml-1"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Palco central da fotografia (respeitando rigorosamente a resolução útil máxima de cada imagem) */}
            <div className="flex-1 overflow-y-auto p-5 sm:p-8 bg-obsidian/95 flex flex-col md:flex-row items-center justify-center gap-6 sm:gap-8">
              <div
                className="relative flex items-center justify-center w-full shrink-0"
                style={{ maxWidth: `${currentLightboxPhoto.maxUsefulWidthPx}px` }}
              >
                <img
                  data-testid="lightbox-image"
                  src={currentLightboxPhoto.largeSrc || currentLightboxPhoto.src}
                  alt={currentLightboxPhoto.alt}
                  width={
                    currentLightboxPhoto.largeSrc ? 1152 : currentLightboxPhoto.width
                  }
                  height={
                    currentLightboxPhoto.largeSrc ? 1440 : currentLightboxPhoto.height
                  }
                  className="w-full h-auto max-h-[62vh] object-contain rounded-xl border border-white/10 shadow-2xl"
                />
              </div>

              {/* Ficha Editorial do Registro */}
              <div className="w-full md:max-w-xs space-y-4 text-left border-t md:border-t-0 md:border-l border-white/10 pt-4 md:pt-0 md:pl-6">
                <div className="space-y-1.5">
                  <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent-red block">
                    ESTRUTURA BATISTELA
                  </span>
                  <h3
                    id="lightbox-photo-title"
                    className="font-display text-xl sm:text-2xl font-bold text-white tracking-tight"
                  >
                    {currentLightboxPhoto.title}
                  </h3>
                </div>

                <p className="text-sm text-text-chrome leading-relaxed">
                  {currentLightboxPhoto.description}
                </p>

                <div className="pt-3 border-t border-white/[0.08] flex items-center justify-between font-mono text-[11px] text-text-chrome/70">
                  <span>BATISTELA AUTO CENTER</span>
                  <span>
                    {activeIndex + 1} / {GALLERY_PHOTOS.length}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default FacilityGallery;

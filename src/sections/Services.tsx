import React, { useRef } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';
import { SITE_CONFIG } from '@/config/siteConfig';
import { Container } from '@/components/common/Container';
import { Button } from '@/components/common/Button';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { MessageSquare, ArrowUpRight } from 'lucide-react';

interface ServiceEditorialItem {
  number: string;
  id: string;
  title: string;
  description: string;
  tag: string;
  visualType: 'image' | 'typographic';
  imageSrc?: string;
  imageAlt?: string;
  caption: string;
}

const SERVICE_ITEMS: ServiceEditorialItem[] = [
  {
    number: '01',
    id: 'servico-alinhamento-3d',
    title: 'ALINHAMENTO 3D',
    description:
      'Tecnologia de medição para verificar e ajustar a geometria das rodas conforme as especificações do veículo.',
    tag: 'GEOMETRIA VEICULAR',
    visualType: 'image',
    imageSrc: SITE_CONFIG.media.servicoAlinhamento,
    imageAlt: 'Veículo posicionado na rampa de alinhamento 3D na Batistela Auto Center',
    caption: 'RAMPA DE GEOMETRIA E LEITURA ÓPTICA 3D',
  },
  {
    number: '02',
    id: 'servico-pneus-e-rodas',
    title: 'PNEUS E RODAS',
    description:
      'Opções de pneus e rodas para diferentes necessidades, com orientação na escolha e montagem.',
    tag: 'CONJUNTO RODANTE',
    visualType: 'image',
    imageSrc: SITE_CONFIG.media.servicoPneusRodas,
    imageAlt: 'Estoque de pneus novos e mostruário de rodas na Batistela Auto Center',
    caption: 'LINHA DE PNEUS NOVOS E MOSTRUÁRIO DE RODAS',
  },
  {
    number: '03',
    id: 'servico-balanceamento',
    title: 'BALANCEAMENTO',
    description:
      'Serviço voltado ao equilíbrio do conjunto de rodas e pneus, ajudando a reduzir vibrações durante a condução.',
    tag: 'ESTABILIDADE DINÂMICA',
    visualType: 'typographic',
    caption: 'PRECISÃO ROTACIONAL E CONFORTO AO DIRIGIR',
  },
  {
    number: '04',
    id: 'servico-manutencao-automotiva',
    title: 'MANUTENÇÃO AUTOMOTIVA',
    description:
      'Cuidados e serviços de manutenção para ajudar a preservar o funcionamento do veículo.',
    tag: 'CUIDADO MECÂNICO',
    visualType: 'image',
    imageSrc: SITE_CONFIG.media.servicoManutencao,
    imageAlt: 'Veículo em atendimento no elevador automotivo da Batistela Auto Center',
    caption: 'BOX TÉCNICO DE REVISÃO E MANUTENÇÃO',
  },
];

export const Services: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (prefersReducedMotion) {
        gsap.set('[data-services-header], [data-service-text], [data-service-visual], [data-services-cta]', {
          opacity: 1,
          y: 0,
          scale: 1,
        });
        return;
      }

      // Abertura editorial da seção
      gsap.fromTo(
        '[data-services-header]',
        { opacity: 0, y: 26 },
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
            refreshPriority: -1,
          },
        }
      );

      // Animação individual de cada bloco de serviço
      const rows = gsap.utils.toArray<HTMLElement>('[data-service-row]');
      rows.forEach((row) => {
        const textEl = row.querySelector('[data-service-text]');
        const visualEl = row.querySelector('[data-service-visual]');

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: row,
            start: 'top 82%',
            once: true,
            refreshPriority: -1,
          },
        });

        if (textEl) {
          tl.fromTo(
            textEl,
            { opacity: 0, y: 28 },
            { opacity: 1, y: 0, duration: 0.75, ease: 'power3.out' },
            0
          );
        }

        if (visualEl) {
          tl.fromTo(
            visualEl,
            { opacity: 0, y: 24, scale: 0.985 },
            { opacity: 1, y: 0, scale: 1, duration: 0.85, ease: 'power3.out' },
            0.1
          );
        }
      });

      // Bloco de conversão final
      gsap.fromTo(
        '[data-services-cta]',
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '[data-services-cta]',
            start: 'top 85%',
            once: true,
            refreshPriority: -1,
          },
        }
      );
    },
    { scope: sectionRef, dependencies: [prefersReducedMotion] }
  );

  return (
    <section
      id="servicos"
      ref={sectionRef}
      aria-labelledby="services-heading"
      className="relative bg-obsidian text-text-white py-20 sm:py-28 lg:py-36 border-t border-white/[0.06] scroll-mt-20 sm:scroll-mt-24 overflow-hidden"
    >
      {/* Luz atmosférica sutil de transição após o Cinematic Scroll */}
      <div
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-px bg-gradient-to-r from-transparent via-accent-red/35 to-transparent"
        aria-hidden="true"
      />

      <Container className="relative z-10">
        {/* ABERTURA EDITORIAL */}
        <header className="max-w-3xl mb-14 sm:mb-20 lg:mb-24 space-y-5 sm:space-y-6">
          <div data-services-header className="flex items-center gap-3">
            <span
              className="w-2 h-2 rounded-full bg-accent-red shadow-[0_0_10px_rgba(225,29,42,0.8)]"
              aria-hidden="true"
            />
            <span className="font-mono text-xs uppercase tracking-[0.22em] text-text-white font-semibold">
              NOSSOS SERVIÇOS
            </span>
          </div>

          <h2
            id="services-heading"
            data-services-header
            className="font-display font-bold uppercase tracking-tight text-white text-[1.9rem] sm:text-4xl lg:text-[2.85rem] leading-[1.06]"
          >
            <span className="block">SEU CARRO MERECE</span>
            <span className="block mt-1 text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-text-chrome">
              ATENÇÃO EM CADA <span className="text-accent-red">DETALHE.</span>
            </span>
          </h2>

          <p
            data-services-header
            className="text-base sm:text-lg text-text-chrome leading-relaxed font-normal max-w-[58ch]"
          >
            Soluções automotivas para cuidar do seu veículo, com atendimento próximo e atenção à
            qualidade de cada serviço.
          </p>
        </header>

        {/* LISTA EDITORIAL DOS 4 SERVIÇOS PRINCIPAIS */}
        <div className="divide-y divide-border-metallic border-t border-b border-border-metallic">
          {SERVICE_ITEMS.map((service, index) => {
            const isEven = index % 2 === 1;

            return (
              <article
                key={service.id}
                id={service.id}
                data-service-row
                className="py-12 sm:py-16 lg:py-24 grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-12 items-center"
              >
                {/* Coluna de Texto Editorial (Alterna esquerda/direita no desktop) */}
                <div
                  data-service-text
                  className={`lg:col-span-5 space-y-5 sm:space-y-6 ${
                    isEven ? 'lg:order-2 lg:pl-4' : 'lg:order-1 lg:pr-4'
                  }`}
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="inline-flex items-center gap-3">
                      <span className="font-mono text-sm sm:text-base font-bold tracking-[0.18em] text-accent-red">
                        {service.number}
                      </span>
                      <span className="w-6 h-px bg-white/20" aria-hidden="true" />
                      <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-text-chrome">
                        {service.tag}
                      </span>
                    </div>
                  </div>

                  <h3 className="font-display text-2xl sm:text-3xl lg:text-[2.2rem] font-bold uppercase tracking-tight text-white leading-[1.08]">
                    {service.title}
                  </h3>

                  <p className="text-base sm:text-lg text-text-chrome leading-relaxed font-normal">
                    {service.description}
                  </p>

                  <div className="pt-2">
                    <a
                      href={SITE_CONFIG.contact.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-white/85 hover:text-accent-red transition-colors min-h-[44px] py-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-red rounded"
                      aria-label={`Consultar sobre ${service.title} pelo WhatsApp (abre em nova aba)`}
                    >
                      <span>SOLICITAR ATENDIMENTO</span>
                      <ArrowUpRight className="w-4 h-4 text-accent-red" />
                    </a>
                  </div>
                </div>

                {/* Coluna Visual: Fotografia Real Contextual ou Composição Tipográfica Premium */}
                <div
                  data-service-visual
                  className={`lg:col-span-7 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}
                >
                  {service.visualType === 'image' && service.imageSrc ? (
                    <div className="relative rounded-2xl overflow-hidden bg-carbon border border-border-metallic group">
                      <div className="aspect-[16/10] w-full overflow-hidden relative bg-graphite/40">
                        <img
                          src={service.imageSrc}
                          alt={service.imageAlt || service.title}
                          loading="lazy"
                          decoding="async"
                          width={1200}
                          height={750}
                          className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.02]"
                        />
                        <div
                          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-obsidian/85 via-obsidian/15 to-transparent"
                          aria-hidden="true"
                        />
                      </div>

                      <div className="px-4 py-3.5 sm:px-6 sm:py-4 bg-carbon/95 border-t border-white/[0.06] flex items-center justify-between gap-4">
                        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-text-chrome truncate">
                          {service.caption}
                        </span>
                        <span className="font-mono text-[11px] font-semibold text-white/60 shrink-0">
                          /{service.number}
                        </span>
                      </div>
                    </div>
                  ) : (
                    /* Composição Tipográfica e Diagramática Editorial Premium para 03 — BALANCEAMENTO */
                    <div className="relative rounded-2xl overflow-hidden bg-carbon border border-border-metallic">
                      <div className="aspect-[16/10] w-full relative p-6 sm:p-10 lg:p-12 flex flex-col justify-between bg-[radial-gradient(circle_at_75%_50%,rgba(225,29,42,0.08),transparent_65%)]">
                        {/* Geometria concêntrica minimalista representando equilíbrio rotacional */}
                        <div
                          className="pointer-events-none absolute right-6 sm:right-12 top-1/2 -translate-y-1/2 w-44 h-44 sm:w-64 sm:h-64 lg:w-72 lg:h-72 rounded-full border border-white/[0.07] flex items-center justify-center"
                          aria-hidden="true"
                        >
                          <div className="w-32 h-32 sm:w-48 sm:h-48 lg:w-52 lg:h-52 rounded-full border border-dashed border-white/[0.12] flex items-center justify-center">
                            <div className="w-16 h-16 sm:w-24 sm:h-24 rounded-full border border-accent-red/40 bg-obsidian/80 flex items-center justify-center">
                              <span className="w-2.5 h-2.5 rounded-full bg-accent-red shadow-[0_0_12px_rgba(225,29,42,0.9)]" />
                            </div>
                          </div>
                          {/* Eixo horizontal de referência */}
                          <div className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
                        </div>

                        {/* Topo da composição tipográfica */}
                        <div className="relative z-10 flex items-center justify-between gap-4">
                          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent-red font-semibold">
                            EQUILÍBRIO DO CONJUNTO
                          </span>
                          <span className="font-mono text-xs text-white/40">/03</span>
                        </div>

                        {/* Centro tipográfico editorial */}
                        <div className="relative z-10 my-auto py-4 max-w-md space-y-2">
                          <p className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold uppercase tracking-tight text-white leading-[1.08]">
                            RODAGEM UNIFORME E SEM VIBRAÇÕES.
                          </p>
                          <p className="text-xs sm:text-sm font-mono uppercase tracking-[0.16em] text-text-chrome">
                            ESTABILIDADE ENTRE RODA, PNEU E SUSPENSÃO
                          </p>
                        </div>

                        {/* Rodapé interno com pilares técnicos do serviço */}
                        <div className="relative z-10 grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4 border-t border-white/[0.08] font-mono text-[11px] text-text-chrome">
                          <div>
                            <span className="block text-white font-semibold">CONFORTO</span>
                            <span>Condução estável</span>
                          </div>
                          <div>
                            <span className="block text-white font-semibold">PRESERVAÇÃO</span>
                            <span>Desgaste regular</span>
                          </div>
                          <div className="col-span-2 sm:col-span-1">
                            <span className="block text-white font-semibold">PRECISÃO</span>
                            <span>Ajuste do conjunto</span>
                          </div>
                        </div>
                      </div>

                      <div className="px-4 py-3.5 sm:px-6 sm:py-4 bg-carbon/95 border-t border-white/[0.06] flex items-center justify-between gap-4">
                        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-text-chrome truncate">
                          {service.caption}
                        </span>
                        <span className="font-mono text-[11px] font-semibold text-white/60 shrink-0">
                          /{service.number}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </div>

        {/* BLOCO FINAL DE CONVERSÃO */}
        <div
          data-services-cta
          className="mt-16 sm:mt-20 lg:mt-24 rounded-2xl bg-gradient-to-br from-graphite/80 via-carbon to-obsidian border border-border-metallic p-8 sm:p-10 lg:p-14 flex flex-col lg:flex-row lg:items-center justify-between gap-8"
        >
          <div className="space-y-3 max-w-xl">
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-accent-red" aria-hidden="true" />
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-text-chrome">
                ATENDIMENTO BATISTELA
              </span>
            </div>
            <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold uppercase tracking-tight text-white">
              SEU VEÍCULO EM BOAS MÃOS.
            </h3>
            <p className="text-base sm:text-lg text-text-chrome leading-relaxed">
              Fale com a Batistela Auto Center e encontre o atendimento ideal para o seu veículo.
            </p>
          </div>

          <div className="shrink-0">
            <Button
              href={SITE_CONFIG.contact.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              variant="primary"
              size="lg"
              icon={<MessageSquare className="w-5 h-5" />}
              className="w-full sm:w-auto justify-center px-7 py-4 text-sm sm:text-base font-bold uppercase tracking-wider shadow-red-glow"
              aria-label="Falar com a Batistela pelo WhatsApp (abre em nova aba)"
            >
              FALAR COM A BATISTELA
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Services;

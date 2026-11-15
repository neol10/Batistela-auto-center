import React, { useRef } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';
import { SITE_CONFIG } from '@/config/siteConfig';
import { Container } from '@/components/common/Container';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { Crosshair, Disc, Gauge, Wrench, MapPin, ArrowDownRight } from 'lucide-react';

interface HighlightPillar {
  index: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const HIGHLIGHT_PILLARS: HighlightPillar[] = [
  {
    index: '01',
    title: 'Alinhamento 3D.',
    description: 'Leitura óptica de geometria veicular para direção alinhada, estável e segura.',
    icon: <Crosshair className="w-4 h-4 text-accent-red" />,
  },
  {
    index: '02',
    title: 'Pneus e rodas.',
    description: 'Aplicação correta e montagem cuidadosa para aderência, estética e durabilidade.',
    icon: <Disc className="w-4 h-4 text-accent-red" />,
  },
  {
    index: '03',
    title: 'Balanceamento.',
    description: 'Equilíbrio dinâmico do conjunto rodante para eliminar trepidações ao dirigir.',
    icon: <Gauge className="w-4 h-4 text-accent-red" />,
  },
  {
    index: '04',
    title: 'Manutenção automotiva.',
    description: 'Revisão mecânica com diagnóstico transparente e foco na confiabilidade do veículo.',
    icon: <Wrench className="w-4 h-4 text-accent-red" />,
  },
];

export const About: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (prefersReducedMotion) {
        gsap.set('[data-about-anim]', { opacity: 1, y: 0 });
        return;
      }

      gsap.fromTo(
        '[data-about-anim]',
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            once: true,
            refreshPriority: 1,
          },
        }
      );
    },
    { scope: sectionRef, dependencies: [prefersReducedMotion] }
  );

  return (
    <section
      id="sobre"
      ref={sectionRef}
      aria-labelledby="about-heading"
      className="relative bg-obsidian py-20 sm:py-28 lg:py-36 overflow-hidden border-t border-white/[0.06]"
    >
      {/* Transição sutil do Hero e luz atmosférica discreta */}
      <div
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-px bg-gradient-to-r from-transparent via-accent-red/40 to-transparent"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -top-40 right-0 w-[480px] h-[480px] rounded-full bg-accent-red/[0.04] blur-[120px]"
        aria-hidden="true"
      />

      <Container className="relative z-10">
        {/* Cabeçalho de índice editorial */}
        <div
          data-about-anim
          className="flex items-center justify-between gap-4 pb-8 sm:pb-12 mb-10 sm:mb-14 border-b border-border-metallic"
        >
          <div className="flex items-center gap-3">
            <span
              className="w-2 h-2 rounded-full bg-accent-red shadow-[0_0_10px_rgba(225,29,42,0.8)]"
              aria-hidden="true"
            />
            <span className="font-mono text-xs uppercase tracking-[0.22em] text-text-white font-semibold">
              SOBRE A BATISTELA
            </span>
          </div>
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-text-chrome/60 hidden sm:inline-block">
            SEÇÃO 03 // APRESENTAÇÃO INSTITUCIONAL
          </span>
        </div>

        {/* Layout Editorial Assimétrico */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Coluna Esquerda: Narrativa Editorial Principal (5 colunas no desktop) */}
          <div className="lg:col-span-5 space-y-6 sm:space-y-8">
            <h2
              id="about-heading"
              data-about-anim
              className="font-display font-bold uppercase tracking-tight text-white text-[1.85rem] sm:text-4xl lg:text-[2.65rem] leading-[1.08]"
            >
              <span className="block">TECNOLOGIA E PRECISÃO</span>
              <span className="block mt-1 text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-text-chrome">
                EM CADA <span className="text-accent-red">DETALHE.</span>
              </span>
            </h2>

            <p
              data-about-anim
              className="text-base sm:text-lg text-text-chrome leading-relaxed font-normal max-w-[54ch]"
            >
              Na Batistela Auto Center, unimos atendimento próximo e soluções automotivas para
              cuidar do seu veículo com atenção, precisão e responsabilidade.
            </p>

            {/* Bloco visual editorial da estrutura real */}
            <div
              data-about-anim
              className="relative rounded-2xl overflow-hidden bg-carbon border border-border-metallic group"
            >
              <div className="aspect-[16/10] w-full overflow-hidden relative">
                <img
                  src={SITE_CONFIG.media.oficinaHilux}
                  alt="Estrutura interna da Batistela Auto Center em atendimento automotivo"
                  loading="lazy"
                  decoding="async"
                  width={960}
                  height={600}
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.02]"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/35 to-transparent"
                  aria-hidden="true"
                />
              </div>

              <div className="p-4 sm:p-5 flex items-center justify-between gap-4 bg-carbon/90 border-t border-white/[0.06]">
                <div className="flex items-center gap-2.5 min-w-0">
                  <MapPin className="w-4 h-4 text-accent-red shrink-0" />
                  <span className="font-mono text-xs text-text-white truncate">
                    {SITE_CONFIG.contact.address.street} • {SITE_CONFIG.contact.address.city}/{SITE_CONFIG.contact.address.state}
                  </span>
                </div>
                <span className="font-mono text-[10px] uppercase tracking-widest text-text-chrome shrink-0 px-2 py-1 rounded bg-graphite border border-white/5">
                  ESTRUTURA REAL
                </span>
              </div>
            </div>
          </div>

          {/* Coluna Direita: Os 4 Elementos de Destaque em Composição Assimétrica (7 colunas no desktop) */}
          <div className="lg:col-span-7 lg:pl-4 space-y-6">
            <div
              data-about-anim
              className="flex items-center justify-between text-xs font-mono uppercase tracking-[0.18em] text-text-chrome px-1"
            >
              <span>FRENTES DE ATUAÇÃO</span>
              <span className="inline-flex items-center gap-1 text-accent-red">
                <span>04 PILARES</span>
                <ArrowDownRight className="w-3.5 h-3.5" />
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              {HIGHLIGHT_PILLARS.map((pillar, idx) => (
                <article
                  key={pillar.index}
                  data-about-anim
                  className={`relative rounded-2xl p-6 sm:p-7 bg-graphite/60 border border-border-metallic hover:border-accent-red/40 transition-colors duration-300 flex flex-col justify-between min-h-[190px] sm:min-h-[215px] ${
                    idx % 2 === 1 ? 'sm:translate-y-4' : ''
                  }`}
                >
                  {/* Linha superior do card: Índice técnico + Ícone */}
                  <div className="flex items-center justify-between gap-3 mb-6">
                    <span className="font-mono text-xs font-semibold tracking-[0.2em] text-text-chrome/70">
                      /{pillar.index}
                    </span>
                    <div className="w-9 h-9 rounded-xl bg-obsidian/80 border border-white/[0.07] flex items-center justify-center">
                      {pillar.icon}
                    </div>
                  </div>

                  {/* Título e descrição enxuta */}
                  <div className="space-y-2">
                    <h3 className="font-display text-lg sm:text-xl font-bold text-white tracking-tight">
                      {pillar.title}
                    </h3>
                    <p className="text-sm text-text-chrome leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>

                  {/* Detalhe vermelho discreto na base do card */}
                  <div
                    className="mt-5 h-[2px] w-8 bg-accent-red/60 rounded-full"
                    aria-hidden="true"
                  />
                </article>
              ))}
            </div>

            {/* Nota de conexão com a próxima seção (Cinematic Scroll) */}
            <div
              data-about-anim
              className="pt-4 sm:pt-8 flex items-center justify-between gap-4 text-xs font-mono text-text-chrome/70 border-t border-white/[0.06]"
            >
              <span>ROLE PARA EXPLORAR A EXPERIÊNCIA EM MOVIMENTO</span>
              <span className="text-accent-red tracking-widest uppercase">↓ 04</span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default About;

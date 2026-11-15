import React from 'react';
import { SITE_CONFIG } from '@/config/siteConfig';
import { Container } from '@/components/common/Container';
import { Badge } from '@/components/common/Badge';
import { Button } from '@/components/common/Button';
import { MessageSquare, ShieldCheck, ArrowUpRight, Clock, Award } from 'lucide-react';

// Ícone SVG limpo para o Instagram
const InstagramIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg
    viewBox="0 0 24 24"
    width="24"
    height="24"
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

export const Contact: React.FC = () => {
  const whatsappCustomMessage = encodeURIComponent(
    'Olá! Conheci a Batistela Auto Center pelo site e gostaria de informações sobre os serviços.'
  );
  const whatsappUrlWithMessage = `${SITE_CONFIG.contact.whatsappUrl}?text=${whatsappCustomMessage}`;

  return (
    <section
      id="contato"
      aria-labelledby="contact-heading"
      className="relative py-24 sm:py-32 bg-obsidian border-t border-border-metallic/60 overflow-hidden"
    >
      {/* Background ambient lighting - subtle red aura and metallic grid */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-accent-red/10 rounded-full blur-[140px] pointer-events-none -z-10"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-[radial-gradient(#ffffff06_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none -z-10"
        aria-hidden="true"
      />

      <Container>
        <div className="relative rounded-2xl sm:rounded-3xl border border-border-metallic bg-gradient-to-b from-carbon/90 to-carbon/40 backdrop-blur-xl p-8 sm:p-12 md:p-16 shadow-2xl overflow-hidden">
          {/* Subtle accent corner highlights */}
          <div
            className="absolute top-0 right-0 w-48 h-48 bg-accent-red/15 rounded-full blur-3xl pointer-events-none"
            aria-hidden="true"
          />
          <div
            className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full blur-3xl pointer-events-none"
            aria-hidden="true"
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center relative z-10">
            {/* Left Column: Editorial Copy */}
            <div className="lg:col-span-7 space-y-6">
              <Badge variant="red">FALE COM A BATISTELA</Badge>

              <h2
                id="contact-heading"
                className="font-sans text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-text-white uppercase leading-[1.08]"
              >
                SEU CARRO MERECE <br />
                <span className="text-accent-red">O MELHOR CUIDADO.</span>
              </h2>

              <p className="text-base sm:text-lg text-text-chrome font-light max-w-xl leading-relaxed">
                Precisa de pneus, rodas, alinhamento ou serviços automotivos? Entre em contato com nossa equipe e saiba como podemos ajudar.
              </p>

              {/* Highlights / Trust Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-border-metallic/50 text-xs font-mono text-text-chrome">
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-accent-red shrink-0" />
                  <span>Atendimento Especializado</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Award className="w-4 h-4 text-accent-red shrink-0" />
                  <span>Tecnologia 3D de Ponta</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-accent-red shrink-0" />
                  <span>Agilidade e Confiança</span>
                </div>
              </div>
            </div>

            {/* Right Column: High-conversion CTAs & Channels */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              {/* Card WhatsApp */}
              <div className="p-6 rounded-2xl border border-border-metallic bg-graphite/60 backdrop-blur-md space-y-4 shadow-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-accent-red/15 border border-accent-red/30 flex items-center justify-center text-accent-red">
                      <MessageSquare className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs font-mono uppercase tracking-wider text-text-chrome">Canal Direto</span>
                      <p className="text-sm font-semibold text-text-white">WhatsApp Oficial</p>
                    </div>
                  </div>
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" title="Canal ativo" />
                </div>

                <p className="font-mono text-xl sm:text-2xl font-bold text-text-white tracking-wide">
                  {SITE_CONFIG.contact.phoneFormatted}
                </p>

                <Button
                  href={whatsappUrlWithMessage}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="primary"
                  size="lg"
                  className="w-full flex items-center justify-center gap-2 group"
                  aria-label="Falar pelo WhatsApp com a Batistela Auto Center (abre em nova aba)"
                >
                  <MessageSquare className="w-5 h-5 transition-transform group-hover:scale-110" />
                  <span>FALAR PELO WHATSAPP</span>
                  <ArrowUpRight className="w-4 h-4 ml-0.5 opacity-80 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Button>
              </div>

              {/* Card Instagram */}
              <div className="p-5 rounded-2xl border border-border-metallic/80 bg-graphite/40 backdrop-blur-md flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-text-white">
                    <InstagramIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-mono uppercase tracking-wider text-text-chrome">Acompanhe no Instagram</span>
                    <p className="text-sm font-medium text-text-white">{SITE_CONFIG.contact.instagramUser}</p>
                  </div>
                </div>

                <a
                  href={SITE_CONFIG.contact.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-carbon hover:bg-graphite border border-border-metallic text-xs font-semibold text-text-white hover:text-white transition-colors duration-200"
                  aria-label="Acessar o perfil oficial da Batistela Auto Center no Instagram (abre em nova aba)"
                >
                  <span>Seguir</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-text-chrome" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

import React from 'react';
import { SITE_CONFIG } from '@/config/siteConfig';
import { Container } from '@/components/common/Container';
import { Badge } from '@/components/common/Badge';
import { Button } from '@/components/common/Button';
import { MapPin, Navigation, Compass, ExternalLink } from 'lucide-react';

export const Location: React.FC = () => {
  // Endereço oficial confirmado
  const { address } = SITE_CONFIG.contact;

  // URL de embed oficial do Google Maps (busca pelo endereço formatado sem necessidade de API key paga)
  const mapEmbedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(
    `${address.street}, ${address.city} - ${address.state}`
  )}&t=&z=16&ie=UTF8&iwloc=&output=embed`;

  return (
    <section
      id="localizacao"
      aria-labelledby="location-heading"
      className="relative py-24 sm:py-32 bg-obsidian border-t border-border-metallic/60 overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div
        className="absolute top-1/3 right-1/4 w-[600px] h-[400px] bg-accent-red/5 rounded-full blur-[140px] pointer-events-none -z-10"
        aria-hidden="true"
      />

      <Container>
        {/* Section Header */}
        <div className="max-w-2xl mb-12 sm:mb-16 space-y-4">
          <Badge variant="metallic">LOCALIZAÇÃO ESTRATÉGICA</Badge>
          <h2
            id="location-heading"
            className="font-sans text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-text-white uppercase leading-tight"
          >
            ENCONTRE A BATISTELA.
          </h2>
          <p className="text-base sm:text-lg text-text-chrome font-light">
            Estamos em Engenheiro Coelho, prontos para receber você.
          </p>
        </div>

        {/* Main Content Grid: Address Details + Google Maps Embed */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Physical Address Details & Route CTA */}
          <div className="lg:col-span-5 flex flex-col justify-between p-8 sm:p-10 rounded-2xl sm:rounded-3xl border border-border-metallic bg-carbon/80 backdrop-blur-md shadow-xl">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-accent-red/15 border border-accent-red/30 flex items-center justify-center text-accent-red shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-mono uppercase tracking-wider text-text-chrome">Unidade Física</span>
                  <h3 className="text-lg font-bold text-text-white">{SITE_CONFIG.name}</h3>
                </div>
              </div>

              {/* Endereço Detalhado */}
              <div className="space-y-2 py-4 border-y border-border-metallic/60">
                <p className="text-xl sm:text-2xl font-semibold text-text-white tracking-tight">
                  {address.street}
                </p>
                <p className="text-base text-text-chrome">
                  {address.neighborhood} • {address.city} — {address.state}
                </p>
                <p className="font-mono text-sm text-text-chrome/80 tracking-wide">
                  CEP {address.postalCode}
                </p>
              </div>

              {/* Informações adicionais / Referência */}
              <div className="space-y-3 text-xs font-mono text-text-chrome">
                <div className="flex items-start gap-2.5">
                  <Compass className="w-4 h-4 text-accent-red shrink-0 mt-0.5" />
                  <span>Fácil acesso pela região central com estacionamento e entrada para veículos.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Navigation className="w-4 h-4 text-accent-red shrink-0 mt-0.5" />
                  <span>Atendimento presencial ágil com equipe técnica no local.</span>
                </div>
              </div>
            </div>

            {/* Botão Traçar Rota */}
            <div className="pt-8">
              <Button
                href={address.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                variant="metallic"
                size="lg"
                className="w-full flex items-center justify-center gap-2 group hover:border-accent-red/40"
                aria-label={`Traçar rota até a Batistela Auto Center em ${address.street}, Engenheiro Coelho no Google Maps (abre em nova aba)`}
              >
                <Navigation className="w-5 h-5 text-accent-red transition-transform group-hover:rotate-45" />
                <span className="font-bold tracking-wide">TRAÇAR ROTA</span>
                <ExternalLink className="w-4 h-4 opacity-70 ml-1 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Button>
            </div>
          </div>

          {/* Right Column: Embedded Google Maps (Responsive, No CLS, Lazy loaded) */}
          <div className="lg:col-span-7 rounded-2xl sm:rounded-3xl border border-border-metallic overflow-hidden bg-graphite/40 shadow-2xl relative min-h-[380px] lg:min-h-[460px] flex flex-col">
            {/* Top Bar decorativa para consistência de interface */}
            <div className="px-5 py-3 border-b border-border-metallic/80 bg-carbon/90 backdrop-blur-sm flex items-center justify-between text-xs font-mono text-text-chrome">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-accent-red" />
                <span className="uppercase tracking-wider">Google Maps • Engenheiro Coelho</span>
              </div>
              <a
                href={address.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-text-white transition-colors flex items-center gap-1"
                aria-label="Abrir mapa em tela cheia no Google Maps (abre em nova aba)"
              >
                <span>Tela cheia</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            {/* Frame do Mapa Responsivo com container ratio dedicado */}
            <div className="relative flex-1 w-full min-h-[340px]">
              <iframe
                title="Mapa de localização da Batistela Auto Center em Engenheiro Coelho - SP"
                src={mapEmbedUrl}
                width="100%"
                height="100%"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 w-full h-full border-0 filter grayscale-[40%] contrast-[110%] hover:grayscale-0 transition-all duration-500"
                aria-label="Mapa interativo com a localização de Batistela Auto Center"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

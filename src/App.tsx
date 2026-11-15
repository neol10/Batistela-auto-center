import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import {
  Hero,
  About,
  CinematicScroll,
  Services,
  FacilityGallery,
  Contact,
  Location,
  Footer,
} from '@/sections';
import { CheckCircle2, X } from 'lucide-react';

export function App() {
  const [activeNotice, setActiveNotice] = useState<string | null>(null);

  const handleUpcomingNotice = (sectionName: string) => {
    setActiveNotice(sectionName);
    // Auto-dispensa após 4 segundos
    setTimeout(() => {
      setActiveNotice((curr) => (curr === sectionName ? null : curr));
    }, 4000);
  };

  const handleScrollToServices = () => {
    const servicesEl = document.querySelector('#servicos');
    if (servicesEl) {
      servicesEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-obsidian text-text-white flex flex-col justify-between selection:bg-accent-red selection:text-white">
      {/* 01. HEADER PREMIUM FIXO */}
      <Header onUpcomingSectionNotice={handleUpcomingNotice} />

      <main className="flex-1">
        {/* 02. HERO CINEMATOGRÁFICO */}
        <Hero onExploreClick={handleScrollToServices} />

        {/* 03. APRESENTAÇÃO INSTITUCIONAL */}
        <About />

        {/* 04. CINEMATIC SCROLL INTERATIVO */}
        <CinematicScroll />

        {/* 05. SERVIÇOS AUTOMOTIVOS */}
        <Services />

        {/* 06. ESTRUTURA E GALERIA FOTOGRÁFICA */}
        <FacilityGallery />

        {/* 07. CONTATO E CONVERSÃO WHATSAPP */}
        <Contact />

        {/* 08. LOCALIZAÇÃO E GOOGLE MAPS */}
        <Location />

        {/* Notificação flutuante acessível para eventos do sistema */}
        {activeNotice && (
          <div
            role="status"
            aria-live="polite"
            className="fixed bottom-6 right-6 z-50 max-w-sm bg-carbon/95 backdrop-blur-md border border-border-metallic shadow-2xl p-4 rounded-xl flex items-start gap-3 animate-fade-in"
          >
            <div className="w-8 h-8 rounded-lg bg-accent-red/20 border border-accent-red/30 flex items-center justify-center shrink-0 text-accent-red">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div className="space-y-1 flex-1">
              <p className="text-xs font-mono uppercase tracking-wider text-text-chrome">
                Aviso
              </p>
              <p className="text-sm font-medium text-white">
                {activeNotice}
              </p>
            </div>
            <button
              onClick={() => setActiveNotice(null)}
              className="text-text-chrome hover:text-white p-1 rounded min-w-[32px] min-h-[32px] inline-flex items-center justify-center"
              aria-label="Fechar aviso"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}
      </main>

      {/* 09. RODAPÉ INSTITUCIONAL PREMIUM */}
      <Footer />
    </div>
  );
}

export default App;

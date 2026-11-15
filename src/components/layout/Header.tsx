import React, { useState, useEffect, useRef } from 'react';
import { SITE_CONFIG } from '@/config/siteConfig';
import { Container } from '@/components/common/Container';
import { Button } from '@/components/common/Button';
import { useScrollLock } from '@/hooks/useScrollLock';
import { Menu, X, MessageSquare } from 'lucide-react';

interface HeaderProps {
  onUpcomingSectionNotice?: (sectionName: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onUpcomingSectionNotice }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useScrollLock(isMobileMenuOpen);

  // Monitora rolagem para alterar superfície do Header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fechamento com tecla Escape e foco acessível
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };

    if (isMobileMenuOpen) {
      window.addEventListener('keydown', handleKeyDown);
      closeButtonRef.current?.focus();
    }

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMobileMenuOpen]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, label: string) => {
    setIsMobileMenuOpen(false);

    if (href === '#hero' || href === '#') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // Se o elemento existe na página, permite a rolagem suave nativa
    const targetElement = document.querySelector(href);
    if (targetElement) {
      e.preventDefault();
      targetElement.scrollIntoView({ behavior: 'smooth' });
    } else {
      // Estratégia temporária acessível para seções futuras autorizadas nas próximas etapas
      e.preventDefault();
      if (onUpcomingSectionNotice) {
        onUpcomingSectionNotice(label);
      }
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-obsidian/90 backdrop-blur-md border-b border-border-metallic shadow-metallic py-3 sm:py-3.5'
            : 'bg-gradient-to-b from-black/80 via-black/40 to-transparent py-4 sm:py-6'
        }`}
      >
        <Container className="flex items-center justify-between">
          {/* Logo e Nome da Marca */}
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, '#hero', 'Início')}
            className="flex items-center gap-3 group focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-red rounded-lg p-1 -m-1"
            aria-label="Batistela Auto Center - Voltar ao início"
          >
            <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-lg overflow-hidden border border-white/10 group-hover:border-accent-red/50 transition-colors shrink-0 bg-carbon">
              <img
                src={SITE_CONFIG.media.logo}
                alt="Logo Batistela"
                className="w-full h-full object-cover"
                width={40}
                height={40}
              />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-bold text-sm sm:text-base tracking-tight text-white leading-tight group-hover:text-white transition-colors">
                BATISTELA
              </span>
              <span className="font-mono text-[9px] sm:text-[10px] text-text-chrome tracking-widest uppercase">
                AUTO CENTER
              </span>
            </div>
          </a>

          {/* Navegação Desktop */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2" aria-label="Navegação principal">
            {SITE_CONFIG.navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href, link.label)}
                className="px-3.5 py-2 text-sm font-medium text-text-chrome hover:text-white rounded-lg transition-colors hover:bg-white/[0.04] focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-red"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Ações à Direita (CTA WhatsApp & Hamburger Mobile) */}
          <div className="flex items-center gap-3">
            <Button
              href={SITE_CONFIG.contact.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              variant="primary"
              size="sm"
              icon={<MessageSquare className="w-4 h-4" />}
              className="hidden sm:inline-flex"
              aria-label="Agendar atendimento pelo WhatsApp (abre em nova aba)"
            >
              Agendar
            </Button>

            {/* Botão Hambúrguer Mobile */}
            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden inline-flex items-center justify-center min-w-[44px] min-h-[44px] rounded-lg text-text-chrome hover:text-white hover:bg-carbon border border-border-metallic transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-red"
              aria-label="Abrir menu de navegação"
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-navigation-drawer"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </Container>
      </header>

      {/* Drawer Mobile Acessível */}
      {isMobileMenuOpen && (
        <div
          id="mobile-navigation-drawer"
          role="dialog"
          aria-modal="true"
          aria-label="Menu de navegação"
          className="fixed inset-0 z-50 lg:hidden flex justify-end"
        >
          {/* Overlay com desfoque */}
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Painel Lateral */}
          <div className="relative w-full max-w-xs sm:max-w-sm bg-carbon border-l border-border-metallic h-full p-6 flex flex-col justify-between shadow-2xl z-10 overflow-y-auto">
            <div className="space-y-6">
              {/* Topo do Menu com Botão Fechar */}
              <div className="flex items-center justify-between pb-4 border-b border-border-metallic">
                <div className="flex items-center gap-2.5">
                  <img
                    src={SITE_CONFIG.media.logo}
                    alt="Logo Batistela"
                    className="w-8 h-8 rounded border border-white/10"
                  />
                  <span className="font-display font-bold text-sm text-white">
                    BATISTELA
                  </span>
                </div>
                <button
                  ref={closeButtonRef}
                  type="button"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="inline-flex items-center justify-center min-w-[44px] min-h-[44px] rounded-lg text-text-chrome hover:text-white hover:bg-graphite transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-red"
                  aria-label="Fechar menu de navegação"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Lista de Links de Navegação Mobile */}
              <nav className="flex flex-col gap-1.5" aria-label="Links de seções no mobile">
                {SITE_CONFIG.navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href, link.label)}
                    className="flex items-center justify-between min-h-[44px] px-3.5 py-2.5 text-base font-medium text-text-chrome hover:text-white hover:bg-graphite/50 rounded-lg transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-red"
                  >
                    <span>{link.label}</span>
                    <span className="text-xs font-mono text-white/30">→</span>
                  </a>
                ))}
              </nav>
            </div>

            {/* Rodapé do Menu com WhatsApp e Localização */}
            <div className="pt-6 border-t border-border-metallic space-y-4">
              <Button
                href={SITE_CONFIG.contact.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                variant="primary"
                size="md"
                className="w-full justify-center"
                icon={<MessageSquare className="w-4 h-4" />}
              >
                Agendar pelo WhatsApp
              </Button>

              <div className="text-xs font-mono text-text-chrome/70 space-y-1">
                <p>{SITE_CONFIG.contact.address.street}</p>
                <p>Engenheiro Coelho — SP</p>
                <p className="text-white/40">{SITE_CONFIG.contact.phoneFormatted}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

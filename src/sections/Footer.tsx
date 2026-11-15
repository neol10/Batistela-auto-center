import React from 'react';
import { SITE_CONFIG } from '@/config/siteConfig';
import { Container } from '@/components/common/Container';
import { MessageSquare, MapPin, ArrowUp } from 'lucide-react';

const InstagramIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
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

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href === '#hero' || href === '#') {
      e.preventDefault();
      handleScrollToTop();
      return;
    }

    const targetElement = document.querySelector(href);
    if (targetElement) {
      e.preventDefault();
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer
      id="rodape"
      className="relative bg-obsidian border-t border-border-metallic/80 pt-16 pb-12 overflow-hidden text-text-chrome"
      role="contentinfo"
      aria-label="Rodapé institucional"
    >
      <Container>
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-14 border-b border-border-metallic/60">
          {/* Column 1: Brand & Bio (5 cols) */}
          <div className="lg:col-span-5 space-y-5">
            <div className="flex items-center gap-3">
              <img
                src={SITE_CONFIG.media.logo}
                alt="Logotipo Batistela Auto Center"
                width={40}
                height={40}
                className="w-10 h-10 object-contain rounded-lg bg-carbon border border-border-metallic p-1"
                loading="lazy"
              />
              <span className="font-sans text-lg sm:text-xl font-extrabold tracking-tight text-text-white uppercase">
                Batistela <span className="text-accent-red">Auto Center</span>
              </span>
            </div>

            <p className="text-sm font-light text-text-chrome max-w-sm leading-relaxed">
              Referência em alinhamento 3D computadorizado, balanceamento de precisão, pneus e rodas de alto padrão em Engenheiro Coelho e região.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href={SITE_CONFIG.contact.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-carbon hover:bg-graphite border border-border-metallic flex items-center justify-center text-text-chrome hover:text-accent-red transition-colors duration-200"
                aria-label="Conversar pelo WhatsApp oficial da Batistela Auto Center (abre em nova aba)"
              >
                <MessageSquare className="w-4 h-4" />
              </a>
              <a
                href={SITE_CONFIG.contact.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-carbon hover:bg-graphite border border-border-metallic flex items-center justify-center text-text-chrome hover:text-text-white transition-colors duration-200"
                aria-label="Seguir a Batistela Auto Center no Instagram oficial (abre em nova aba)"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="font-mono text-xs uppercase tracking-widest text-text-white font-semibold">
              Navegação
            </h3>
            <ul className="space-y-2.5 text-sm">
              {SITE_CONFIG.navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="hover:text-text-white transition-colors duration-150 inline-block py-0.5"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact & Address (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <h3 className="font-mono text-xs uppercase tracking-widest text-text-white font-semibold">
              Atendimento & Endereço
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-accent-red shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  {SITE_CONFIG.contact.address.street}, {SITE_CONFIG.contact.address.neighborhood} <br />
                  {SITE_CONFIG.contact.address.city} — {SITE_CONFIG.contact.address.state} <br />
                  CEP {SITE_CONFIG.contact.address.postalCode}
                </span>
              </div>
              <div className="flex items-center gap-2.5 pt-1">
                <MessageSquare className="w-4 h-4 text-accent-red shrink-0" />
                <a
                  href={SITE_CONFIG.contact.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono font-medium hover:text-text-white transition-colors"
                >
                  {SITE_CONFIG.contact.phoneFormatted}
                </a>
              </div>
            </div>

            {/* Back to top button */}
            <div className="pt-2">
              <button
                type="button"
                onClick={handleScrollToTop}
                className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-text-chrome hover:text-text-white py-1 transition-colors"
                aria-label="Voltar ao topo da página"
              >
                <ArrowUp className="w-3.5 h-3.5 text-accent-red" />
                <span>Voltar ao topo</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & NEWNEO Credit */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-text-chrome/70">
          <p className="text-center sm:text-left">
            © {currentYear} {SITE_CONFIG.name}. Todos os direitos reservados.
          </p>

          {/* Crédito Obrigatório de Desenvolvimento NEWNEO */}
          <div className="flex items-center gap-1.5 text-center sm:text-right">
            <span className="text-text-chrome/60">Desenvolvido por</span>
            <a
              href="https://www.instagram.com/newneo.br/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold tracking-wider text-text-white hover:text-accent-red transition-colors duration-200 focus-visible:outline-accent-red px-1 py-0.5 rounded"
              aria-label="Desenvolvido por NEWNEO (abre perfil no Instagram em nova aba)"
            >
              NEWNEO
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
};

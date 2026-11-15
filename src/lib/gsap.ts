/**
 * Inicialização e Configuração Oficial do GSAP + ScrollTrigger + @gsap/react
 * Baseado nas diretrizes oficiais das skills gsap-core, gsap-scrolltrigger e gsap-react
 */

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

// Registro dos plugins necessários em ambiente client-side
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
  
  // Defaults de transição suaves e refinados
  gsap.defaults({
    ease: 'power2.out',
    duration: 0.6,
  });
}

/**
 * Utilitário seguro para recalcular posições do ScrollTrigger
 * Deve ser chamado após renderizações dinâmicas ou carregamento tardio de fontes/imagens
 */
export const refreshScrollTrigger = () => {
  if (typeof window !== 'undefined') {
    ScrollTrigger.refresh();
  }
};

/**
 * Cria uma instância de matchMedia pré-configurada com os breakpoints do projeto
 * e verificação de acessibilidade para prefers-reduced-motion.
 */
export const createMatchMedia = () => {
  const mm = gsap.matchMedia();
  return {
    mm,
    conditions: {
      isMobile: '(max-width: 767px)',
      isTablet: '(min-width: 768px) and (max-width: 1023px)',
      isDesktop: '(min-width: 1024px)',
      reduceMotion: '(prefers-reduced-motion: reduce)',
    },
  };
};

export { gsap, ScrollTrigger, useGSAP };
export default gsap;

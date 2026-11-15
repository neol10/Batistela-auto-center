/**
 * Registro de Seções Futuras - Batistela Auto Center
 * Estrutura reservada para implementação nas próximas etapas autorizadas.
 * 
 * 01. Header Premium
 * 02. Hero Cinematográfico (hero-optimized.mp4)
 * 03. Apresentação Institucional
 * 04. Cinematic Scroll (video-scroll-gop4-720p.mp4)
 * 05. Serviços Automotivos (4 Pilares)
 * 06. Estrutura e Galeria (Bento Grid)
 * 07. Atendimento WhatsApp & Instagram
 * 08. Localização Google Maps
 * 09. Rodapé Institucional
 */

export const SECTION_IDS = {
  hero: 'hero',
  sobre: 'sobre',
  experiencia: 'experiencia',
  servicos: 'servicos',
  estrutura: 'estrutura',
  contato: 'contato',
  localizacao: 'localizacao',
  rodape: 'rodape',
} as const;

export type SectionId = typeof SECTION_IDS[keyof typeof SECTION_IDS];

export { Hero } from './Hero';
export { About } from './About';
export { CinematicScroll } from './CinematicScroll';
export { Services } from './Services';
export { FacilityGallery } from './FacilityGallery';
export { Contact } from './Contact';
export { Location } from './Location';
export { Footer } from './Footer';

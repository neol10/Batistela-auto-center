/**
 * Design Tokens Oficiais - Batistela Auto Center
 * Paleta extraída da identidade visual e materiais oficiais
 */

export const COLOR_TOKENS = {
  background: {
    obsidian: '#070709', // Fundo cinematográfico principal
    carbon: '#101115',   // Superfície elevada 1 (cards e containers)
    graphite: '#181A20', // Superfície elevada 2 (hover e destaques)
  },
  accent: {
    red: '#E11D2A',                         // Vermelho Performance
    redGlow: 'rgba(225, 29, 42, 0.28)',    // Luz de recorte do logo
    redSubtle: 'rgba(225, 29, 42, 0.12)',  // Badges e destaques suaves
  },
  text: {
    white: '#F5F7FA',   // Branco técnico para leitura
    chrome: '#9CA3AF',  // Prata/grafite para legendas e metadados
    muted: '#6B7280',   // Informações complementares
  },
  border: {
    metallic: 'rgba(255, 255, 255, 0.08)',       // Divisores de precisão
    metallicHover: 'rgba(255, 255, 255, 0.16)',  // Estado ativo/hover
    redSubtle: 'rgba(225, 29, 42, 0.35)',        // Contornos de destaque
  },
} as const;

export const TYPOGRAPHY_TOKENS = {
  fonts: {
    display: '"Space Grotesk", Syne, system-ui, sans-serif',
    sans: 'Inter, "Plus Jakarta Sans", system-ui, sans-serif',
    mono: '"JetBrains Mono", monospace',
  },
  weights: {
    regular: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
} as const;

export const BREAKPOINTS = {
  xs: 360,
  smPhone: 390,
  mdPhone: 430,
  sm: 640,
  md: 768,      // Tablet
  lg: 1024,     // Desktop
  xl: 1280,
  xxl: 1536,
  ultraWide: 1920,
} as const;

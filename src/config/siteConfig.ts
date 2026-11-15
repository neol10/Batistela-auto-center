/**
 * Configurações comerciais e de navegação - Batistela Auto Center
 * Somente dados oficiais confirmados pela auditoria.
 */

export const SITE_CONFIG = {
  name: 'Batistela Auto Center',
  tagline: 'Centro Automotivo de Alta Precisão',
  description: 'Referência em alinhamento 3D, balanceamento, pneus, rodas e manutenção preventiva em Engenheiro Coelho e região.',

  contact: {
    phoneFormatted: '(19) 99961-9984',
    phoneRaw: '5519999619984',
    whatsappUrl: 'https://wa.me/5519999619984',
    instagramUser: '@batistelaautocenter',
    instagramUrl: 'https://instagram.com/batistelaautocenter',
    address: {
      street: 'Av. Luiz Fávero, 94',
      neighborhood: 'Centro',
      city: 'Engenheiro Coelho',
      state: 'SP',
      postalCode: '13165-000',
      full: 'Av. Luiz Fávero, 94, Centro, Engenheiro Coelho - SP, CEP 13165-000',
      googleMapsUrl: 'https://maps.google.com/?q=Av.+Luiz+F%C3%A1vero,+94,+Engenheiro+Coelho+-+SP',
    },
  },

  // 4 Pilares de serviços confirmados
  services: [
    {
      id: 'alinhamento-3d',
      title: 'ALINHAMENTO 3D',
      shortDescription:
        'Tecnologia de medição para verificar e ajustar a geometria das rodas conforme as especificações do veículo.',
    },
    {
      id: 'pneus-e-rodas',
      title: 'PNEUS E RODAS',
      shortDescription:
        'Opções de pneus e rodas para diferentes necessidades, com orientação na escolha e montagem.',
    },
    {
      id: 'balanceamento',
      title: 'BALANCEAMENTO',
      shortDescription:
        'Serviço voltado ao equilíbrio do conjunto de rodas e pneus, ajudando a reduzir vibrações durante a condução.',
    },
    {
      id: 'manutencao-automotiva',
      title: 'MANUTENÇÃO AUTOMOTIVA',
      shortDescription:
        'Cuidados e serviços de manutenção para ajudar a preservar o funcionamento do veículo.',
    },
  ],

  // 9 Seções planejadas
  navLinks: [
    { label: 'Início', href: '#hero' },
    { label: 'A Batistela', href: '#sobre' },
    { label: 'Experiência', href: '#experiencia' },
    { label: 'Serviços', href: '#servicos' },
    { label: 'Estrutura', href: '#estrutura' },
    { label: 'Contato', href: '#contato' },
    { label: 'Localização', href: '#localizacao' },
  ],

  media: {
    logo: '/media/logo.webp',
    heroVideo: '/media/hero-optimized.mp4',
    heroPoster: '/media/hero-poster.webp',
    scrollVideo: '/media/video-scroll-optimized.mp4',
    scrollPoster: '/media/scroll-poster.webp',
    oficinaHilux: '/media/estrutura-hilux.webp',
    servicoAlinhamento: '/media/servico-alinhamento-3d.webp',
    servicoPneusRodas: '/media/servico-pneus-rodas.webp',
    servicoManutencao: '/media/servico-manutencao.webp',
  },
} as const;

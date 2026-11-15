/**
 * Tipagens globais do projeto Batistela Auto Center
 */

export interface NavLink {
  label: string;
  href: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  shortDescription: string;
}

export interface SiteContact {
  phoneFormatted: string;
  phoneRaw: string;
  whatsappUrl: string;
  instagramUser: string;
  instagramUrl: string;
  address: {
    street: string;
    neighborhood: string;
    city: string;
    state: string;
    postalCode: string;
    full: string;
    googleMapsUrl: string;
  };
}

export type Breakpoint = 'xs' | 'smPhone' | 'mdPhone' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'ultraWide';

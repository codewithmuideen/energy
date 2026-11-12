import { services } from './services';

export const mainNav = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  {
    label: 'Services',
    to: '/services',
    children: services.map((s) => ({ label: s.title, to: `/services/${s.slug}`, icon: s.icon })),
  },
  { label: 'Projects', to: '/projects' },
  { label: 'Sustainability', to: '/sustainability' },
  { label: 'Insights', to: '/insights' },
  { label: 'Contact', to: '/contact' },
];

export const footerNav = {
  company: [
    { label: 'About Us', to: '/about' },
    { label: 'Projects', to: '/projects' },
    { label: 'Sustainability', to: '/sustainability' },
    { label: 'Insights', to: '/insights' },
    { label: 'Contact', to: '/contact' },
  ],
  legal: [
    { label: 'Privacy Policy', to: '/privacy-policy' },
    { label: 'Terms & Conditions', to: '/terms' },
    { label: 'Media Credits', to: '/credits' },
  ],
};

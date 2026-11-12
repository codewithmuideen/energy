import { services } from './services';

export const mainNav = [
  { label: 'Home', to: '/' },
  {
    label: 'About Us',
    to: '/about',
    children: [
      { label: 'Who We Are', to: '/about#who-we-are', desc: 'Our story and what drives us' },
      { label: 'Vision & Mission', to: '/about#vision-mission', desc: 'Where we are heading' },
      { label: 'Core Values', to: '/about#values', desc: 'The principles we work by' },
      { label: 'Our Responsibility', to: '/about#responsibility', desc: 'How we hold ourselves accountable' },
    ],
  },
  {
    label: 'Our Services',
    to: '/services',
    children: services.map((s) => ({ label: s.title, to: `/services/${s.slug}`, desc: s.index })),
  },
  { label: 'Our Business', to: '/business' },
  { label: 'Sustainability', to: '/sustainability' },
  { label: 'Insights', to: '/insights' },
  { label: 'Contact', to: '/contact' },
];

export const footerNav = {
  company: [
    { label: 'About Us', to: '/about' },
    { label: 'Our Business', to: '/business' },
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

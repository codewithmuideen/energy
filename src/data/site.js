// Single source of truth for company details, so contact info stays consistent site-wide.
export const SITE = {
  // Public brand name used across the website.
  brand: 'ApexCore Energy',
  // Registered company name (legal notices, copyright, schema).
  name: 'Apex Core Oil and Energy Resources Ltd',
  shortName: 'ApexCore Energy',
  tagline: 'Solar & Renewable Energy',
  url: 'https://apexcoreenergy.com',
  email: 'support@apexcoreenergy.com',
  phoneDisplay: '+234 912 198 0737',
  phoneHref: '+2349121980737',
  hours: 'Mon – Sat, 8:00am – 6:00pm',
  address: {
    street: '12 Shade Shomefun Street',
    area: 'Aguda',
    locality: 'Surulere',
    region: 'Lagos State',
    country: 'Nigeria',
    countryCode: 'NG',
  },
  addressShort: 'Aguda, Surulere, Lagos',
  addressLine: '12 Shade Shomefun Street, Aguda, Surulere, Lagos State, Nigeria.',
  mapsUrl:
    'https://www.google.com/maps/search/?api=1&query=' +
    encodeURIComponent('12 Shade Shomefun Street, Aguda, Surulere, Lagos, Nigeria'),
  features: {
    // Embed a Google Map on the contact page once the exact pin has been verified.
    mapEmbed: true,
    // Show a WhatsApp button once the number is confirmed as a WhatsApp line.
    whatsapp: false,
  },
  // Add verified social profiles, e.g. { linkedin: 'https://linkedin.com/company/...' }.
  // Only non-empty values are rendered.
  social: {},
  description:
    'ApexCore Energy designs, installs and maintains solar and battery energy systems for homes, businesses and communities across Nigeria — clean, reliable power that cuts grid and diesel costs.',
};

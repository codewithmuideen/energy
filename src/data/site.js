// Single source of truth for company details, so contact info stays consistent site-wide.
export const SITE = {
  name: 'Apex Core Oil and Energy Resources Ltd',
  shortName: 'Apex Core',
  url: 'https://apexcoreenergy.com',
  email: 'support@apexcoreenergy.com',
  phoneDisplay: '+234 912 198 0737',
  phoneHref: '+2349121980737',
  address: {
    street: '12 Shade Shomefun Street',
    area: 'Aguda',
    locality: 'Surulere',
    region: 'Lagos State',
    country: 'Nigeria',
    countryCode: 'NG',
  },
  addressLine: '12 Shade Shomefun Street, Aguda, Surulere, Lagos State, Nigeria.',
  mapsUrl:
    'https://www.google.com/maps/search/?api=1&query=' +
    encodeURIComponent('12 Shade Shomefun Street, Aguda, Surulere, Lagos, Nigeria'),
  // Feature flags: switch on only once the company has approved / verified them.
  features: {
    // Embed a Google Map on the contact page once the exact pin has been verified.
    mapEmbed: false,
    // Show a WhatsApp enquiry button once the number is confirmed as a WhatsApp line.
    whatsapp: false,
  },
  // Add verified social profiles here, e.g. { linkedin: 'https://linkedin.com/company/...' }.
  // Nothing is rendered for empty values, so no unverified links appear on the site.
  social: {},
  description:
    'Apex Core Oil and Energy Resources Ltd is a Lagos-based energy resources company focused on professional business relationships, energy industry opportunities and responsible growth.',
};

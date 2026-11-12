// PLACEHOLDER ARTICLES
// Every entry below is sample editorial content used to demonstrate the Insights system.
// They are flagged `placeholder: true`, rendered with a visible "Sample article" label,
// marked noindex and excluded from the sitemap. Replace with approved Apex Core content.

export const categories = [
  'Energy Markets',
  'Industry Perspectives',
  'Business Developments',
  'Sustainability',
  'Company Announcements',
];

export const insights = [
  {
    slug: 'what-shapes-petroleum-product-pricing',
    placeholder: true,
    featured: true,
    category: 'Energy Markets',
    title: 'Reading the Signals: What Shapes Petroleum Product Pricing',
    excerpt:
      'Crude benchmarks, freight, exchange rates and local logistics all leave their mark on the price of refined products. A look at the moving parts behind the number.',
    image: 'refinery-lit',
    imageAlt: 'Petrochemical plant lit up at night with plumes rising into the sky',
    body: [
      { type: 'p', text: 'The price of a refined petroleum product is rarely the result of a single factor. It is the sum of a chain of decisions and conditions that stretch from the oil field to the final point of sale, and each link in that chain can move independently.' },
      { type: 'h2', text: 'The crude starting point' },
      { type: 'p', text: 'International crude benchmarks set the foundation. Changes in global supply, production policy and demand expectations ripple outward into every product derived from crude, though not always at the same speed or in the same proportion.' },
      { type: 'h2', text: 'Refining, freight and currency' },
      { type: 'p', text: 'Refining margins vary by product and season. Shipping costs depend on vessel availability and route conditions. For import-dependent markets, exchange rates can be as influential as the underlying commodity price itself.' },
      { type: 'quote', text: 'Understanding the components of price is the first step towards managing exposure to it.' },
      { type: 'h2', text: 'The last mile' },
      { type: 'p', text: 'Storage, haulage, regulatory charges and distribution margins complete the picture. For businesses that depend on fuel, visibility across each of these components makes planning more resilient and conversations with suppliers more productive.' },
    ],
  },
  {
    slug: 'trust-is-the-real-infrastructure',
    placeholder: true,
    category: 'Industry Perspectives',
    title: 'Why Trust Is the Real Infrastructure of the Energy Business',
    excerpt:
      'Pipelines and terminals move product, but relationships move the industry. On the quiet value of reliability, transparency and keeping one’s word.',
    image: 'workers-walking',
    imageAlt: 'Two workers in safety helmets and uniforms walking across a project site',
    body: [
      { type: 'p', text: 'Physical infrastructure is easy to see. What is less visible, but just as essential, is the web of trust that allows transactions to happen at all: the confidence that a cargo will arrive as specified, that payment will follow, that a partner will do what they said.' },
      { type: 'h2', text: 'Reputation compounds' },
      { type: 'p', text: 'In a sector where transactions are large and margins can be narrow, a reliable reputation compounds over time. Each commitment kept makes the next conversation easier.' },
      { type: 'quote', text: 'Contracts define obligations. Character determines whether they are honoured.' },
      { type: 'h2', text: 'Transparency as a habit' },
      { type: 'p', text: 'Clear documentation, honest communication when things change and a willingness to address problems early are habits, not policies. They are what turn counterparties into long-term partners.' },
    ],
  },
  {
    slug: 'partnerships-that-outlast-a-transaction',
    placeholder: true,
    category: 'Business Developments',
    title: 'Building Partnerships That Outlast a Single Transaction',
    excerpt:
      'The strongest energy partnerships are designed for the long term. What it takes to find, structure and sustain relationships that create shared value.',
    image: 'engineers-plan',
    imageAlt: 'Engineers studying construction plans together on site',
    body: [
      { type: 'p', text: 'A single transaction can be profitable. A partnership, built well, can be transformative. The difference lies in alignment: shared standards, compatible goals and a clear understanding of what each party brings.' },
      { type: 'h2', text: 'Choosing well' },
      { type: 'p', text: 'Due diligence is not only about financial standing. It is also about culture, safety record, approach to compliance and how an organisation behaves when circumstances become difficult.' },
      { type: 'h2', text: 'Structuring for durability' },
      { type: 'p', text: 'Durable partnerships define roles clearly, anticipate change and include mechanisms for honest review. They are built to adapt, not merely to close.' },
    ],
  },
  {
    slug: 'practical-responsibility-in-everyday-operations',
    placeholder: true,
    category: 'Sustainability',
    title: 'Practical Responsibility: Safety and Environment in Everyday Operations',
    excerpt:
      'Responsibility is shaped less by statements than by daily choices. How safety culture and environmental awareness show up in ordinary decisions.',
    image: 'river-delta',
    imageAlt: 'Aerial view of a winding river through green wetland',
    body: [
      { type: 'p', text: 'Large commitments make headlines, but responsibility in the energy sector is mostly practised in small, repeated decisions: choosing a qualified contractor, insisting on proper procedures, refusing a shortcut.' },
      { type: 'h2', text: 'Safety as culture' },
      { type: 'p', text: 'The most effective safety cultures are ones where anyone feels able to stop work when something looks wrong. Policies support this, but leadership behaviour sustains it.' },
      { type: 'h2', text: 'Environment in the details' },
      { type: 'p', text: 'Careful product handling, spill prevention and responsible waste management are everyday disciplines. Done consistently, they protect people, ecosystems and the long-term licence to operate.' },
    ],
  },
  {
    slug: 'official-announcements',
    placeholder: true,
    category: 'Company Announcements',
    title: 'Official Company Announcements Will Appear Here',
    excerpt:
      'This space is reserved for verified announcements from Apex Core Oil and Energy Resources Ltd. No announcements have been published yet.',
    image: 'city-night',
    imageAlt: 'Aerial view of a city skyline illuminated at night',
    body: [
      { type: 'p', text: 'This page is a placeholder. Official announcements from Apex Core Oil and Energy Resources Ltd will be published here once they have been approved by the company.' },
      { type: 'p', text: 'For current enquiries, please contact our team directly at support@apexcoreenergy.com or call +234 912 198 0737.' },
    ],
  },
  {
    slug: 'downstream-fundamentals-terminal-to-customer',
    placeholder: true,
    category: 'Industry Perspectives',
    title: 'Downstream Fundamentals: Moving Product From Terminal to Customer',
    excerpt:
      'Storage, quality control, haulage and scheduling. A primer on the downstream steps that determine whether fuel arrives safely, on time and on specification.',
    image: 'haulage',
    imageAlt: 'Worker guiding a large freight truck at a logistics depot',
    body: [
      { type: 'p', text: 'Between the import terminal and the end customer lies a sequence of steps that each carry risk: storage, quality testing, loading, transport and delivery. Getting them right is what distinguishes reliable supply from unreliable supply.' },
      { type: 'h2', text: 'Quality at every handover' },
      { type: 'p', text: 'Product quality can be compromised at any transfer point. Sampling, documentation and sealed transport are simple safeguards that protect both supplier and customer.' },
      { type: 'h2', text: 'Scheduling and continuity' },
      { type: 'p', text: 'For commercial and industrial users, predictability often matters more than price. Coordinated scheduling and contingency planning keep operations running when conditions change.' },
    ],
  },
];

export const getInsight = (slug) => insights.find((a) => a.slug === slug);

export const readingTime = (article) => {
  const words = article.body.reduce((n, b) => n + b.text.split(/\s+/).length, 0) + article.excerpt.split(/\s+/).length;
  return Math.max(1, Math.round(words / 220));
};

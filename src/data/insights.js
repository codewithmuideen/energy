// SAMPLE ARTICLES
// Editorial content used to demonstrate the Insights section. Entries flagged `placeholder: true`
// show a visible "Sample article" label and are marked noindex. Replace with approved content.

export const categories = ['Solar Basics', 'Business Energy', 'Storage', 'Sustainability'];

export const insights = [
  {
    slug: 'how-to-size-a-home-solar-system',
    placeholder: true,
    featured: true,
    category: 'Solar Basics',
    date: '2026-10-28',
    readTime: '6 min read',
    title: 'How to Size a Home Solar System in Nigeria',
    excerpt: 'Panels, inverter, batteries: what each one does, and how a simple load audit tells you exactly how big your system should be.',
    image: 'installer-roof',
    imageAlt: 'Installer placing a solar panel on a house roof',
    body: [
      { type: 'p', text: 'The most common solar mistake is buying a package before understanding your load. A system that is too small disappoints; one that is too big wastes money. The fix is a simple audit of what you want to power and for how long.' },
      { type: 'h2', text: 'Start with your appliances' },
      { type: 'p', text: 'List every appliance you want running during an outage, its wattage and the hours you use it. Lights, fans, a fridge, TV and Wi-Fi make a modest load. Air conditioners, pumps and pressing irons are heavy loads that change the design significantly.' },
      { type: 'h2', text: 'Inverter, batteries and panels' },
      { type: 'ul', items: ['The inverter must handle the total wattage running at the same time, plus surges from motors.', 'The battery bank stores the energy you need overnight. Lithium batteries can be discharged deeper and last longer.', 'The panels must generate enough during sunny hours to run daytime loads and recharge the batteries.'] },
      { type: 'quote', text: 'Size for the life you want to live during an outage, not for a package price.' },
      { type: 'p', text: 'A professional survey also checks roof orientation, shading and wiring condition, all of which affect performance and safety.' },
    ],
  },
  {
    slug: 'solar-vs-diesel-for-business',
    placeholder: true,
    category: 'Business Energy',
    date: '2026-10-14',
    readTime: '5 min read',
    title: 'Solar vs Diesel: The Real Cost of Powering Your Business',
    excerpt: 'Generators look cheap upfront. Fuel, maintenance and downtime tell a different story over five years.',
    image: 'rooftop-commercial',
    imageAlt: 'Commercial rooftop solar array at sunset',
    body: [
      { type: 'p', text: 'For many Nigerian businesses, the diesel generator is the real utility. But its true cost is rarely calculated in full: fuel, servicing, spare parts, operator time and unplanned downtime all add up.' },
      { type: 'h2', text: 'Comparing like with like' },
      { type: 'p', text: 'A fair comparison looks at the cost per kilowatt-hour over the life of the asset. Solar has a higher upfront cost but near-zero fuel cost, while generator costs rise with every litre and every service.' },
      { type: 'quote', text: 'The cheapest kilowatt-hour is the one you never have to buy fuel for.' },
      { type: 'h2', text: 'Hybrid is often the answer' },
      { type: 'p', text: 'Most commercial sites benefit from a hybrid approach: solar carries daytime loads, batteries smooth peaks, and the generator becomes a backup that runs far fewer hours.' },
    ],
  },
  {
    slug: 'lithium-vs-lead-acid-batteries',
    placeholder: true,
    category: 'Storage',
    date: '2026-09-30',
    readTime: '4 min read',
    title: 'Lithium vs Lead-Acid: Choosing the Right Battery',
    excerpt: 'Why lithium iron phosphate batteries have become the default choice for solar storage, and when lead-acid still makes sense.',
    image: 'electrician-panel',
    imageAlt: 'Technician working on an electrical panel',
    body: [
      { type: 'p', text: 'Batteries are the heart of a backup system and often its largest cost. The choice between lithium and lead-acid affects how much usable energy you get, how long the bank lasts and how much maintenance it needs.' },
      { type: 'h2', text: 'Usable capacity and lifespan' },
      { type: 'p', text: 'Lithium iron phosphate (LiFePO₄) batteries can be discharged much deeper without damage and typically deliver thousands of cycles. Lead-acid batteries last longer when only lightly discharged, so you need more of them for the same usable energy.' },
      { type: 'h2', text: 'Total cost of ownership' },
      { type: 'p', text: 'Lithium costs more per battery but often less per usable kilowatt-hour over its life, with no topping up, faster charging and a smaller footprint.' },
    ],
  },
  {
    slug: 'clean-energy-and-cleaner-air',
    placeholder: true,
    category: 'Sustainability',
    date: '2026-09-12',
    readTime: '4 min read',
    title: 'Clean Energy, Cleaner Air: The Health Case for Solar',
    excerpt: 'Generator fumes and noise affect health and quality of life in our cities. Solar offers a quieter, cleaner alternative.',
    image: 'wind-solar',
    imageAlt: 'Wind turbine above solar panels under a clear blue sky',
    body: [
      { type: 'p', text: 'Millions of small generators run every evening across Nigerian cities. Beyond the cost, they fill streets and homes with exhaust fumes and constant noise.' },
      { type: 'h2', text: 'Quiet power' },
      { type: 'p', text: 'Solar and battery systems are silent and emission-free in operation. Replacing even part of generator use improves air quality around homes, schools and clinics.' },
      { type: 'quote', text: 'Every generator switched off is a quieter street and cleaner air.' },
      { type: 'p', text: 'Combined with efficient appliances, solar is one of the most practical climate actions available to households and businesses today.' },
    ],
  },
];

export const getInsight = (slug) => insights.find((i) => i.slug === slug);

export const formatDate = (iso) => new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });

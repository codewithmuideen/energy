// Services offered. `icon` maps to a lucide-react icon in components/ServiceIcon.jsx.
export const services = [
  {
    slug: 'residential-solar',
    icon: 'home',
    title: 'Residential Solar Systems',
    short: 'Hybrid solar and battery systems that keep your home powered day and night, with far less generator noise and fuel.',
    image: 'home-dusk',
    imageAlt: 'Modern family home lit up at dusk',
    intro:
      'Grid outages and rising fuel prices make reliable power at home expensive. We size a hybrid solar system around how your household actually uses electricity, so the lights, fridge, fans, Wi-Fi and pumps keep running when NEPA goes off.',
    benefits: [
      'Silent, fume-free backup power for the whole home or essential circuits',
      'Lower monthly spend on petrol, diesel and prepaid electricity',
      'Tier-1 panels, lithium batteries and hybrid inverters with manufacturer warranties',
      'Neat, safe installation with proper earthing and surge protection',
    ],
    includes: ['Load audit and roof survey', 'System design and quotation', 'Supply and installation', 'App-based monitoring setup', 'Handover training', 'After-sales support'],
    idealFor: ['Homes and duplexes', 'Estates and apartments', 'Home offices'],
  },
  {
    slug: 'commercial-industrial-solar',
    icon: 'building',
    title: 'Commercial & Industrial Solar',
    short: 'Rooftop and ground-mounted solar for offices, factories, hotels and warehouses: cut daytime energy costs and diesel dependence.',
    image: 'rooftop-commercial',
    imageAlt: 'Large commercial rooftop covered in solar panels at sunset',
    intro:
      'For businesses, power is a production cost. Our engineers design solar and solar-hybrid plants that offset generator run-hours and grid tariffs during working hours, with clear payback figures before you commit.',
    benefits: [
      'Measurable reduction in diesel consumption and generator maintenance',
      'Predictable energy costs for 20+ years',
      'Designs that integrate with existing generators and grid supply',
      'Structural and electrical engineering to recognised standards',
    ],
    includes: ['Energy audit and load profiling', 'Financial and payback analysis', 'Structural assessment', 'EPC delivery', 'Remote performance monitoring', 'Scheduled maintenance plans'],
    idealFor: ['Factories and warehouses', 'Hotels and hospitality', 'Schools and hospitals', 'Office buildings'],
  },
  {
    slug: 'battery-storage',
    icon: 'battery',
    title: 'Battery Energy Storage',
    short: 'Lithium battery banks and inverter upgrades that store solar power for the evening and give instant, clean backup.',
    image: 'electrician-panel',
    imageAlt: 'Technician working on an electrical distribution panel',
    intro:
      'Storage is what turns solar into round-the-clock power. We supply and install modern lithium (LiFePO₄) battery systems that last far longer than lead-acid, charge faster and need no topping up, sized to cover your critical hours.',
    benefits: [
      'Seamless switchover during outages, with no flicker for sensitive equipment',
      'Long cycle life and deep discharge capability',
      'Retrofit options for existing inverter and solar setups',
      'Battery management systems with remote alerts',
    ],
    includes: ['Backup-hours calculation', 'Battery and inverter selection', 'Safe rack or wall installation', 'Integration with solar and generator', 'Monitoring and alerts'],
    idealFor: ['Homes upgrading from lead-acid', 'Offices with critical IT loads', 'Clinics and pharmacies'],
  },
  {
    slug: 'solar-mini-grids',
    icon: 'grid',
    title: 'Solar Mini-Grids',
    short: 'Community and estate-scale solar mini-grids delivering metered, reliable electricity where the national grid falls short.',
    image: 'farm-aerial',
    imageAlt: 'Aerial view of a solar farm among green fields',
    intro:
      'Mini-grids bring dependable electricity to estates, campuses, markets and rural communities. We plan, build and help operate solar-hybrid mini-grids with smart metering, so every unit generated is accounted for.',
    benefits: [
      'Reliable supply for whole communities, estates or campuses',
      'Smart prepaid metering and remote management',
      'Scalable designs that grow with demand',
      'Lower cost per kWh than diesel-only supply',
    ],
    includes: ['Site and demand assessment', 'Generation and distribution design', 'Construction and commissioning', 'Smart metering', 'Operations support'],
    idealFor: ['Residential estates', 'Rural communities', 'Campuses and markets'],
  },
  {
    slug: 'energy-audit',
    icon: 'gauge',
    title: 'Energy Audit & Consulting',
    short: 'Independent assessments that show where your energy money goes and the right-sized solar solution to fix it.',
    image: 'engineer-meter',
    imageAlt: 'Engineer in a hard hat checking an electricity meter',
    intro:
      'The right system starts with the right numbers. Our energy audits measure your real consumption, identify waste and model solar, storage and efficiency options so you can invest with confidence.',
    benefits: [
      'Clear picture of consumption and peak demand',
      'Quick wins from efficiency before you buy generation',
      'Side-by-side options with cost and payback',
      'Vendor-neutral technical advice',
    ],
    includes: ['On-site metering and inspection', 'Bill and fuel-log analysis', 'Efficiency recommendations', 'Solar feasibility report'],
    idealFor: ['Businesses planning solar', 'Facility managers', 'Developers and investors'],
  },
  {
    slug: 'operations-maintenance',
    icon: 'wrench',
    title: 'Maintenance & Monitoring',
    short: 'Cleaning, inspection, repairs and remote monitoring that keep your solar system producing at its best for decades.',
    image: 'installer-wiring',
    imageAlt: 'Technician wiring the connectors of a solar panel',
    intro:
      'Dust, loose connections and ageing batteries quietly reduce output. Our maintenance plans combine scheduled site visits with remote monitoring, so problems are found early and fixed fast — including systems we did not install.',
    benefits: [
      'Higher energy yield from clean, inspected panels',
      'Early fault detection through remote monitoring',
      'Fast response from trained technicians',
      'Health reports for batteries and inverters',
    ],
    includes: ['Panel cleaning', 'Electrical inspection and thermal checks', 'Battery health testing', 'Firmware updates', 'Repairs and upgrades'],
    idealFor: ['Existing solar owners', 'Commercial plants', 'Mini-grid operators'],
  },
];

export const getService = (slug) => services.find((s) => s.slug === slug);

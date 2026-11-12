// Service areas describe Apex Core's intended scope of business. They are written so that
// no operational capability, licence or partnership is claimed before it has been confirmed.
export const services = [
  {
    slug: 'petroleum-and-oil-resources',
    index: '01',
    title: 'Petroleum & Oil Resources',
    short:
      'Engaging with opportunities across crude oil and refined petroleum products, guided by market insight and sound commercial judgement.',
    image: 'offshore-flare',
    imageAlt: 'Offshore oil production platforms at dusk with gas flares over calm sea',
    intro:
      'Petroleum remains central to how economies move, build and grow. Apex Core approaches this part of the value chain with discipline: understanding product specifications, market conditions and the obligations that come with handling a strategic commodity.',
    involves: [
      'Evaluating opportunities in crude oil and refined petroleum products',
      'Working with established industry participants on sourcing and offtake discussions',
      'Assessing product quality, logistics and regulatory requirements before commitment',
      'Structuring engagements around transparency and clear documentation',
    ],
    applications: ['Industrial fuel users', 'Commercial distributors', 'Project developers', 'Strategic industry partners'],
  },
  {
    slug: 'energy-resources-and-solutions',
    index: '02',
    title: 'Energy Resources & Solutions',
    short:
      'Exploring practical energy solutions for businesses, from conventional fuels to emerging opportunities in a changing energy mix.',
    image: 'processing-plant',
    imageAlt: 'Wide view of a modern oil processing plant with steel pipe racks under a bright sky',
    intro:
      'Energy needs differ from one organisation to the next. We take time to understand how a business uses energy, what constrains it and where reliability or efficiency can be improved, then explore solutions that fit.',
    involves: [
      'Understanding the energy requirements of commercial and industrial clients',
      'Identifying suitable conventional and alternative energy options',
      'Connecting clients with qualified suppliers and technical specialists',
      'Keeping long-term reliability and responsible use at the centre of each recommendation',
    ],
    applications: ['Manufacturing operations', 'Commercial facilities', 'Infrastructure projects', 'Energy-intensive businesses'],
  },
  {
    slug: 'oil-and-gas-commercial-services',
    index: '03',
    title: 'Oil & Gas Commercial Services',
    short:
      'Commercial support that helps transactions and projects in the oil and gas sector move forward with clarity and confidence.',
    image: 'engineers-plan',
    imageAlt: 'Three engineers in hard hats and high-visibility vests reviewing plans on site',
    intro:
      'Good commercial work is often invisible: clear terms, reliable counterparties and well-managed timelines. Apex Core aims to bring that steadiness to oil and gas engagements, supporting decisions with preparation rather than guesswork.',
    involves: [
      'Commercial research and opportunity assessment',
      'Counterparty engagement and relationship management',
      'Coordination between buyers, sellers and service providers',
      'Support with documentation, timelines and follow-through',
    ],
    applications: ['Upstream and downstream businesses', 'Investors exploring the sector', 'Service companies', 'International partners entering Nigeria'],
  },
  {
    slug: 'petroleum-supply-and-distribution',
    index: '04',
    title: 'Petroleum Supply & Distribution',
    short:
      'Focused on the dependable movement of petroleum products from source to end user, with safety and accountability at every handover.',
    image: 'tanker-sea',
    imageAlt: 'Product tanker vessel sailing at speed through open water',
    intro:
      'Supply is only as strong as its weakest link. Our focus is on reliable, well-coordinated distribution: the right product, in the right condition, delivered through partners who meet the standards the industry demands.',
    involves: [
      'Coordinating supply arrangements for petroleum products',
      'Working with licensed storage, haulage and marine logistics partners',
      'Prioritising product integrity, safety and documentation through the chain',
      'Planning for continuity so customers can depend on consistent supply',
    ],
    applications: ['Fuel retailers and distributors', 'Industrial and commercial consumers', 'Fleet operators', 'Power generation users'],
  },
  {
    slug: 'energy-trading',
    index: '05',
    title: 'Energy Trading',
    short:
      'A considered approach to energy trading, built on market awareness, careful counterparty selection and responsible risk management.',
    image: 'tanker-top',
    imageAlt: 'Aerial top-down view of a red-decked tanker cutting through blue water',
    intro:
      'Energy markets reward preparation and punish haste. Apex Core intends to participate in energy trading with a measured approach, paying close attention to pricing dynamics, contract terms and the reliability of every counterparty.',
    involves: [
      'Monitoring market conditions and pricing trends',
      'Identifying credible buyers, sellers and trading partners',
      'Structuring trades with clear terms and appropriate safeguards',
      'Maintaining compliance with applicable trading and regulatory requirements',
    ],
    applications: ['Product buyers and sellers', 'Commercial offtakers', 'Trading partners', 'Institutional counterparties'],
  },
  {
    slug: 'industry-procurement-and-support',
    index: '06',
    title: 'Industry Procurement & Support',
    short:
      'Helping energy businesses source what they need, from equipment to specialist services, through reliable and well-vetted channels.',
    image: 'engineer-corridor',
    imageAlt: 'Industrial technician in blue overalls walking through a corridor of control cabinets',
    intro:
      'Operations in the energy sector depend on the right equipment and expertise being available when needed. We aim to simplify procurement for our partners by connecting requirements with dependable suppliers and following each request through.',
    involves: [
      'Understanding technical and operational procurement needs',
      'Identifying and vetting suitable suppliers and service providers',
      'Coordinating quotations, timelines and delivery expectations',
      'Supporting quality and compliance checks before handover',
    ],
    applications: ['Operators and contractors', 'Maintenance and engineering teams', 'Project developers', 'Facility managers'],
  },
  {
    slug: 'business-development-and-partnerships',
    index: '07',
    title: 'Business Development & Partnerships',
    short:
      'Building relationships that create shared value: with investors, operators, suppliers and organisations who share our standards.',
    image: 'engineers-horizon',
    imageAlt: 'Engineers in safety helmets standing together on an open project site facing the horizon',
    intro:
      'The energy industry is built on partnerships. Apex Core is actively seeking relationships with organisations that value integrity and long-term thinking, whether they are local businesses, international companies or investors exploring the sector.',
    involves: [
      'Identifying partnership and joint-venture opportunities',
      'Facilitating introductions between complementary organisations',
      'Supporting market entry conversations for partners new to Nigeria',
      'Developing relationships founded on transparency and mutual benefit',
    ],
    applications: ['International energy companies', 'Local and regional businesses', 'Investors and financiers', 'Technology and service partners'],
  },
];

export const getService = (slug) => services.find((s) => s.slug === slug);

import Seo from '../components/Seo';
import Hero from '../sections/Hero';
import CompanyIntro from '../sections/CompanyIntro';
import ServicesSection from '../sections/ServicesSection';
import WhyApexCore from '../sections/WhyApexCore';
import BusinessApproach from '../sections/BusinessApproach';
import SustainabilitySection from '../sections/SustainabilitySection';
import GlobalPresence from '../sections/GlobalPresence';
import PartnershipCTA from '../sections/PartnershipCTA';
import LatestInsights from '../sections/LatestInsights';
import { organizationSchema, websiteSchema } from '../utils/seo';

const marquee = ['Integrity', 'Oil & Petroleum', 'Reliability', 'Energy Solutions', 'Safety', 'Partnerships', 'Responsibility', 'Lagos · Nigeria'];

function Marquee() {
  const items = [...marquee, ...marquee];
  return (
    <div className="overflow-hidden border-y border-white/10 bg-ink py-6" aria-hidden="true">
      <div className="animate-marquee flex w-max gap-12 whitespace-nowrap">
        {items.map((m, i) => (
          <span key={i} className="flex items-center gap-12 text-[clamp(1.2rem,2vw,1.7rem)] font-semibold tracking-tight text-white/80">
            {i % 2 ? <em className="serif text-gold">{m}</em> : m}
            <span className="h-1.5 w-1.5 rotate-45 bg-teal" />
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <Seo
        description="Discover Apex Core Oil and Energy Resources Ltd, a Nigerian energy resources company focused on professional business relationships, energy industry opportunities and responsible growth."
        path="/"
        schema={[organizationSchema(), websiteSchema()]}
      />
      <Hero />
      <Marquee />
      <CompanyIntro />
      <ServicesSection />
      <WhyApexCore />
      <BusinessApproach />
      <SustainabilitySection />
      <GlobalPresence />
      <PartnershipCTA />
      <LatestInsights />
    </>
  );
}

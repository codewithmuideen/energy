import BackgroundVideo from '../components/BackgroundVideo';
import MagneticButton from '../components/MagneticButton';
import { Reveal, RevealLines } from '../components/Reveal';

export default function PartnershipCTA({
  title = ["Let's Build What's Next", <em key="e">in Energy.</em>],
  text = 'Whether you are exploring a business opportunity, seeking an industry partner or making a professional enquiry, our team welcomes meaningful conversations.',
}) {
  return (
    <section className="grain relative isolate flex min-h-[86svh] items-center overflow-hidden bg-ink py-28" aria-label="Start a conversation">
      <div className="absolute inset-0 -z-20">
        <BackgroundVideo src="/videos/tanker.mp4" poster="/images/tanker-poster.webp" />
      </div>
      <div className="absolute inset-0 -z-10 bg-ink/65" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,transparent_10%,rgba(7,23,37,.9)_75%)]" />

      <div className="container-x text-center">
        <Reveal>
          <span className="eyebrow justify-center">Partner With Us</span>
        </Reveal>
        <RevealLines lines={title} className="h-display mx-auto mt-8 max-w-5xl text-white [&_em]:serif [&_em]:text-gold" />
        <Reveal delay={0.2}>
          <p className="lead mx-auto mt-8 max-w-2xl text-white/75">{text}</p>
        </Reveal>
        <Reveal delay={0.3} className="mt-12 flex justify-center">
          <MagneticButton to="/contact" strength={0.4}>
            Start a Conversation
          </MagneticButton>
        </Reveal>
      </div>
    </section>
  );
}

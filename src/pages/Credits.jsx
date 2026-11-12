import LegalLayout from '../components/LegalLayout';

const sections = [
  {
    title: 'Video',
    body: (
      <>
        <p>Background video footage is sourced from Mixkit and used under the Mixkit Stock Video Free License, which permits commercial use without attribution.</p>
        <ul>
          <li>Petrochemical plant at night (hero)</li>
          <li>Tanker vessel at sea</li>
          <li>Petroleum processing refinery (aerial)</li>
          <li>Drone flight above a jungle river</li>
        </ul>
        <p>
          Several still images on this site are frames taken from Mixkit footage under the same licence. See <a href="https://mixkit.co/license/" target="_blank" rel="noopener noreferrer">mixkit.co/license</a>.
        </p>
      </>
    ),
  },
  {
    title: 'Photography',
    body: (
      <>
        <p>Offshore platform photography is sourced from Wikimedia Commons:</p>
        <ul>
          <li>
            &ldquo;Holstein at Dusk&rdquo;: released under CC0 1.0 (public domain dedication).{' '}
            <a href="https://commons.wikimedia.org/wiki/File:Holstein_at_Dusk.jpg" target="_blank" rel="noopener noreferrer">Source</a>
          </li>
          <li>
            &ldquo;Oil Platform Crew Transfer&rdquo;: released under CC0 1.0.{' '}
            <a href="https://commons.wikimedia.org/wiki/File:Oil_Platform_Crew_Transfer.jpg" target="_blank" rel="noopener noreferrer">Source</a>
          </li>
          <li>
            &ldquo;An oil rig offshore Vungtau&rdquo;: public domain.{' '}
            <a href="https://commons.wikimedia.org/wiki/File:An_oil_rig_offshore_Vungtau.jpg" target="_blank" rel="noopener noreferrer">Source</a>
          </li>
        </ul>
        <p>Imagery is illustrative and does not depict Apex Core facilities, assets or personnel.</p>
      </>
    ),
  },
  {
    title: 'Typography',
    body: <p>Manrope, Instrument Serif and Montserrat are used under the SIL Open Font License, self-hosted via Fontsource.</p>,
  },
];

export default function Credits() {
  return (
    <LegalLayout
      title="Media Credits"
      path="/credits"
      description="Licensing and credits for photography, video and typefaces used on the Apex Core website."
      intro="Licensing information for the imagery, footage and typefaces used on this website."
      sections={sections}
    />
  );
}

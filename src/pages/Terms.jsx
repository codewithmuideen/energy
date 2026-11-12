import { Link } from 'react-router-dom';
import LegalLayout from '../components/LegalLayout';
import { SITE } from '../data/site';

// Template terms for review by the company's legal adviser before publication.
const sections = [
  {
    title: 'About these terms',
    body: <p>These terms govern your use of apexcoreenergy.com, operated by {SITE.name}. By using the website you accept these terms.</p>,
  },
  {
    title: 'Information on this website',
    body: (
      <>
        <p>
          Content on this website is provided for general information about ApexCore Energy and its solar and renewable energy services. It does not constitute an offer, professional advice
          or a binding commitment to provide any product or service.
        </p>
        <p>
          System sizes, savings and timelines shown on this website are typical or indicative. Every installation is designed after a site survey, and any engagement is subject to a written quotation and agreement.
        </p>
      </>
    ),
  },
  {
    title: 'Insights and sample content',
    body: <p>Articles marked &ldquo;Sample article&rdquo; are placeholder content used to demonstrate the website and are not official statements of the company.</p>,
  },
  {
    title: 'Intellectual property',
    body: (
      <p>
        The ApexCore Energy name, logo and original website content belong to {SITE.name}. Photography and video are used under their respective licences; see{' '}
        <Link to="/credits">Media Credits</Link>. You may not reproduce our branding or content without permission.
      </p>
    ),
  },
  {
    title: 'Acceptable use',
    body: <p>You agree not to misuse the website, attempt to gain unauthorised access, submit unlawful material or interfere with its normal operation.</p>,
  },
  {
    title: 'Third-party links',
    body: <p>The website may link to third-party sites, such as maps or social sharing services. We are not responsible for their content or privacy practices.</p>,
  },
  {
    title: 'Limitation of liability',
    body: (
      <p>
        We take reasonable care to keep this website accurate and available, but we make no guarantees. To the extent permitted by law, we are not liable for any loss
        arising from use of, or reliance on, the website.
      </p>
    ),
  },
  {
    title: 'Governing law',
    body: <p>These terms are governed by the laws of the Federal Republic of Nigeria, and the courts of Lagos State shall have jurisdiction.</p>,
  },
  {
    title: 'Contact',
    body: (
      <p>
        Questions about these terms can be sent to <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
      </p>
    ),
  },
];

export default function Terms() {
  return (
    <LegalLayout
      title="Terms & Conditions"
      path="/terms"
      description="Terms and conditions for using the ApexCore Energy website."
      intro="The terms that apply when you use this website."
      sections={sections}
    />
  );
}

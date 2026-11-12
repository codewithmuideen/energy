import LegalLayout from '../components/LegalLayout';
import { SITE } from '../data/site';

// Template policy for review by the company's legal adviser before publication.
const sections = [
  {
    title: 'Who we are',
    body: (
      <p>
        This website is operated by {SITE.name} (&ldquo;Apex Core&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;), whose office is at {SITE.addressLine} This policy explains how
        we handle personal data collected through apexcoreenergy.com.
      </p>
    ),
  },
  {
    title: 'Information we collect',
    body: (
      <>
        <p>We collect only the information needed to respond to you and operate the website:</p>
        <ul>
          <li>Details you submit through our contact form: your name, email address, telephone number (optional), subject and message.</li>
          <li>Basic technical information processed by our hosting provider, such as IP address and browser type, for security and reliability.</li>
        </ul>
      </>
    ),
  },
  {
    title: 'How we use your information',
    body: (
      <ul>
        <li>To respond to your enquiry and continue any resulting business conversation.</li>
        <li>To keep the website secure and functioning properly.</li>
        <li>To meet legal or regulatory obligations where they apply.</li>
      </ul>
    ),
  },
  {
    title: 'Legal basis',
    body: (
      <p>
        We process personal data in line with the Nigeria Data Protection Act 2023 and related regulations. Our legal bases are your consent (given when you submit the
        contact form) and our legitimate interest in responding to business enquiries.
      </p>
    ),
  },
  {
    title: 'Sharing and retention',
    body: (
      <p>
        We do not sell your personal data. We may share it with service providers who help us operate this website or deliver email, under appropriate confidentiality
        obligations. We keep enquiry data only for as long as necessary to handle your enquiry and meet our legal obligations.
      </p>
    ),
  },
  {
    title: 'Cookies and storage',
    body: (
      <p>
        This website does not use advertising or tracking cookies. It may store a small, non-identifying value in your browser for the current session (for example,
        to avoid replaying the opening animation).
      </p>
    ),
  },
  {
    title: 'Your rights',
    body: (
      <p>
        You may request access to, correction of or deletion of your personal data, or withdraw your consent, by contacting us at{' '}
        <a href={`mailto:${SITE.email}`}>{SITE.email}</a>. You may also lodge a complaint with the Nigeria Data Protection Commission.
      </p>
    ),
  },
  {
    title: 'Contact',
    body: (
      <p>
        Questions about this policy can be sent to <a href={`mailto:${SITE.email}`}>{SITE.email}</a> or by telephone on{' '}
        <a href={`tel:${SITE.phoneHref}`}>{SITE.phoneDisplay}</a>.
      </p>
    ),
  },
];

export default function PrivacyPolicy() {
  return (
    <LegalLayout
      title="Privacy Policy"
      path="/privacy-policy"
      description="How Apex Core Oil and Energy Resources Ltd collects, uses and protects personal information submitted through its website."
      intro="How we collect, use and protect the information you share with us."
      sections={sections}
    />
  );
}

export const infoPages: Record<
  string,
  {
    title: string;
    eyebrow: string;
    summary: string;
    body: string;
    draft?: boolean;
  }
> = {
  about: {
    title: "Engineering judgment, made practical.",
    eyebrow: "About the project",
    summary:
      "An independent educational publishing project for people building software with AI.",
    body: "## Why this library exists\nAI tools can make the first version of a feature easier to build. They do not remove the decisions around ownership, accessibility, data integrity, privacy, failure and operations. This library is designed to make those decisions visible.\n\n## Written learning, deliberate practice\nThe planned collection connects handbooks, diagrams, editable templates, agent skills and isolated labs. Each resource should explain a decision, show a counterexample and identify the evidence needed to verify the result.\n\n## Editorial standards\nPlanned outlines are public. Completed files, compatibility claims and commercial terms require review before publication. We do not invent testimonials, sales figures or certifications. Corrections can be submitted through Contact.",
  },
  licensing: {
    title: "Licensing and update rights",
    eyebrow: "Before purchase",
    summary:
      "Commercial license terms are being reviewed. No license grant is implied by a planned product page.",
    draft: true,
    body: "## Personal use\nThe intended default is an individual educational license. Exact permitted uses and restrictions must be reviewed and attached to each available product before sale.\n\n## Teams and trainers\nInternal training, editable presentation rights, seat counts and redistribution need separate terms. They are not currently available as a purchasable option.\n\n## Versions and updates\nEach release will identify its version, included files, compatibility and update eligibility. There is no promise of lifetime updates.\n\n## Third-party material\nAny included code, fonts or other assets must retain their applicable notices. Platform names describe intended interoperability, not endorsement.",
  },
  privacy: {
    title: "Privacy information",
    eyebrow: "Draft notice",
    summary:
      "This notice describes the implemented data flows. Operator identity, lawful bases, retention periods and processor agreements require review before launch.",
    draft: true,
    body: "## Data collected\nSign-in requests use your email and a short-lived token. Account sessions use a random cookie whose hash is stored on the server. Release notifications store email, selected resources and consent history. Contact requests store your email, topic and message. Orders and downloads create access and audit records.\n\n## Purposes and access\nThese records support authentication, requested notifications, fulfillment, support and abuse prevention. Administrative access is role-restricted. Payment card data is not collected by this application.\n\n## Providers\nLocal development uses PostgreSQL, private filesystem storage and a local email catcher. Production payment processing is intended to use Lemon Squeezy; hosting, storage and email processors must be named and reviewed before activation.\n\n## Preferences and rights\nNewsletter confirmation and unsubscribe links manage marketing preferences. Signed-in users can request an export or deletion from Account → Privacy. You can also contact the operator through the support form. Retention exceptions and identity verification must be assessed by the operator.\n\n## Retention and contact\nProduction retention periods, business identity, contact details and applicable legal bases remain unresolved launch gates. This draft is not a claim of legal conformity.",
  },
  terms: {
    title: "Terms of use",
    eyebrow: "Draft terms",
    summary:
      "Operator-specific terms require review before commercial activation.",
    draft: true,
    body: "## Current service\nThe website presents a planned educational catalog and allows account access, support requests and release notifications. Planned outlines and concept covers do not represent delivered products.\n\n## Acceptable use\nUse the site only for lawful access to your own account and authorized resources. Do not share authentication links or attempt to access another customer’s files.\n\n## Educational scope\nMaterials are intended to teach engineering practice. They do not certify security, legal compliance or business outcomes.\n\n## Outstanding review\nOperator identity, governing terms, dispute handling and applicable consumer protections must be finalized before sale.",
  },
  "terms-of-sale": {
    title: "Sales terms",
    eyebrow: "Draft sales information",
    summary:
      "Live sales are disabled until the operator, product and payment gates pass.",
    draft: true,
    body: "## What must be disclosed\nAn available product must identify its real files, version, license, compatibility, price and update rights. Provider checkout will display the applicable total and tax.\n\n## Delivery\nA return from checkout is not proof of payment. Access is granted after a verified provider event, and downloads require an authenticated entitled customer.\n\n## Consumer rights\nApplicable cancellation, withdrawal and conformity rights require jurisdiction-specific review. No automatic waiver is applied by this application.\n\n## Before launch\nThe operator must finalize identity, customer markets, support arrangements, refunds and reviewed terms.",
  },
  "refund-policy": {
    title: "Refund and cancellation information",
    eyebrow: "Draft policy",
    summary:
      "A final policy depends on the operator, customer markets and payment agreement.",
    draft: true,
    body: "## Request help\nUse the contact form with your order reference and a description of the issue. Do not include payment card details.\n\n## Access after refund\nA verified refunded order revokes future download access while preserving its order record. Previously downloaded files cannot be remotely erased.\n\n## Statutory rights\nThis draft does not exclude mandatory rights or claim that digital delivery automatically removes cancellation rights. Eligibility, timing and required disclosures must be reviewed before sale.",
  },
  imprint: {
    title: "Operator details",
    eyebrow: "Launch gate",
    summary:
      "Legal business identity has not been supplied. Commercial activation is blocked.",
    draft: true,
    body: "## Required operator information\nLegal name and business form, establishment country, required trading address, contact email and applicable registration or tax identifiers must be provided by the operator.\n\n## Current contact route\nThe contact form stores requests for operator review. A production support owner and response process still need to be established.\n\n## Publication gate\nNo fictitious person, company, address or identifier is used here. This page must be reviewed and completed before launch.",
  },
  accessibility: {
    title: "Accessibility status",
    eyebrow: "Inclusive engineering",
    summary:
      "WCAG 2.2 AA is an engineering target. This page is not a certification.",
    body: "## Interface approach\nThe application uses semantic landmarks, labeled inputs, visible keyboard focus, responsive layouts, a skip link and reduced-motion support. Both light and dark themes are provided.\n\n## Verification limits\nAutomated browser checks and recorded manual keyboard checks cover tested routes and states. A complete assistive-technology review and any applicable legal assessment remain operator launch responsibilities.\n\n## Report a barrier\nUse the contact form and choose Accessibility. Include the page, task, device and assistive technology, avoiding sensitive account details.",
  },
  affiliates: {
    title: "Affiliate program",
    eyebrow: "Not active",
    summary:
      "The affiliate program has not launched. There are no active referral links or payout promises.",
    body: "## Before activation\nProvider support, eligibility, disclosure rules, attribution, consent and payout terms must be reviewed before applications open.\n\n## Stay informed\nYou can request general project updates through the newsletter. Signing up does not enroll you in an affiliate program.",
  },
};

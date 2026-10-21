export const editorialSeed = [
  {
    slug: "a-demo-is-not-a-release",
    kind: "article",
    title: "A working demo still has unanswered questions",
    summary:
      "Follow one ordinary action beyond its happy path to find the work a demo cannot show.",
    published: true,
    body: `## Start with a single action\nConsider an account deletion button. A successful response says little about active sessions, pending purchases, retained financial records, or copies held by another service. Each has a different owner and lifecycle.\n\n## Follow the state\nWrite down what exists before the action, what must change atomically, and what can finish later. A session should stop authorizing requests as soon as access is revoked. An external processor may need a retried job. Record the difference.\n\n## Ask for observable evidence\nUse two synthetic accounts. Request deletion as one account, attempt access using its previous session, and confirm that the other account remains unaffected. Read the authoritative database rather than relying on a success toast.\n\n## Keep unknowns visible\nSome retention decisions require an operator and legal review. Mark them as unresolved decisions with an owner. A missing answer is useful information; a guessed answer becomes hidden policy.`,
  },
  {
    slug: "designing-retry-safe-webhooks",
    kind: "article",
    title: "Treat a webhook as a message that can arrive twice",
    summary:
      "Payment notifications need durable evidence, atomic effects and an explicit recovery path.",
    published: true,
    body: `## Verify before interpreting\nAuthenticate the raw request bytes before parsing the business payload. Keep the signing secret on the server, compare signatures in constant time, and reject malformed signatures.\n\n## Make the effect unique\nAn event fingerprint can prevent exact replay. A unique provider order identifier protects the business effect when equivalent events have different payloads. Store the order and its entitlements in one transaction.\n\n## Handle a different order of arrival\nA refunded order must not regain access because an older paid event arrives late. Compare provider state and timestamps, and reconcile ambiguous events with the provider before changing access.\n\n## Test the interruption\nSend the same signed fixture concurrently. Then send a refund before the original creation event. Verify the final order and entitlement rows, not just HTTP status.\n\n## Reference\nLemon Squeezy webhook signing: https://docs.lemonsqueezy.com/help/webhooks/signing-requests`,
  },
  {
    slug: "evidence-before-confidence",
    kind: "guide",
    title: "Build an evidence register for your application",
    summary:
      "Separate applicability from verification so an attractive checklist does not become a false assurance.",
    published: true,
    body: `## Define the requirement\nUse an actor, an action, a resource and an expected outcome. “Customers can only download files covered by their orders” is more testable than “secure downloads.”\n\n## Record applicability separately\nA marketplace payout requirement may not apply to a single-operator store. Record the reason. Do not count a requirement as verified merely because it was marked not applicable.\n\n## Link the proof\nFor each applicable requirement, capture the environment, command or interaction, fixture identity, result and date. Include a denial case.\n\n## Reopen on change\nA new account role, storage provider or checkout path can invalidate previous evidence. Keep the affected requirement linked to those changes.`,
  },
  {
    slug: "access-your-library",
    kind: "help",
    title: "Access your purchased library",
    summary:
      "Use the same email address used at checkout and confirm your sign-in link.",
    published: true,
    body: `## Sign in\nRequest a sign-in link using your checkout email. Links expire after 15 minutes and work once. If the link expired, request another.\n\n## Find your order\nOpen Account → Orders. An order appears only after the payment notification is verified by the server. A return from checkout does not confirm payment.\n\n## Still missing?\nUse the contact form with your provider order reference. Never include card details or a sign-in link.`,
  },
  {
    slug: "download-troubleshooting",
    kind: "help",
    title: "Resolve an expired or unavailable download",
    summary:
      "Download links expire quickly; your library can issue a fresh link when access is valid.",
    published: true,
    body: `## Get a new link\nSign in and request the file again from your library. Download links expire after 60 seconds.\n\n## Check access\nRefunded orders, unpublished files or unavailable versions may prevent a download. Your order record remains visible.\n\n## Report a file problem\nContact support with the product SKU, version and error. Do not send private download links.`,
  },
] satisfies {
  slug: string;
  kind: string;
  title: string;
  summary: string;
  published: boolean;
  body: string;
}[];

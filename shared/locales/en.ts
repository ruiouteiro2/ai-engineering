/** Stable UI keys. Editorial/product copy lives in the CMS/catalog, separately from UI labels. */
export const en = {
  "nav.library": "Explore library",
  "nav.skills": "Agent skills",
  "nav.method": "Our method",
  "nav.journal": "Journal",
  "nav.account": "My account",
  "nav.menu": "Menu",
  "nav.main": "Main navigation",
  "nav.mobile": "Mobile navigation",
  "theme.light": "Switch to light theme",
  "theme.dark": "Switch to dark theme",
  "form.email": "Email address",
  "form.saving": "Saving…",
  "form.subscribe": "Subscribe to the journal",
  "form.notify": "Notify me when it’s ready",
  "form.saved": "Request saved. Check your email to confirm your preferences.",
  "form.failed": "Could not save your request. Please try again.",
  "action.retry": "Retry",
  "action.search": "Search",
  "action.save": "Save",
} as const;
export type MessageKey = keyof typeof en;

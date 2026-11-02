// Section visibility flags.
// Flip a flag to `true`, then rebuild and redeploy to publish that section.
// All the underlying work stays in the repo regardless of the flag value.

// Case Studies: when false, the index and generated detail pages show
// "Coming Soon" with noindex metadata; detail routes are still generated.
// Individual entries are loaded from content/case-studies only when published.
export const CASE_STUDIES_LIVE = true;

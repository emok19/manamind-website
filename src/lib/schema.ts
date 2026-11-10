// Shared structured data (SEO fix 10: complete SoftwareApplication schema).
export const SOFTWARE_APPLICATION = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "ManaMind",
  url: "https://manamind.ai/product",
  image: "https://manamind.ai/product-screenshot.webp",
  applicationCategory: "DeveloperApplication",
  applicationSubCategory: "Automated game testing",
  operatingSystem: "Web",
  description:
    "Automated game testing software. ManaMind's AI agents play video games through the screen like real players and report verified bugs, with no source code, SDK or scripting.",
  // No public price: offer is "contact us / book a demo". Wording confirmed by Riccardo on 9 Nov 2026.
  offers: {
    "@type": "Offer",
    url: "https://manamind.ai/contact",
    availability: "https://schema.org/InStock",
    description: "Pricing on request. Book a demo to scope a pilot.",
  },
  publisher: {
    "@type": "Organization",
    name: "ManaMind",
    url: "https://manamind.ai",
  },
};

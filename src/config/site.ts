export const SITE_CONFIG = {
  // Brand & Master Meta
  brandName: "EV Charger One",
  domain: "evchargerone.com",
  baseUrl: "https://evchargerone.com",
  defaultTitle: "Level 2 EV Charger Installation in Bend, OR | (888) 217-4060",
  defaultDescription: "Licensed Level 2 EV charger installs in Bend & Central Oregon. Same-day Tesla Wall Connector & NEMA 14-50 setups, rebate filed for you. (888) 217-4060.",

  // GOOGLE ANALYTICS & GOOGLE SEARCH CONSOLE VERIFICATION
  googleAnalyticsId: "G-QZT2JJ7QXP",
  googleSiteVerification: "GSC_VERIFICATION_TOKEN",

  // SINGLE SOURCE OF TRUTH (SSOT) PAY-PER-CALL ROUTING
  phone: "(888) 217-4060",
  phoneClean: "18882174060",
  operatingHours: "Mon-Sun 7:00 AM - 8:00 PM PST",

  // Lead Dispatch Webhook & Form Endpoint (same inbox, different label per form)
  web3FormsAccessKey: "{{WEB3FORMS_ACCESS_KEY}}",
  leadEmailSubject: "🔥 NEW HIGH-INTENT LEAD - EV Charger One",
  reviewEmailSubject: "⭐ NEW REVIEW SUBMISSION - EV Charger One",

  // Real review data only -- reviewCount stays 0 until genuine reviews come in
  // via /reviews/ and are manually verified. Schema only emits AggregateRating
  // when reviewCount > 0, so nothing fabricated ever ships.
  reviewCount: 0,
  reviewRating: null as string | null,

  // Legal & Contractor Credentials
  ccbLicense: "Oregon CCB #248910 Partner Network",
  ccbLicenseNumber: "CCB #248910",
  utilityPartner: "Pacific Power Oregon",
  rebateAmount: "utility rebate",

  // Regional HQ Location
  location: {
    city: "Bend",
    state: "OR",
    zip: "97701",
    county: "Deschutes County",
    latitude: 44.0582,
    longitude: -121.3153
  },

  // Service Cities Array
  cities: [
    { name: "Bend", zip: "97701" },
    { name: "Redmond", zip: "97756" },
    { name: "Sisters", zip: "97759" },
    { name: "Sunriver", zip: "97707" },
    { name: "La Pine", zip: "97739" }
  ]
};

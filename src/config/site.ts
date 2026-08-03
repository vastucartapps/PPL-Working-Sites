export const SITE_CONFIG = {
  // Brand & Niche Identifiers
  brandName: "{{BRAND_NAME}}",          // e.g., "Bend Roofing Masters"
  domain: "{{DOMAIN_NAME}}",            // e.g., "bendroofingmasters.com"
  baseUrl: "https://{{DOMAIN_NAME}}",
  defaultTitle: "{{DEFAULT_TITLE}}",    // e.g., "Roof Replacement Bend OR | Licensed Roofing Contractors"
  defaultDescription: "{{DEFAULT_DESCRIPTION}}",

  // GOOGLE ANALYTICS & GOOGLE SEARCH CONSOLE VERIFICATION
  googleAnalyticsId: "{{GA4_ID}}",
  googleSiteVerification: "{{GSC_VERIFICATION_TOKEN}}",

  // SINGLE SOURCE OF TRUTH (SSOT) PAY-PER-CALL ROUTING
  phone: "{{PHONE_FORMATTED}}",          // e.g., "(888) 504-4842"
  phoneClean: "{{PHONE_CLEAN}}",        // e.g., "8885044842"
  operatingHours: "Mon-Sun 24/7 Emergency Service",

  // Lead Dispatch Webhook & Form Endpoint
  web3FormsAccessKey: "{{WEB3FORMS_ACCESS_KEY}}",
  leadEmailSubject: "🔥 NEW HIGH-INTENT LEAD - {{BRAND_NAME}}",

  // Legal & Contractor Credentials
  ccbLicense: "{{STATE_LICENSE_PARTNER_NETWORK}}", // e.g., "Oregon CCB Partner Network"
  ccbLicenseNumber: "{{STATE_LICENSE_NUMBER}}",
  utilityPartner: "{{LOCAL_UTILITY_PARTNER}}",
  rebateAmount: "{{REBATE_AMOUNT}}",

  // Regional HQ Location
  location: {
    city: "{{HQ_CITY}}",
    state: "{{HQ_STATE}}",
    zip: "{{HQ_ZIP}}",
    county: "{{HQ_COUNTY}}",
    latitude: 0.0,
    longitude: 0.0
  },

  // Service Cities Array
  cities: [
    { name: "{{HQ_CITY}}", zip: "{{HQ_ZIP}}" }
  ]
};

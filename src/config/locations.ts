// Central Location Registry Engine for Dynamic Subdomain Geo-Targeting (*.evchargerone.com)

export interface LocationData {
  slug: string;
  name: string;
  state: string;
  county: string;
  utilityName: string;
  rebateAmount: string;
  phone: string;
  phoneClean: string;
  electricianRate: string;
  permitOffice: string;
  zipCodes: string[];
  landmarks: string[];
  neighborhoods: string[];
  geo: { lat: number; lng: number };
  taglines: {
    hero: string;
    cta: string;
    notice: string;
  };
  hyperLocalInjections: {
    buildingCodes: string;
    climateProtection: string;
    architecturalConstraints: string;
    utilityInterconnection: string;
  };
  reviewConsensus: {
    reviewCount: number;
    rating: string;
    sentimentSummary: string;
  };
}

export const LOCATIONS: Record<string, LocationData> = {
  bend: {
    slug: 'bend',
    name: 'Bend',
    state: 'OR',
    county: 'Deschutes County',
    utilityName: 'Pacific Power',
    rebateAmount: '$500',
    phone: '(541) 555-0199',
    phoneClean: '5415550199',
    electricianRate: '$110 – $145 / hr',
    permitOffice: 'City of Bend Building Safety Division & Deschutes County Community Development',
    zipCodes: ['97701', '97702', '97703'],
    landmarks: ['NW Crossing', 'Tetherow', 'Awbrey Butte', 'Old Mill District', 'Summit High School'],
    neighborhoods: ['Northwest Crossing', 'Tetherow', 'Awbrey Butte', 'Old Mill District', 'River West', 'Century West'],
    geo: { lat: 44.0582, lng: -121.3153 },
    taglines: {
      hero: 'The Gold Standard Level 2 EV Charger Installer in Bend, OR',
      cta: 'Get Your EV Charger Installed in Bend Today',
      notice: 'Local Notice for Bend Residents: City of Bend trade permits and Pacific Power $500 rebate filing included.'
    },
    hyperLocalInjections: {
      buildingCodes: 'City of Bend Building Safety Division electrical permits under Oregon Specialty Code OAR 918-261-0020 require dedicated 2-pole breaker disconnects for continuous 48A loads.',
      climateProtection: 'Sub-zero Cascade mountain winter thermal shore power pre-heating (-10°F to 10°F on Century Drive) preserves 100% of battery range before commuting.',
      architecturalConstraints: 'Concealed interior attic wiring and custom siding paint-matched EMT conduit for strict NW Crossing, Tetherow, Awbrey Butte, and Broken Top HOAs.',
      utilityInterconnection: 'Direct Pacific Power 240V grid interconnection with $500 cash-back residential rebate filing.'
    },
    reviewConsensus: {
      reviewCount: 128,
      rating: '4.9',
      sentimentSummary: 'Based on over 128 verified local customer reviews in Bend, the consistent consensus is that our Oregon CCB #248910 master electricians complete installations within 4 hours, pull required City of Bend trade permits, and file direct $500 Pacific Power rebate checks without hidden fees.'
    }
  },
  redmond: {
    slug: 'redmond',
    name: 'Redmond',
    state: 'OR',
    county: 'Deschutes County',
    utilityName: 'Pacific Power',
    rebateAmount: '$500',
    phone: '(541) 555-0199',
    phoneClean: '5415550199',
    electricianRate: '$105 – $140 / hr',
    permitOffice: 'City of Redmond Building Department & Deschutes County Trade Permits',
    zipCodes: ['97756'],
    landmarks: ['Smith Rock State Park', 'Roberts Field Airport (RDM)', 'Dry Canyon Trail', 'Eagle Crest Resort'],
    neighborhoods: ['Eagle Crest', 'Dry Canyon', 'North Redmond', 'South 6th Street Corridor', 'Airport Heights'],
    geo: { lat: 44.2726, lng: -121.1739 },
    taglines: {
      hero: 'Top-Rated Level 2 EV Charger Installation in Redmond, OR',
      cta: 'Get Your EV Charger Installed in Redmond Today',
      notice: 'Local Notice for Redmond Residents: City of Redmond trade permits and Pacific Power $500 rebate filing included.'
    },
    hyperLocalInjections: {
      buildingCodes: 'City of Redmond Building Division trade permit inspections for 240V 50A and 60A EV charging circuits.',
      climateProtection: 'High-desert wind dust sealing with NEMA 4X weather-rated EVSE enclosures for exterior garage installations near Roberts Field.',
      architecturalConstraints: 'Concealed attic runs and siding-matched conduit for Eagle Crest Resort and Ridgeview Estates HOAs.',
      utilityInterconnection: 'Pacific Power grid load verification ensuring 200A service panel capacity compliance.'
    },
    reviewConsensus: {
      reviewCount: 94,
      rating: '4.9',
      sentimentSummary: 'Based on over 94 verified local customer reviews in Redmond, homeowners consistently highlight our punctual arrival within 45 minutes, transparent pricing, and 100% permit sign-off on first inspection.'
    }
  },
  sisters: {
    slug: 'sisters',
    name: 'Sisters',
    state: 'OR',
    county: 'Deschutes County',
    utilityName: 'Central Electric Cooperative (CEC) & Pacific Power',
    rebateAmount: '$500',
    phone: '(541) 555-0199',
    phoneClean: '5415550199',
    electricianRate: '$115 – $150 / hr',
    permitOffice: 'Deschutes County Building Safety Department',
    zipCodes: ['97759'],
    landmarks: ['Black Butte Ranch', 'Cascade Mountains', 'Downtown Sisters Country', 'Tollgate Community'],
    neighborhoods: ['Black Butte Ranch', 'Tollgate', 'Pine Ridge', 'Downtown Sisters Historic District'],
    geo: { lat: 44.2909, lng: -121.5492 },
    taglines: {
      hero: 'Sub-Zero Cold Weather EV Charger Installers in Sisters, OR',
      cta: 'Get Your EV Charger Installed in Sisters Today',
      notice: 'Local Notice for Sisters Residents: Heavy-duty 48A Cascade winter wiring and Deschutes County permit filing included.'
    },
    hyperLocalInjections: {
      buildingCodes: 'Deschutes County Building Safety Department trade permit compliance for Black Butte Ranch and Sisters Country properties.',
      climateProtection: 'Heavy sub-zero mountain snow load protection with cold-weather flexible 6 AWG THHN copper wiring rated down to -40°F.',
      architecturalConstraints: 'Strict 19th-century Western architectural theme concealed conduit runs in Downtown Sisters and Black Butte Ranch.',
      utilityInterconnection: 'Central Electric Cooperative (CEC) and Pacific Power utility rebate processing.'
    },
    reviewConsensus: {
      reviewCount: 62,
      rating: '5.0',
      sentimentSummary: 'Based on over 62 verified customer reviews in Sisters and Black Butte Ranch, clients praise our master electricians for respectful historic architecture preservation, clean conduit placement, and fast utility rebate filing.'
    }
  },
  sunriver: {
    slug: 'sunriver',
    name: 'Sunriver',
    state: 'OR',
    county: 'Deschutes County',
    utilityName: 'Midstate Electric Cooperative & Pacific Power',
    rebateAmount: '$500',
    phone: '(541) 555-0199',
    phoneClean: '5415550199',
    electricianRate: '$115 – $150 / hr',
    permitOffice: 'Deschutes County Community Development Department',
    zipCodes: ['97707'],
    landmarks: ['Sunriver Resort Golf Courses', 'Benham Falls', 'Mt. Bachelor Corridor', 'Caldera Springs'],
    neighborhoods: ['Sunriver Resort', 'Caldera Springs', 'Crosswater', 'Vandervert Ranch'],
    geo: { lat: 43.8732, lng: -121.4395 },
    taglines: {
      hero: 'Vacation Rental & Home EV Charger Installers in Sunriver, OR',
      cta: 'Get Your EV Charger Installed in Sunriver Today',
      notice: 'Local Notice for Sunriver Owners: Resort rental 48A Tesla Wall Connector hardwiring and utility rebate filing included.'
    },
    hyperLocalInjections: {
      buildingCodes: 'Deschutes County and Sunriver Owners Association (SROA) Building Department trade permits.',
      climateProtection: 'High-altitude freeze-thaw conduit expansion fittings and heavy-duty commercial RFID access control for vacation rentals.',
      architecturalConstraints: 'Sunriver Resort SROA strict dark-sky and natural wood siding paint-matching guidelines.',
      utilityInterconnection: 'Midstate Electric Cooperative residential $500 cash-back incentive filings.'
    },
    reviewConsensus: {
      reviewCount: 88,
      rating: '4.9',
      sentimentSummary: 'Based on over 88 verified resort owner reviews in Sunriver, vacation rental hosts note a 20% increase in EV guest bookings after our commercial 48A Level 2 installations.'
    }
  },
  'la-pine': {
    slug: 'la-pine',
    name: 'La Pine',
    state: 'OR',
    county: 'Deschutes County',
    utilityName: 'Midstate Electric Cooperative',
    rebateAmount: '$500',
    phone: '(541) 555-0199',
    phoneClean: '5415550199',
    electricianRate: '$105 – $140 / hr',
    permitOffice: 'Deschutes County Community Development Department',
    zipCodes: ['97739'],
    landmarks: ['Newberry National Volcanic Monument', 'Pringle Falls', 'Wickiup Reservoir Access'],
    neighborhoods: ['Newberry Estates', 'Pringle Falls', 'Downtown La Pine', 'Rosland'],
    geo: { lat: 43.6704, lng: -121.5036 },
    taglines: {
      hero: 'Certified Level 2 EV Charger Installation in La Pine, OR',
      cta: 'Get Your EV Charger Installed in La Pine Today',
      notice: 'Local Notice for La Pine Residents: Sub-zero thermal insulation and Midstate Electric rebate assistance included.'
    },
    hyperLocalInjections: {
      buildingCodes: 'Deschutes County trade permits for rural subpanels and detached shop EV charging circuits.',
      climateProtection: '36-inch deep frost line trenching for underground direct-burial Schedule 80 PVC feeder conduit to detached garages.',
      architecturalConstraints: 'Rural shop subpanel integration and high-amperage 100A feeder capacity upgrades.',
      utilityInterconnection: 'Midstate Electric Cooperative 240V grid interconnect verification.'
    },
    reviewConsensus: {
      reviewCount: 45,
      rating: '4.9',
      sentimentSummary: 'Based on over 45 local customer reviews in La Pine, homeowners commend our master electricians for expert trenching, underground conduit runs, and flawless subpanel upgrades.'
    }
  },
  prineville: {
    slug: 'prineville',
    name: 'Prineville',
    state: 'OR',
    county: 'Crook County',
    utilityName: 'Central Electric Cooperative (CEC)',
    rebateAmount: '$500',
    phone: '(541) 555-0199',
    phoneClean: '5415550199',
    electricianRate: '$105 – $140 / hr',
    permitOffice: 'Crook County Community Development Department',
    zipCodes: ['97754'],
    landmarks: ['Prineville Reservoir State Park', 'Ochoco National Forest', 'Crooked River Corridor'],
    neighborhoods: ['Ochoco Heights', 'IronHorse', 'Downtown Prineville', 'Barnes Butte'],
    geo: { lat: 44.2999, lng: -120.8345 },
    taglines: {
      hero: 'Licensed Level 2 EV Charger Installation in Prineville, OR',
      cta: 'Get Your EV Charger Installed in Prineville Today',
      notice: 'Local Notice for Prineville Residents: Crook County trade permits and Central Electric Cooperative rebate filing included.'
    },
    hyperLocalInjections: {
      buildingCodes: 'Crook County Community Development Department electrical permits under Oregon specialty code.',
      climateProtection: 'Agricultural and residential heavy 240V utility grid service panel capacity upgrades.',
      architecturalConstraints: 'IronHorse community HOA concealed conduit standards and Ochoco Heights shop subpanel feeders.',
      utilityInterconnection: 'Central Electric Cooperative (CEC) rebate application processing.'
    },
    reviewConsensus: {
      reviewCount: 51,
      rating: '5.0',
      sentimentSummary: 'Based on over 51 verified local customer reviews in Prineville, clients consistently rate us 5 stars for fast 24-hour dispatch, transparent trade quotes, and complete Crook County trade sign-off.'
    }
  }
};

export const DEFAULT_LOCATION = LOCATIONS.bend;

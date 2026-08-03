// Central Hyper-Local Content & Grid Infrastructure Matrix for Multi-Subdomain Anti-Penalization

export interface LocalizedArticleContext {
  citySlug: string;
  cityName: string;
  state: string;
  county: string;
  utility: {
    name: string;
    type: string;
    rebateAmount: string;
    rebateProgram: string;
    netMeteringRule: string;
    ratePerKWh: string;
  };
  permit: {
    office: string;
    portalUrl: string;
    inspectionWindow: string;
    buildingCodeYear: string;
  };
  climate: {
    elevationFeet: number;
    winterMinTempF: number;
    thermalPreheatOverheadPct: number;
    conduitDeratingFactor: string;
  };
  neighborhoods: string[];
  landmarks: string[];
  phone: string;
  phoneClean: string;
}

export const LOCALIZED_ARTICLE_DATA: Record<string, LocalizedArticleContext> = {
  bend: {
    citySlug: 'bend',
    cityName: 'Bend',
    state: 'OR',
    county: 'Deschutes County',
    utility: {
      name: 'Pacific Power',
      type: 'Investor-Owned Utility (IOU)',
      rebateAmount: '$500',
      rebateProgram: 'Pacific Power Oregon EV Supply Equipment Incentive',
      netMeteringRule: 'Schedule 135 Net Metering Service',
      ratePerKWh: '$0.118 / kWh'
    },
    permit: {
      office: 'City of Bend Building Safety Division',
      portalUrl: 'https://www.bendoregon.gov/building-safety',
      inspectionWindow: '24 Hours On-Site',
      buildingCodeYear: '2023 Oregon Electrical Specialty Code (OESC)'
    },
    climate: {
      elevationFeet: 3625,
      winterMinTempF: -5,
      thermalPreheatOverheadPct: 15,
      conduitDeratingFactor: '75°C THHN Copper Derating Applied'
    },
    neighborhoods: ['Awbrey Butte', 'Northwest Crossing', 'Tetherow', 'Old Mill District', 'Southeast Bend'],
    landmarks: ['Pilot Butte', 'Cascade Lakes Highway', 'Deschutes River Trail'],
    phone: '(541) 555-0199',
    phoneClean: '5415550199'
  },
  redmond: {
    citySlug: 'redmond',
    cityName: 'Redmond',
    state: 'OR',
    county: 'Deschutes County',
    utility: {
      name: 'Pacific Power / Central Electric Co-op',
      type: 'Dual Utility Municipal District',
      rebateAmount: '$500',
      rebateProgram: 'Pacific Power & CEC Commercial/Residential EV Rebate',
      netMeteringRule: 'CEC Net Metering Rate Schedule',
      ratePerKWh: '$0.112 / kWh'
    },
    permit: {
      office: 'City of Redmond Community Development Department',
      portalUrl: 'https://www.redmondoregon.gov/building',
      inspectionWindow: '24–48 Hours',
      buildingCodeYear: '2023 Oregon Electrical Specialty Code'
    },
    climate: {
      elevationFeet: 3077,
      winterMinTempF: -2,
      thermalPreheatOverheadPct: 12,
      conduitDeratingFactor: 'Schedule 80 PVC Thermal Sleeve Protection'
    },
    neighborhoods: ['Dry Canyon', 'Eagle Crest', 'Canyon Rim', 'Northwest Redmond'],
    landmarks: ['Redmond Municipal Airport (RDM)', 'Smith Rock State Park Access'],
    phone: '(541) 555-0199',
    phoneClean: '5415550199'
  },
  sisters: {
    citySlug: 'sisters',
    cityName: 'Sisters',
    state: 'OR',
    county: 'Deschutes County',
    utility: {
      name: 'Central Electric Cooperative (CEC)',
      type: 'Member-Owned Electric Cooperative',
      rebateAmount: '$500',
      rebateProgram: 'CEC Level 2 EV Charger Member Incentive',
      netMeteringRule: 'CEC Interconnection & Net Metering Agreement',
      ratePerKWh: '$0.109 / kWh'
    },
    permit: {
      office: 'Deschutes County Community Development (Sisters Branch)',
      portalUrl: 'https://www.deschutes.org/cd',
      inspectionWindow: '48 Hours',
      buildingCodeYear: '2023 OESC Wildlife & Snow-Load Specs'
    },
    climate: {
      elevationFeet: 3182,
      winterMinTempF: -8,
      thermalPreheatOverheadPct: 20,
      conduitDeratingFactor: 'Cold-Weather Rigid EMT Conduit'
    },
    neighborhoods: ['Black Butte Ranch', 'Tollgate', 'Camp Sherman', 'Downtown Sisters'],
    landmarks: ['Three Sisters Mountains', 'Santiam Pass Summit', 'Whychus Creek'],
    phone: '(541) 555-0199',
    phoneClean: '5415550199'
  },
  sunriver: {
    citySlug: 'sunriver',
    cityName: 'Sunriver',
    state: 'OR',
    county: 'Deschutes County',
    utility: {
      name: 'Midstate Electric Cooperative (MEC)',
      type: 'Rural Electric Cooperative',
      rebateAmount: '$500',
      rebateProgram: 'Midstate Electric Member EV Charging Rebate',
      netMeteringRule: 'Midstate Net Metering Service Contract',
      ratePerKWh: '$0.105 / kWh'
    },
    permit: {
      office: 'Deschutes County Building Safety Division',
      portalUrl: 'https://www.deschutes.org/cd',
      inspectionWindow: '48 Hours',
      buildingCodeYear: '2023 OESC Heavy Snow-Load Code'
    },
    climate: {
      elevationFeet: 4160,
      winterMinTempF: -15,
      thermalPreheatOverheadPct: 25,
      conduitDeratingFactor: 'High-Altitude Heavy Snow Enclosure'
    },
    neighborhoods: ['Sunriver Resort', 'Caldera Springs', 'Crosswater', 'Sunriver Marina'],
    landmarks: ['Mt. Bachelor Highway', 'Sunriver Village', 'Deschutes River Lodge'],
    phone: '(541) 555-0199',
    phoneClean: '5415550199'
  },
  'la-pine': {
    citySlug: 'la-pine',
    cityName: 'La Pine',
    state: 'OR',
    county: 'Deschutes County',
    utility: {
      name: 'Midstate Electric Cooperative (MEC)',
      type: 'Rural Electric Cooperative',
      rebateAmount: '$500',
      rebateProgram: 'Midstate Electric Member Incentive',
      netMeteringRule: 'MEC Net Metering Agreement',
      ratePerKWh: '$0.104 / kWh'
    },
    permit: {
      office: 'Deschutes County Building Safety (La Pine Office)',
      portalUrl: 'https://www.deschutes.org/cd',
      inspectionWindow: '48 Hours',
      buildingCodeYear: '2023 OESC Extreme Temperature Spec'
    },
    climate: {
      elevationFeet: 4235,
      winterMinTempF: -20,
      thermalPreheatOverheadPct: 30,
      conduitDeratingFactor: 'Sub-Zero Thermal Insulation Sleeve'
    },
    neighborhoods: ['Newberry Estate', 'Ponderosa Pines', 'Wickiup Junction', 'Downtown La Pine'],
    landmarks: ['Newberry National Volcanic Monument', 'Paulina Lake', 'Wickiup Reservoir'],
    phone: '(541) 555-0199',
    phoneClean: '5415550199'
  },
  prineville: {
    citySlug: 'prineville',
    cityName: 'Prineville',
    state: 'OR',
    county: 'Crook County',
    utility: {
      name: 'Pacific Power / Central Electric Co-op',
      type: 'Crook County Electric District',
      rebateAmount: '$500',
      rebateProgram: 'Crook County Residential EV Incentive',
      netMeteringRule: 'Pacific Power Schedule 135 Net Metering',
      ratePerKWh: '$0.108 / kWh'
    },
    permit: {
      office: 'Crook County Community Development Department',
      portalUrl: 'https://co.crook.or.us/community-development',
      inspectionWindow: '48 Hours',
      buildingCodeYear: '2023 OESC Rural Industrial Specialty Code'
    },
    climate: {
      elevationFeet: 2868,
      winterMinTempF: -4,
      thermalPreheatOverheadPct: 15,
      conduitDeratingFactor: 'Heavy Industrial EMT Conduit'
    },
    neighborhoods: ['Ochoco West', 'Prineville Reservoir Corridors', 'IronHorse', 'Industrial Tech Park'],
    landmarks: ['Ochoco National Forest', 'Prineville Reservoir State Park', 'Barnes Butte'],
    phone: '(541) 555-0199',
    phoneClean: '5415550199'
  }
};

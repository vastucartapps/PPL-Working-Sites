/**
 * Keyword + page graph for ev-charger-bend-or.
 * Per PPL_SOP.md §18 + memory:keyword-hub-spoke + §41 local answer-layer stack.
 * Value-led capture (panel + rebate math) + service-led conversion.
 */
import type { KeywordGraph } from '@ppl/shared/lib/keyword-graph';

export const KEYWORD_GRAPH: KeywordGraph = {
  hub: '/',
  nodes: {
    '/': {
      path: '/',
      tier: 'hub',
      displayName: 'Bend EV Charger Pros',
      kw: {
        primary: 'ev charger installation bend or',
        variants: [
          'level 2 ev charger install bend oregon',
          'ev charging station installation bend',
          'ev charger installer near me',
          'home ev charger deschutes county',
          'electric car charger installation bend',
        ],
      },
      relatedSpokes: [
        '/services/level-2-charger-install/',
        '/services/ev-panel-upgrade/',
        '/services/nema-14-50-outlet/',
        '/services/multi-unit-ev-charging/',
        '/locations/',
      ],
      relatedSupport: [],
      linkContext: 'Phone-first Level 2 EV charger help for Bend and Deschutes County',
    },

    '/services/level-2-charger-install/': {
      path: '/services/level-2-charger-install/',
      tier: 'spoke',
      displayName: 'Level 2 Charger Installation',
      kw: {
        primary: 'level 2 ev charger installation bend or',
        variants: [
          'home level 2 charger install bend oregon',
          '240v ev charger installation deschutes county',
          'hardwired ev charger bend',
          'evse installation bend or',
        ],
      },
      relatedSpokes: ['/services/ev-panel-upgrade/', '/services/nema-14-50-outlet/'],
      relatedSupport: [
        '/blog/ev-charger-install-cost-bend/',
        '/blog/what-amperage-ev-charger-do-i-need/',
      ],
      linkContext: 'A dedicated 240V circuit and EVSE, sized off a real panel load calc — the core install',
    },

    '/services/ev-panel-upgrade/': {
      path: '/services/ev-panel-upgrade/',
      tier: 'spoke',
      displayName: 'EV Panel & Service Upgrade',
      kw: {
        primary: 'electrical panel upgrade for ev charger bend',
        variants: [
          'panel upgrade ev charger deschutes county',
          '200 amp service upgrade bend or',
          'subpanel for ev charger bend',
          'do i need a panel upgrade for ev charger',
        ],
      },
      relatedSpokes: ['/services/level-2-charger-install/', '/services/multi-unit-ev-charging/'],
      relatedSupport: [
        '/blog/do-i-need-a-panel-upgrade-for-ev-charger/',
        '/blog/what-amperage-ev-charger-do-i-need/',
      ],
      linkContext: 'When the load calc says the panel is full — upgrade or subpanel first, then the EV circuit',
    },

    '/services/nema-14-50-outlet/': {
      path: '/services/nema-14-50-outlet/',
      tier: 'spoke',
      displayName: 'NEMA 14-50 Outlet Install',
      kw: {
        primary: 'nema 14-50 outlet installation bend or',
        variants: [
          '14-50 outlet for ev charger bend oregon',
          '240v outlet install deschutes county',
          'plug in ev charger outlet bend',
          'rv outlet ev charging bend',
        ],
      },
      relatedSpokes: ['/services/level-2-charger-install/'],
      relatedSupport: ['/blog/hardwired-vs-nema-14-50-ev-charger/'],
      linkContext: 'A 240V NEMA 14-50 outlet on a dedicated 50-amp circuit — flexible, unpluggable Level 2',
    },

    '/services/multi-unit-ev-charging/': {
      path: '/services/multi-unit-ev-charging/',
      tier: 'spoke',
      displayName: 'Multi-Unit & Multi-Charger Wiring',
      kw: {
        primary: 'multi unit ev charging installation bend',
        variants: [
          'two ev chargers one house bend or',
          'adu ev charger wiring deschutes county',
          'duplex ev charging bend',
          'ev load management bend oregon',
        ],
      },
      relatedSpokes: ['/services/ev-panel-upgrade/', '/services/level-2-charger-install/'],
      relatedSupport: ['/blog/do-i-need-a-panel-upgrade-for-ev-charger/'],
      linkContext: 'Two cars, an ADU, or a duplex — load management and subpanels planned as one job',
    },

    '/locations/': {
      path: '/locations/',
      tier: 'spoke',
      displayName: 'Service Area — Deschutes County & Central Oregon',
      kw: {
        primary: 'ev charger installer deschutes county or',
        variants: [
          'ev charger installer near me oregon',
          'home ev charging central oregon',
          'ev charger installer redmond sisters prineville',
        ],
      },
      relatedSpokes: ['/services/level-2-charger-install/'],
      relatedSupport: [],
      linkContext: 'Towns we cover across Deschutes County and Central Oregon',
    },

    '/blog/ev-charger-install-cost-bend/': {
      path: '/blog/ev-charger-install-cost-bend/',
      tier: 'support',
      displayName: 'EV Charger Install Cost: What Drives the Price',
      kw: {
        primary: 'ev charger installation cost bend or',
        variants: [
          'how much to install ev charger oregon',
          'level 2 charger install price deschutes county',
          'cost to wire ev charger bend',
        ],
      },
      relatedSpokes: ['/services/level-2-charger-install/', '/services/ev-panel-upgrade/'],
      relatedSupport: ['/blog/oregon-ev-charger-rebates-guide/'],
      linkContext: 'Circuit run, amperage, panel work, and permits — what actually moves the number',
    },

    '/blog/do-i-need-a-panel-upgrade-for-ev-charger/': {
      path: '/blog/do-i-need-a-panel-upgrade-for-ev-charger/',
      tier: 'support',
      displayName: 'Do I Need a Panel Upgrade for an EV Charger?',
      kw: {
        primary: 'do i need a panel upgrade for ev charger',
        variants: [
          'will my panel handle an ev charger',
          'ev charger 100 amp panel',
          'electrical load calculation ev charger',
        ],
      },
      relatedSpokes: ['/services/ev-panel-upgrade/'],
      relatedSupport: ['/blog/what-amperage-ev-charger-do-i-need/'],
      linkContext: 'The load calc decides — when a full panel needs an upgrade before the EV circuit',
    },

    '/blog/hardwired-vs-nema-14-50-ev-charger/': {
      path: '/blog/hardwired-vs-nema-14-50-ev-charger/',
      tier: 'support',
      displayName: 'Hardwired vs NEMA 14-50 EV Charger',
      kw: {
        primary: 'hardwired vs nema 14-50 ev charger',
        variants: [
          'plug in vs hardwired ev charger',
          'should i hardwire my ev charger',
          'nema 14-50 vs hardwire charging speed',
        ],
      },
      relatedSpokes: ['/services/nema-14-50-outlet/', '/services/level-2-charger-install/'],
      relatedSupport: ['/blog/what-amperage-ev-charger-do-i-need/'],
      linkContext: 'Outlet or hardwire — the run length and the target amperage decide the call',
    },

    '/blog/level-1-vs-level-2-ev-charging/': {
      path: '/blog/level-1-vs-level-2-ev-charging/',
      tier: 'support',
      displayName: 'Level 1 vs Level 2 EV Charging',
      kw: {
        primary: 'level 1 vs level 2 ev charging',
        variants: [
          'do i need level 2 charging at home',
          '120v vs 240v ev charging',
          'how fast is level 2 charging',
        ],
      },
      relatedSpokes: ['/services/level-2-charger-install/'],
      relatedSupport: ['/blog/what-amperage-ev-charger-do-i-need/'],
      linkContext: 'Wall outlet or 240V — miles per hour, daily driving, and when Level 1 is enough',
    },

    '/blog/oregon-ev-charger-rebates-guide/': {
      path: '/blog/oregon-ev-charger-rebates-guide/',
      tier: 'support',
      displayName: 'Oregon EV Charger Rebates Guide',
      kw: {
        primary: 'oregon ev charger rebate',
        variants: [
          'central electric cooperative ev rebate',
          'ev charger rebate deschutes county',
          'home ev charging rebate oregon',
        ],
      },
      relatedSpokes: ['/services/level-2-charger-install/'],
      relatedSupport: ['/blog/ev-charger-install-cost-bend/'],
      linkContext: 'The Central Electric Co-op up-to-$450 rebate and how it fits the cost math',
    },

    '/blog/what-amperage-ev-charger-do-i-need/': {
      path: '/blog/what-amperage-ev-charger-do-i-need/',
      tier: 'support',
      displayName: 'What Amperage EV Charger Do I Need?',
      kw: {
        primary: 'what amperage ev charger do i need',
        variants: [
          'how many amps for ev charger',
          '40 amp vs 48 amp ev charger',
          'ev charger circuit size',
        ],
      },
      relatedSpokes: ['/services/level-2-charger-install/'],
      relatedSupport: ['/blog/do-i-need-a-panel-upgrade-for-ev-charger/'],
      linkContext: 'Charge speed is amperage — how the car, the panel, and the 125% rule set the circuit',
    },

    '/privacy/': { path: '/privacy/', tier: 'legal', displayName: 'Privacy Policy', kw: { primary: 'privacy policy', variants: [] }, relatedSpokes: [], relatedSupport: [], linkContext: '' },
    '/terms/': { path: '/terms/', tier: 'legal', displayName: 'Terms of Service', kw: { primary: 'terms of service', variants: [] }, relatedSpokes: [], relatedSupport: [], linkContext: '' },
    '/affiliate-disclosure/': { path: '/affiliate-disclosure/', tier: 'legal', displayName: 'Affiliate Disclosure', kw: { primary: 'affiliate disclosure', variants: [] }, relatedSpokes: [], relatedSupport: [], linkContext: '' },
  },
};

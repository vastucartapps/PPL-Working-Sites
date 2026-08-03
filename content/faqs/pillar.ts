/**
 * FAQ Pillar — comprehensive Level 2 EV charger Q&A for Bend OR site.
 * Organized by topic for AEO/SGE/featured-snippet eligibility.
 * Voice: Bend EV Charger Crew. No fabricated specifics.
 */
import type { FAQItem } from '@ppl/shared/components/FAQAccordion';

export interface FAQSection {
  readonly heading: string;
  readonly items: readonly FAQItem[];
}

export const FAQ_PILLAR_SECTIONS: readonly FAQSection[] = [
  {
    heading: 'Charging levels & speed',
    items: [
      { question: 'What is the difference between Level 1 and Level 2 charging?', answer: 'Level 1 uses a standard 120V household outlet and the cordset that came with the car, adding only a few miles of range per hour. Level 2 uses a 240V circuit — the same voltage class as an electric range or dryer — and a dedicated EVSE, charging several times faster. For most full EVs in Bend, Level 2 is what turns overnight charging from "not quite enough" into a full battery by morning.' },
      { question: 'How fast will a Level 2 charger charge my car?', answer: 'Charge speed on Level 2 scales with the circuit amperage, not the brand of charger. A 40-amp circuit delivers more than a 20-amp one, and the EVSE can only pull what the circuit and your panel allow. The honest number comes after a load calc tells us what your service can carry — buying a 48-amp charger for a panel that can spare 24 amps just leaves capacity unused.' },
      { question: 'Is a Level 2 charger worth it over a regular outlet?', answer: 'For most full EV drivers, yes — a 120V outlet adds only a handful of miles overnight, which falls short for a normal Bend commute or weekend trips. A plug-in hybrid or a very low-mileage driver can sometimes live on Level 1. We will tell you honestly on the phone whether your driving actually needs Level 2 before we quote it.' },
    ],
  },
  {
    heading: 'Panel & electrical',
    items: [
      { question: 'Will my electrical panel handle an EV charger?', answer: 'It depends on a load calculation — the load your panel already carries against its rating, commonly 100A or 200A. A modern 200-amp service with room to spare usually takes a 40- or 48-amp circuit; an older or full panel may only support a smaller circuit, or need an upgrade first. We open the panel and run the calc before promising any amperage, so the quote is the price you pay.' },
      { question: 'Do I need a 200-amp panel for an EV charger?', answer: 'Not necessarily. Plenty of homes charge fine on a 100-amp service with a right-sized circuit, as long as the load calc supports it. What matters is the available capacity after your existing loads — range, dryer, AC, water heater — not the headline panel rating. A 200-amp panel gives more headroom, but the calc, not the number on the door, decides.' },
      { question: 'What is a load calculation and why does it matter?', answer: 'A load calculation totals the connected electrical load in a home and compares it to the service rating to see how much capacity is left. It is what decides whether you can add a Level 2 circuit as-is, at what amperage, or whether the panel needs an upgrade first. Skipping it is how installers promise a 48-amp charger that the panel cannot actually feed.' },
    ],
  },
  {
    heading: 'Install type & equipment',
    items: [
      { question: 'Should I hardwire my charger or use a NEMA 14-50 outlet?', answer: 'Both are real options. A hardwired unit can run a higher continuous amperage and is the call for a long run or the fastest home charging. A NEMA 14-50 outlet is flexible — you can unplug and move a portable EVSE, and it typically supports up to a 40-amp draw. The run length and your target charging amperage decide; we walk through it on the call.' },
      { question: 'What is a NEMA 14-50 outlet?', answer: 'A NEMA 14-50 is a 240V outlet — the classic range and RV outlet — installed on a dedicated 50-amp circuit, commonly used for plug-in Level 2 chargers that draw up to 40 amps continuously. It lets you use a portable EVSE you can unplug and take with you, which is why it is popular with people who want flexibility over the absolute fastest charge.' },
      { question: 'What connector does a home EV charger use?', answer: 'Most home EVSEs use the SAE J1772 connector, the standard "J-plug" for non-Tesla EVs. Tesla vehicles use NACS — the North American Charging Standard — which many automakers are now adopting, with adapters bridging J1772 and NACS. The connector is just the plug on the end; what we install correctly is the 240V circuit and the EVSE behind it.' },
    ],
  },
  {
    heading: 'Permits & licensing',
    items: [
      { question: 'Do I need a permit to install an EV charger in Oregon?', answer: 'Yes. A Level 2 EV charger install in Oregon requires an electrical permit and an inspection by the local building department. It also has to be done by a licensed electrical contractor — in Oregon that means CCB registration plus a BCD electrical license. We pull the permit and route the work to a properly licensed local electrician; an uninspected 240V circuit is a liability and an insurance problem.' },
      { question: 'Can I install a Level 2 charger myself?', answer: 'In Oregon, the 240V circuit work needs a licensed electrical contractor and a permit, so a full DIY hardwire is not the legal path. Some homeowners do limited work under specific permit allowances, but a continuous 240V EV load with the wrong wire gauge or breaker is a heat and fire risk, and unpermitted work can void insurance and complicate a future home sale. We handle it permitted and inspected.' },
      { question: 'Why does an EV circuit need a licensed electrician?', answer: 'A Level 2 charger is a continuous 240V load, so the wire and breaker are sized to 125 percent of the draw, grounded and bonded correctly, and inspected. Oregon requires a licensed electrical contractor (CCB plus BCD electrical license) for this exact reason. A licensed electrician is the baseline for the work, not an upsell — and the permit protects you, not just us.' },
    ],
  },
  {
    heading: 'Rebates & cost',
    items: [
      { question: 'Is there an EV charger rebate in Deschutes County?', answer: 'Yes. Central Electric Cooperative (CEC) offers up to a $450 residential Level 2 charger rebate for qualifying members in its Deschutes County service territory. The exact amount depends on your membership, the equipment, and the program terms in effect, so we tell you whether your address and charger likely qualify rather than promising the full $450 to everyone.' },
      { question: 'What drives the cost of an EV charger install?', answer: 'The real drivers are the distance from the panel to where you park, the target amperage and wire gauge, whether any panel or service work is needed, and the permit. The charger itself is often a smaller line than the wiring and labor. A long run to a detached carport or a panel upgrade moves the number far more than the brand of EVSE. We quote on the phone after the panel and parking details.' },
      { question: 'Why is one EV charger quote so much cheaper than another?', answer: 'Usually because it leaves out the panel work, assumes a short easy run, undersizes the wire for the continuous load, or skips the permit. The EVSE can look identical on paper. The cheap bid is the one that becomes a change order when the panel turns out to be full, or the one running undersized wire on a continuous EV load that should never have passed inspection.' },
    ],
  },
  {
    heading: 'Local — Bend & Central Oregon',
    items: [
      { question: 'Do you serve towns around Bend?', answer: 'Yes. We cover Bend and the rest of Deschutes County and Central Oregon, including Redmond, Sisters, Prineville, and La Pine. Distance affects scheduling and, for a far-out address, the trip — not the quality of the load calc or the install. Call and describe the house and we will tell you honestly whether the drive pencils out.' },
      { question: 'Will an EV charger work through a Bend winter?', answer: 'The 240V circuit itself does not care about the cold — outdoor-rated, cold-tolerant EVSE handles a Deschutes County winter fine on a garage exterior or carport. What the cold affects is the car: battery preconditioning and slightly slower cold-battery charging are the vehicle managing temperature, not the wiring. We spec outdoor-rated equipment for any exterior install.' },
      { question: 'Can you wire charging for an ADU or a second EV?', answer: 'Yes. Two cars, an ADU, a duplex, or a small multi-family property is a planned job — load management, a subpanel, and multiple circuits sized so the service is not overrun. We run one load calc for the whole picture rather than bolting on a second circuit that pushes the panel over. Mention it on the call and we scope it as one project.' },
    ],
  },
];

export function flatFAQs(sections: readonly FAQSection[]): readonly FAQItem[] {
  return sections.flatMap((s) => s.items);
}

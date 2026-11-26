/** Demo public facts. REPLACE BEFORE THIS GOES LIVE. */
export const business = {
  isDemoData: true as const,
  name: "Kramer & Son",
  niche: "Plumbing & Heating",
  fullName: "Kramer & Son Plumbing & Heating",
  siteUrl: "https://kramer-son-plumbing-heating.vercel.app",
  shareDescription:
    "Plumbing and heating for homes in Sterling, Fort Morgan, Brush, and Greeley. Call or book a visit window.",
  phoneDisplay: "(970) 555-0142",
  phoneHref: "tel:+19705550142",
  calendlyUrl: "https://calendly.com/benjivelezrivera2/new-meeting",
  city: "Sterling, CO",
  owner: "Mike Kramer",
  son: "Jake Kramer",
  foundedYear: 1998,
  /** Derived from foundedYear for the current calendar year (demo). */
  yearsServing: new Date().getFullYear() - 1998,
  license: "000000",
  rating: 4.8,
  reviewCount: 47,
  sameDayCutoff: {
    hour: 12,
    minute: 0,
    timezone: "America/Denver",
    /** Display fragment for “Same day if you call by {display}.” */
    display: "noon",
  },
  shopHours: {
    timezone: "America/Denver",
    /** Weekdays Mon–Fri */
    openHour: 8,
    openMinute: 0,
    closeHour: 17,
    closeMinute: 0,
  },
  /** Keep in sync with shopHours (weekdays 8–5). */
  hours: "Weekdays 8–5, plus after-hours emergencies",
  closedHolidays: [
    { name: "Thanksgiving", rule: "us-thanksgiving" as const },
    { name: "Christmas Day", month: 12, day: 25 },
    { name: "New Year's Day", month: 1, day: 1 },
  ],
  // TODO: replace-before-live — swap demo crew photo for an owner-approved shot
  aboutPhoto: {
    src: "/photos/crew-van.jpg",
    alt: "Two Kramer techs beside the shop van.",
  },
  proposalNote: "Sterling, Fort Morgan, Brush, and Greeley",
  hero: {
    headline: "No heat, a leak, or a drain that won't clear.",
    body: "Same day if you call by noon. If it can't wait, call now.",
    imageAlt: "Technician working on a home plumbing and heating job",
  },
  services: [
    {
      title: "Drain Cleaning",
      description:
        "Clear stubborn clogs and get sinks, tubs, and main lines flowing again.",
      detail:
        "A sink, tub, or main line is backing up. The visit starts by finding whether the stoppage is one fixture, a branch, or the main. You hear the price before the machine runs.",
      signs: "Slow drains, standing water, or a backup in a sink, tub, or floor drain.",
      onSite: "We find where it is stopped, clear it, and say what caused it.",
      window: "Same day if you call by noon.",
    },
    {
      title: "Sewer Line Repair",
      description:
        "Find the break, repair the line, and keep wastewater where it belongs.",
      detail:
        "Wastewater is showing up where it should not. The visit finds the break first, then says whether it is a spot repair or a longer section, before anyone digs.",
      signs: "Sewage smell, yard wet spots, or backups in more than one fixture.",
      onSite: "We locate the break, price the repair, then dig only what is needed.",
      window: "Weekday visit; emergency backups go to the front of the list.",
    },
    {
      title: "Water Heater Repair",
      description:
        "Diagnose tanks and tankless units, then fix them the same visit when we can.",
      detail:
        "The house is short on hot water, or the heater is leaking. The visit looks at the tank or the tankless unit and says what can be fixed that day.",
      signs: "Little or no hot water, rumbling tank, or a drip at the heater.",
      onSite: "We check the unit and fix it the same visit when the part is on the truck.",
      window: "Same day if you call by noon.",
    },
    {
      title: "Water Heater Installation",
      description:
        "Size the replacement to the house and get hot water back on the same day.",
      detail:
        "The tank has failed, or the house needs a replacement. The replacement is sized to the house, and hot water is back the same day when the unit is on the truck.",
      signs: "The tank failed, rusted out, or the house needs a properly sized replacement.",
      onSite: "We size the unit to the house, set it, and get hot water back on.",
      window: "Same day when the replacement is on the truck.",
    },
    {
      title: "Leak Detection",
      description:
        "Trace hidden leaks before they wreck floors, walls, or the water bill.",
      detail:
        "A bill jumped, or water is showing up in a wall or floor. The visit traces the leak before it spreads.",
      signs: "A jumped water bill, damp walls or floors, or the meter spinning with nothing on.",
      onSite: "We trace the leak first, then show you what to fix before it spreads.",
      window: "Weekday visit; active flooding is an emergency call.",
    },
    {
      title: "Pipe & Water Line Repair",
      description:
        "Stop the leak, replace the bad section, and pressure-test before we leave.",
      detail:
        "A line is leaking or it has burst. The visit stops the water, replaces the bad section, and pressure-tests before leaving.",
      signs: "A dripping joint, a burst line, or water where it should not be.",
      onSite: "We shut it down, replace the bad section, and pressure-test before we leave.",
      window: "Same day if you call by noon.",
    },
    {
      title: "Toilet & Fixture Repair",
      description:
        "Running toilets, dripping faucets, and fixture swaps done cleanly.",
      detail:
        "A toilet keeps running, or a faucet will not stop dripping. The visit repairs it, or swaps the fixture, and leaves the area dry.",
      signs: "A running toilet, a drip that will not stop, or a fixture that needs a swap.",
      onSite: "We repair it or swap the fixture and leave the area dry.",
      window: "Weekday morning or afternoon window.",
    },
    {
      title: "Furnace & Heating Repair",
      description:
        "Get heat back on, check the system, and tell you what it will take.",
      detail:
        "The heat is out. The visit checks the thermostat, filter, ignition, and flue before anyone talks about a new furnace.",
      signs: "No heat, short cycling, or a furnace that will not stay running.",
      onSite: "We check thermostat, filter, ignition, and flue, then price the fix before work starts.",
      window: "No-heat calls go to the front of the list.",
    },
  ],
  serviceCategories: [
    {
      title: "Drains",
      summary: "Sinks, tubs, or the main line will not clear.",
      signs: "Slow drains, standing water, or a backup in one or more fixtures.",
      onSite: "We find the stoppage, clear it or repair the line, and tell you what caused it.",
      window: "Same day if you call by noon.",
      photo: {
        src: "/photos/category-drains.jpg",
        alt: "Plumber clearing a kitchen sink drain under the cabinet.",
      },
      jobs: ["Drain Cleaning", "Sewer Line Repair"],
    },
    {
      title: "Leaks & pipes",
      summary: "Hidden leaks, burst lines, or a bill that jumped.",
      signs: "Damp floors or walls, a spinning meter, or a line that burst.",
      onSite: "We trace or stop the leak, replace the bad section, and pressure-test.",
      window: "Same day if you call by noon.",
      photo: {
        src: "/photos/category-leaks.jpg",
        alt: "Water dripping from a copper pipe joint under a sink.",
      },
      jobs: ["Leak Detection", "Pipe & Water Line Repair"],
    },
    {
      title: "Water heaters",
      summary: "No hot water, a leaking tank, or a replacement.",
      signs: "Little hot water, a drip at the heater, or a tank that failed.",
      onSite: "We diagnose the unit, repair it, or size and install a replacement.",
      window: "Same day if you call by noon.",
      photo: {
        src: "/photos/category-water-heaters.jpg",
        alt: "Residential water heater with copper supply lines in a utility closet.",
      },
      jobs: ["Water Heater Repair", "Water Heater Installation"],
    },
    {
      title: "Heat / furnace",
      summary: "The house is cold or the furnace will not stay on.",
      signs: "No heat, short cycling, or a furnace that will not ignite.",
      onSite: "We check the system and price the repair before work starts.",
      window: "No-heat calls go to the front of the list.",
      photo: {
        src: "/photos/category-heat.jpg",
        alt: "Open residential furnace being checked with a meter.",
      },
      jobs: ["Furnace & Heating Repair"],
    },
    {
      title: "Toilets & fixtures",
      summary: "Running toilets, drips, and fixture swaps.",
      signs: "A toilet that will not stop, a faucet drip, or a fixture that needs replacing.",
      onSite: "We repair it or swap the fixture and leave the area dry.",
      window: "Weekday morning or afternoon window.",
      photo: {
        src: "/photos/category-fixtures.jpg",
        alt: "Bathroom vanity faucet and toilet in a clean residential bath.",
      },
      jobs: ["Toilet & Fixture Repair"],
    },
  ],
  commercial: {
    title: "Commercial plumbing when the building can't wait",
    body: "Backflow, grease lines, and after-hours calls for shops and property managers.",
  },
  reasons: [
    {
      title: "Dispatched from Sterling",
      description:
        "Your tech leaves from our Sterling shop and knows these roads.",
    },
    {
      title: "Flat price before work",
      description:
        "You approve the price on site before we touch anything. No add-ons after the fact.",
    },
    {
      title: "Parts on the truck",
      description:
        "Common valves, fittings, and water heater parts ride with us. Most calls finish in one trip.",
    },
    {
      title: "Clean when we leave",
      description:
        "Shoe covers, drop cloths, and a wipe-down before we go.",
    },
  ],
  process: [
    {
      title: "You call or book a window",
      description:
        "Tell us what's going on. If water is running, say so and we move you up the list.",
    },
    {
      title: "We look it over and price it",
      description:
        "We find the cause and give you a flat price and your options. You say yes or no.",
    },
    {
      title: "We fix it and clean up",
      description: "The job gets done, the area gets cleaned, and you’re back in service.",
    },
  ],
  areas: [
    {
      name: "Sterling",
      note: "Home base. Same-day when the schedule allows.",
      lat: 40.6256,
      lng: -103.2077,
      homeBase: true,
    },
    {
      name: "Fort Morgan",
      note: "On the regular route.",
      lat: 40.2503,
      lng: -103.8,
      homeBase: false,
    },
    {
      name: "Brush",
      note: "On the regular route.",
      lat: 40.2583,
      lng: -103.623,
      homeBase: false,
    },
    {
      name: "Greeley",
      note: "On the regular route.",
      lat: 40.4233,
      lng: -104.7091,
      homeBase: false,
    },
  ],
  // TODO: REPLACE BEFORE LIVE — fictional demo quotes; swap for real customer reviews
  reviews: [
    {
      name: "Marcus G.",
      quote:
        "Water heater quit on a cold Sterling night. They came the next morning, priced the fix first, and left the utility room cleaner than they found it.",
    },
    {
      name: "Elena R.",
      quote:
        "Main line was backing up at our place near downtown. They found the clog, cleared it, and explained what caused it without the hard sell.",
    },
    {
      name: "Robert T.",
      quote:
        "No heat before a Fort Morgan weekend. They had the part on the truck and got the furnace running the same visit.",
    },
  ],
  faqs: [
    {
      question: "What should I do if the water heater is leaking?",
      answer:
        "Shut the supply valve on top of the tank, flip the gas or breaker off, and call us. Same-day visits for active leaks.",
    },
    {
      question: "How do you price drain cleaning?",
      answer:
        "We diagnose first, then give a price before we start.",
    },
    {
      question: "Do you take emergency calls?",
      answer:
        "Yes. Burst pipes, sewer backups, and no-heat calls go to the front of the list.",
    },
    {
      question: "What should I do if the heat goes out?",
      answer:
        "Check that the thermostat is set to heat and that the furnace has power or gas. If it still will not start, call. No-heat calls go to the front of the list.",
    },
    {
      question: "Can a sewer repair be done without opening the whole yard?",
      answer:
        "Sometimes. We find the break first, then tell you whether it is a spot repair or a longer section. You hear that before anyone digs.",
    },
    {
      question: "Who shows up for the visit?",
      answer:
        "A Kramer & Son tech does the work and cleans up before leaving.",
    },
  ],
} as const;

export type BusinessConfig = typeof business;

/** Shared same-day promise line (no em dash). */
export function sameDayCutoffLine(): string {
  return `Same day if you call by ${business.sameDayCutoff.display}.`;
}

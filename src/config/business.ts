export const business = {
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
  hours: "Weekdays 8–5, plus after-hours emergencies",
  proposalNote: "Sterling, Fort Morgan, Brush, and Greeley",
  hero: {
    headline: "No heat, a leak, or a drain that won't clear.",
    body: "Same-day windows out of Sterling when the schedule allows. Call if it can't wait.",
    imageAlt: "Technician working on a home plumbing and heating job",
  },
  services: [
    {
      title: "Drain Cleaning",
      description:
        "Clear stubborn clogs and get sinks, tubs, and main lines flowing again.",
      detail:
        "A sink, tub, or main line is backing up. The visit starts by finding whether the stoppage is one fixture, a branch, or the main. You hear the price before the machine runs.",
    },
    {
      title: "Sewer Line Repair",
      description:
        "Find the break, repair the line, and keep wastewater where it belongs.",
      detail:
        "Wastewater is showing up where it should not. The visit finds the break first, then says whether it is a spot repair or a longer section, before anyone digs.",
    },
    {
      title: "Water Heater Repair",
      description:
        "Diagnose tanks and tankless units, then fix them the same visit when we can.",
      detail:
        "The house is short on hot water, or the heater is leaking. The visit looks at the tank or the tankless unit and says what can be fixed that day.",
    },
    {
      title: "Water Heater Installation",
      description:
        "Size the replacement to the house and get hot water back on the same day.",
      detail:
        "The tank has failed, or the house needs a replacement. The replacement is sized to the house, and hot water is back the same day when the unit is on the truck.",
    },
    {
      title: "Leak Detection",
      description:
        "Trace hidden leaks before they wreck floors, walls, or the water bill.",
      detail:
        "A bill jumped, or water is showing up in a wall or floor. The visit traces the leak before it spreads.",
    },
    {
      title: "Pipe & Water Line Repair",
      description:
        "Stop the leak, replace the bad section, and pressure-test before we leave.",
      detail:
        "A line is leaking or it has burst. The visit stops the water, replaces the bad section, and pressure-tests before leaving.",
    },
    {
      title: "Toilet & Fixture Repair",
      description:
        "Running toilets, dripping faucets, and fixture swaps done cleanly.",
      detail:
        "A toilet keeps running, or a faucet will not stop dripping. The visit repairs it, or swaps the fixture, and leaves the area dry.",
    },
    {
      title: "Furnace & Heating Repair",
      description:
        "Get heat back on, check the system, and tell you what it will take.",
      detail:
        "The heat is out. The visit checks the thermostat, filter, ignition, and flue before anyone talks about a new furnace.",
    },
  ],
  commercial: {
    title: "Commercial plumbing when the building can't wait",
    body: "Backflow, grease lines, and after-hours calls for shops and property managers.",
  },
  reasons: [
    {
      title: "Local dispatch",
      description: "The truck leaves from the Sterling shop.",
    },
    {
      title: "Upfront pricing",
      description: "You see the price before the work starts.",
    },
    {
      title: "Stocked trucks",
      description: "Common parts ride with the tech so most jobs finish in one trip.",
    },
    {
      title: "Clean job sites",
      description: "Shoes off, drop cloths down, and the workspace left tidy.",
    },
  ],
  process: [
    {
      title: "You call or book a window",
      description: "Tell us what’s going on.",
    },
    {
      title: "We look it over and price it",
      description: "On site we explain the options.",
    },
    {
      title: "We fix it and clean up",
      description: "The job gets done, the area gets cleaned, and you’re back in service.",
    },
  ],
  areas: [
    { name: "Sterling", note: "Home base. Same-day when the schedule allows." },
    { name: "Fort Morgan", note: "On the regular route." },
    { name: "Brush", note: "On the regular route." },
    { name: "Greeley", note: "On the regular route." },
  ],
  reviews: [
    {
      name: "Marcus G.",
      quote:
        "Water heater died on a Thursday. They were here Friday morning, priced it first, and left the utility room cleaner than they found it.",
    },
    {
      name: "Elena R.",
      quote:
        "Main line was backing up. They found the clog, cleared it, and explained what caused it without the hard sell.",
    },
    {
      name: "Robert T.",
      quote:
        "Pressure regulator was shot. They had the part on the truck and swapped it while they were already here.",
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

export const business = {
  name: "Business Name",
  niche: "Plumbing & Heating",
  fullName: "Business Name Plumbing & Heating",
  siteUrl: "https://kramer-son-plumbing-heating.vercel.app",
  shareDescription:
    "Plumbing and heating help for the house. Same-day visits, clear prices, and a form to request a tech.",
  phoneDisplay: "(970) 555-0142",
  phoneHref: "tel:+19705550142",
  city: "Your city",
  hours: "Weekdays, plus emergency calls",
  proposalNote: "Sample site — not a live shop",
  hero: {
    headline: "Plumbing and heating help for the house",
    body: "Same-day visits, clear prices, and a tech who shows up with the parts. Drain clogs, water heaters, leaks, and furnaces.",
    imageAlt: "Technician working on a home plumbing and heating job",
  },
  services: [
    {
      title: "Drain Cleaning",
      description:
        "Clear stubborn clogs and get sinks, tubs, and main lines flowing again.",
    },
    {
      title: "Sewer Line Repair",
      description:
        "Find the break, repair the line, and keep wastewater where it belongs.",
    },
    {
      title: "Water Heater Repair",
      description:
        "Diagnose tanks and tankless units, then fix them the same visit when we can.",
    },
    {
      title: "Water Heater Installation",
      description:
        "Size the replacement to the house and get hot water back on the same day.",
    },
    {
      title: "Leak Detection",
      description:
        "Trace hidden leaks before they wreck floors, walls, or the water bill.",
    },
    {
      title: "Pipe & Water Line Repair",
      description:
        "Stop the leak, replace the bad section, and pressure-test before we leave.",
    },
    {
      title: "Toilet & Fixture Repair",
      description:
        "Running toilets, dripping faucets, and fixture swaps done cleanly.",
    },
    {
      title: "Furnace & Heating Repair",
      description:
        "Get heat back on, check the system, and tell you what it will take.",
    },
  ],
  commercial: {
    title: "Commercial plumbing when the building can't wait",
    body: "Backflow, grease lines, and after-hours calls for shops and property managers.",
  },
  reasons: [
    {
      title: "Local dispatch",
      description: "We run from your city and aim for a same-day window.",
    },
    {
      title: "Upfront pricing",
      description: "You see the price before work starts. No surprise add-ons.",
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
      title: "Call or send a request",
      description: "Tell us what's going on. We get you on the board.",
    },
    {
      title: "On-site diagnostic",
      description: "We inspect, explain the options, and give a written price.",
    },
    {
      title: "Fixed and wrapped up",
      description: "The work gets done, the area gets cleaned, and you're back in service.",
    },
  ],
  areas: [
    { name: "Your city", note: "Home base" },
    { name: "Nearby towns", note: "Regular service" },
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
        "We diagnose first, then give a price before we start. Sample pricing only on this demo.",
    },
    {
      question: "Do you take emergency calls?",
      answer:
        "Yes. Burst pipes, sewer backups, and no-heat calls go to the front of the list.",
    },
    {
      question: "Are tankless water heaters worth it?",
      answer:
        "They last longer and cut standby heat loss. We'll tell you if the house and gas line can support one.",
    },
  ],
} as const;

export type BusinessConfig = typeof business;

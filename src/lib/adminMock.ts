import { business } from "../config/business";

export type OfficeDateRange = "all" | "today" | "week" | "month";

export type OfficeContext = {
  query: string;
  bookings: MockBooking[];
  activity: MockActivity[];
  setVisitStatus: (id: string, status: MockBookingStatus) => void;
  setVisitService: (id: string, service: string) => void;
};

/** Shape a later n8n workflow can append when the website form is submitted. */
export type MockNotification = {
  id: string;
  source: "website-form";
  title: string;
  body: string;
  at: string;
  unread: boolean;
};

export type MockService = {
  id: string;
  name: string;
  category: "Plumbing" | "Heating";
  summary: string;
  /** Office-only starting price. Absent when this service has no approved number yet. */
  startingPrice?: number;
};

/** Approved sample prices from IMPLEMENTATION PLANS/07-services.md. Not shown on the public site. */
const startingPrices: Record<string, number> = {
  "Drain Cleaning": 149,
  "Sewer Line Repair": 425,
  "Water Heater Repair": 189,
  "Water Heater Installation": 399,
  "Leak Detection": 249,
  "Toilet & Fixture Repair": 129,
  "Furnace & Heating Repair": 189,
  "Pipe & Water Line Repair": 275,
};

export type MockClient = {
  id: string;
  name: string;
  city: string;
  phone: string;
  role: "Owner" | "Technician" | "Office" | "Apprentice";
};

export type MockBookingStatus = "Requested" | "Confirmed" | "Done" | "Pending" | "Cancelled";

export type MockBooking = {
  id: string;
  when: string;
  /** Local calendar date, YYYY-MM-DD, so the sample filters can run without a database. */
  date: string;
  window: "Morning" | "Afternoon";
  client: string;
  service: string;
  status: MockBookingStatus;
  /** Visit price. When absent, the service starting price is used. */
  price?: number;
};

export function serviceStartingPrice(serviceName: string): number | undefined {
  return mockServices.find((service) => service.name === serviceName)?.startingPrice;
}

export function visitPrice(booking: Pick<MockBooking, "price" | "service">): {
  amount: number | null;
  source: "visit" | "service" | "none";
} {
  if (booking.price != null) return { amount: booking.price, source: "visit" };
  const starting = serviceStartingPrice(booking.service);
  if (starting != null) return { amount: starting, source: "service" };
  return { amount: null, source: "none" };
}

export type MockActivityKind = "client" | "admin";

export type MockActivity = {
  id: string;
  kind: MockActivityKind;
  title: string;
  detail: string;
  when: string;
  /** Local calendar date, YYYY-MM-DD, so the dashboard date filter can include this row. */
  date: string;
};

export function localDateString(date: Date): string {
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${date.getFullYear()}-${month}-${day}`;
}

export function inOfficeRange(
  date: string,
  range: OfficeDateRange | "custom",
  today: string,
  from = "",
  to = "",
): boolean {
  if (range === "all") return true;
  if (range === "today") return date === today;
  if (range === "week") {
    const start = new Date(`${today}T00:00:00`);
    start.setDate(start.getDate() - start.getDay());
    const end = new Date(start);
    end.setDate(start.getDate() + 6);
    return date >= localDateString(start) && date <= localDateString(end);
  }
  if (range === "month") return date.slice(0, 7) === today.slice(0, 7);
  const afterStart = !from || date >= from;
  const beforeEnd = !to || date <= to;
  return afterStart && beforeEnd;
}

export function adminStatusTitle(status: MockBookingStatus): string {
  if (status === "Confirmed") return "Booking confirmed";
  if (status === "Pending") return "Marked pending";
  if (status === "Cancelled") return "Booking cancelled";
  if (status === "Done") return "Visit finished";
  return "Booking requested";
}

export function formatOfficeMoney(amount: number): string {
  return `$${amount.toLocaleString("en-US")}`;
}

export type OfficeCards = {
  revenue: string;
  clients: string;
  jobs: string;
  pending: string;
};

/** Cards counted from the same visits the Bookings page can confirm, mark pending, or cancel. */
export function countOfficeCards(bookings: MockBooking[], range: OfficeDateRange, today: string): OfficeCards {
  const rows = bookings.filter((row) => inOfficeRange(row.date, range, today));
  const revenue = rows
    .filter((row) => row.status === "Confirmed")
    .reduce((sum, row) => sum + (visitPrice(row).amount ?? 0), 0);
  const clients = new Set(rows.map((row) => row.client)).size;
  const jobs = rows.filter(
    (row) => row.date >= today && row.status !== "Done" && row.status !== "Cancelled",
  ).length;
  const pending = rows.filter((row) => row.status === "Pending").length;
  return {
    revenue: formatOfficeMoney(revenue),
    clients: String(clients),
    jobs: String(jobs),
    pending: String(pending),
  };
}

export function matchesQuery(query: string, ...parts: Array<string | undefined>): boolean {
  const needle = query.trim().toLowerCase();
  if (!needle) return true;
  return parts
    .filter(Boolean)
    .join(" ")
    .toLowerCase()
    .includes(needle);
}

function serviceCategory(title: string): MockService["category"] {
  if (/furnace|boiler|thermostat/i.test(title)) return "Heating";
  return "Plumbing";
}

export const mockServices: MockService[] = business.services.map((service, index) => ({
  id: `svc-${index + 1}`,
  name: service.title,
  category: serviceCategory(service.title),
  summary: service.description,
  startingPrice: startingPrices[service.title],
}));

export const mockClients: MockClient[] = [
  {
    id: "cli-1",
    name: "Dana Kramer",
    city: "Sterling",
    phone: "(970) 555-0101",
    role: "Owner",
  },
  {
    id: "cli-2",
    name: "Chris Alvarez",
    city: "Sterling",
    phone: "(970) 555-0102",
    role: "Technician",
  },
  {
    id: "cli-3",
    name: "Sam Patel",
    city: "Fort Morgan",
    phone: "(970) 555-0103",
    role: "Technician",
  },
  {
    id: "cli-4",
    name: "Riley Nguyen",
    city: "Brush",
    phone: "(970) 555-0104",
    role: "Technician",
  },
  {
    id: "cli-5",
    name: "Morgan Ellis",
    city: "Greeley",
    phone: "(970) 555-0105",
    role: "Office",
  },
  {
    id: "cli-6",
    name: "Alex Brennan",
    city: "Sterling",
    phone: "(970) 555-0106",
    role: "Apprentice",
  },
];

export const mockBookings: MockBooking[] = [
  {
    id: "bk-1",
    when: "Sun, Nov 8",
    date: "2026-11-08",
    window: "Morning",
    client: "Elena Ruiz",
    service: "Water Heater Repair",
    status: "Confirmed",
    price: 240,
  },
  {
    id: "bk-2",
    when: "Tue, Nov 10",
    date: "2026-11-10",
    window: "Afternoon",
    client: "Priya Shah",
    service: "Furnace & Heating Repair",
    status: "Requested",
  },
  {
    id: "bk-3",
    when: "Thu, Nov 12",
    date: "2026-11-12",
    window: "Morning",
    client: "Owen Brooks",
    service: "Leak Detection",
    status: "Confirmed",
  },
  {
    id: "bk-4",
    when: "Wed, Nov 18",
    date: "2026-11-18",
    window: "Afternoon",
    client: "Marcus Hale",
    service: "Drain Cleaning",
    status: "Requested",
  },
  {
    id: "bk-5",
    when: "Wed, Nov 25",
    date: "2026-11-25",
    window: "Morning",
    client: "Hannah Cole",
    service: "Toilet & Fixture Repair",
    status: "Done",
  },
];

export const mockActivity: MockActivity[] = [
  {
    id: "act-1",
    kind: "client",
    title: "Website form",
    detail: "Leak detection request from the homepage form.",
    when: "12 min ago",
    date: "2026-11-08",
  },
  {
    id: "act-2",
    kind: "admin",
    title: "Booking confirmed",
    detail: "Elena Ruiz, water heater, Sunday morning.",
    when: "1 hour ago",
    date: "2026-11-08",
  },
  {
    id: "act-3",
    kind: "client",
    title: "Website form",
    detail: "Furnace repair request from the homepage form.",
    when: "Yesterday",
    date: "2026-11-07",
  },
  {
    id: "act-4",
    kind: "admin",
    title: "Visit finished",
    detail: "Hannah Cole, toilet repair, marked done.",
    when: "Yesterday",
    date: "2026-11-07",
  },
];

export const seedNotifications: MockNotification[] = [
  {
    id: "note-1",
    source: "website-form",
    title: "Website form",
    body: "Leak detection request from the homepage form.",
    at: "12 min ago",
    unread: true,
  },
  {
    id: "note-2",
    source: "website-form",
    title: "Website form",
    body: "Furnace repair request from the homepage form.",
    at: "Yesterday",
    unread: false,
  },
];

export const arrivingNotification: MockNotification = {
  id: "note-live",
  source: "website-form",
  title: "Website form",
  body: "New drain cleaning request just came in from the site form.",
  at: "Just now",
  unread: true,
};

type VisitPayload = {
  name: string;
  phone: string;
  address: string;
  service: string;
  day: string;
  window: string;
};

export function sendVisitEmails(visit: VisitPayload): void {
  const url = import.meta.env.VITE_VISIT_WEBHOOK_URL;
  if (!url) return;

  void fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(visit),
  }).catch(() => undefined);
}

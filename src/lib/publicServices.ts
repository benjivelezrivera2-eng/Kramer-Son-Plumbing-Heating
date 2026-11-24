import { business } from "../config/business";
import { slugify } from "./shop";

export type PublicService = (typeof business.services)[number];
export type ServiceCategory = (typeof business.serviceCategories)[number];

export function serviceByTitle(title: string): PublicService | undefined {
  return business.services.find((service) => service.title === title);
}

export function serviceBySlug(slug: string): PublicService | undefined {
  return business.services.find((service) => slugify(service.title) === slug);
}

export function categoryBySlug(slug: string): ServiceCategory | undefined {
  return business.serviceCategories.find(
    (category) => slugify(category.title) === slug,
  );
}

export function categoryForService(title: string): ServiceCategory | undefined {
  return business.serviceCategories.find((category) =>
    category.jobs.includes(title),
  );
}

export function categoryJobs(category: ServiceCategory): PublicService[] {
  return category.jobs.flatMap((title) => {
    const job = serviceByTitle(title);
    return job ? [job] : [];
  });
}

export function primaryJobTitle(category: ServiceCategory): string {
  return category.jobs[0] ?? "";
}

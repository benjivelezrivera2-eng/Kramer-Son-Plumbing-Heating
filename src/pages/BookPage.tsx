import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useOpenBooking } from "../components/BookingDialog";
import { business } from "../config/business";
import { slugify } from "../lib/shop";
import { usePageTitle } from "../lib/usePageTitle";
import { HomePage } from "./HomePage";

export function BookPage(): JSX.Element {
  const { slug } = useParams<{ slug?: string }>();
  const openBooking = useOpenBooking();
  const service = business.services.find((item) => slugify(item.title) === slug);
  usePageTitle(service ? `Book ${service.title}` : "Book a visit");

  useEffect(() => {
    openBooking(service?.title);
  }, [openBooking, service]);

  return <HomePage />;
}

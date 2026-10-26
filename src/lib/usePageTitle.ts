import { useEffect } from "react";
import { business } from "../config/business";

export function usePageTitle(page?: string) {
  useEffect(() => {
    document.title = page
      ? `${page} · ${business.fullName}`
      : business.fullName;
  }, [page]);
}

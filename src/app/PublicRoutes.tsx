import { Route, Routes } from "react-router-dom";
import { SiteShell } from "../layouts/SiteShell";
import { ArticlePage } from "../pages/ArticlePage";
import { HomePage } from "../pages/HomePage";
import { ServiceDetailPage } from "../pages/ServiceDetailPage";

/** Indexable pages only. The prerender build imports this file and not App, so admin and booking screens stay out of the static HTML. */
export function PublicRoutes(): JSX.Element {
  return (
    <Routes>
      <Route element={<SiteShell />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/services/:slug" element={<ServiceDetailPage />} />
        <Route path="/articles/:slug" element={<ArticlePage />} />
      </Route>
    </Routes>
  );
}

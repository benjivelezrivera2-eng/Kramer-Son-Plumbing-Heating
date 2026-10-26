import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { SiteShell } from "../layouts/SiteShell";
import { AboutPage } from "../pages/AboutPage";
import { ConfirmationPage } from "../pages/ConfirmationPage";
import { ContactPage } from "../pages/ContactPage";
import { HomePage } from "../pages/HomePage";
import { ServicesPage } from "../pages/ServicesPage";

export function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<SiteShell />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/confirmation" element={<ConfirmationPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

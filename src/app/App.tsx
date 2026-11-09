import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";
import { RequireAdmin } from "../components/RequireAdmin";
import { AdminShell } from "../layouts/AdminShell";
import { SiteShell } from "../layouts/SiteShell";
import { AuthProvider } from "../lib/AuthProvider";
import { AdminActivityPage } from "../pages/admin/AdminActivityPage";
import { AdminAvailabilityPage } from "../pages/admin/AdminAvailabilityPage";
import { AdminBookingDetailPage } from "../pages/admin/AdminBookingDetailPage";
import { AdminBookingNewPage } from "../pages/admin/AdminBookingNewPage";
import { AdminCustomerDetailPage } from "../pages/admin/AdminCustomerDetailPage";
import { AdminCustomersPage } from "../pages/admin/AdminCustomersPage";
import { MockBookingsPage } from "../pages/admin/MockBookingsPage";
import { MockClientsPage } from "../pages/admin/MockClientsPage";
import { MockDashboardPage } from "../pages/admin/MockDashboardPage";
import { AdminLeadDetailPage } from "../pages/admin/AdminLeadDetailPage";
import { AdminLeadNewPage } from "../pages/admin/AdminLeadNewPage";
import { AdminLeadsPage } from "../pages/admin/AdminLeadsPage";
import { AdminProfilePage } from "../pages/admin/AdminProfilePage";
import { AdminReportsPage } from "../pages/admin/AdminReportsPage";
import { AdminSchedulePage } from "../pages/admin/AdminSchedulePage";
import { AdminServiceDetailPage } from "../pages/admin/AdminServiceDetailPage";
import { MockServicesPage } from "../pages/admin/MockServicesPage";
import { AdminSettingsPage } from "../pages/admin/AdminSettingsPage";
import { AdminTechnicianDetailPage } from "../pages/admin/AdminTechnicianDetailPage";
import { AdminTechniciansPage } from "../pages/admin/AdminTechniciansPage";
import { BookPage } from "../pages/BookPage";
import { ConfirmationPage } from "../pages/ConfirmationPage";
import { HomePage } from "../pages/HomePage";
import { ForgotPasswordPage } from "../pages/ForgotPasswordPage";
import { LoginPage } from "../pages/LoginPage";
import { ResetPasswordPage } from "../pages/ResetPasswordPage";
import { UnauthorizedPage } from "../pages/UnauthorizedPage";
import { ManageBookingPage } from "../pages/ManageBookingPage";
import { RescheduleBookingPage } from "../pages/RescheduleBookingPage";
import { ServiceDetailPage } from "../pages/ServiceDetailPage";

export function App(): JSX.Element {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Toaster position="top-left" richColors closeButton />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/unauthorized" element={<UnauthorizedPage />} />
          <Route
            path="/admin"
            element={
              <RequireAdmin>
                <AdminShell />
              </RequireAdmin>
            }
          >
            <Route index element={<MockDashboardPage />} />
            <Route path="leads" element={<AdminLeadsPage />} />
            <Route path="leads/new" element={<AdminLeadNewPage />} />
            <Route path="leads/:id" element={<AdminLeadDetailPage />} />
            <Route path="bookings" element={<MockBookingsPage />} />
            <Route path="bookings/new" element={<AdminBookingNewPage />} />
            <Route path="bookings/:id" element={<AdminBookingDetailPage />} />
            <Route path="schedule" element={<AdminSchedulePage />} />
            <Route path="clients" element={<MockClientsPage />} />
            <Route path="customers" element={<AdminCustomersPage />} />
            <Route path="customers/:id" element={<AdminCustomerDetailPage />} />
            <Route path="services" element={<MockServicesPage />} />
            <Route path="services/:id" element={<AdminServiceDetailPage />} />
            <Route path="technicians" element={<AdminTechniciansPage />} />
            <Route path="technicians/:id" element={<AdminTechnicianDetailPage />} />
            <Route path="availability" element={<AdminAvailabilityPage />} />
            <Route path="reports" element={<AdminReportsPage />} />
            <Route path="activity" element={<AdminActivityPage />} />
            <Route path="settings" element={<AdminSettingsPage />} />
            <Route path="profile" element={<AdminProfilePage />} />
          </Route>
          <Route element={<SiteShell />}>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/services"
              element={<Navigate to={{ pathname: "/", hash: "services" }} replace />}
            />
            <Route path="/services/:slug" element={<ServiceDetailPage />} />
            <Route
              path="/book"
              element={<Navigate to={{ pathname: "/", hash: "book" }} replace />}
            />
            <Route path="/book/:slug" element={<BookPage />} />
            <Route
              path="/about"
              element={<Navigate to={{ pathname: "/", hash: "about" }} replace />}
            />
            <Route
              path="/contact"
              element={<Navigate to={{ pathname: "/", hash: "contact" }} replace />}
            />
            <Route path="/confirmation" element={<ConfirmationPage />} />
            <Route path="/b/:token" element={<ManageBookingPage />} />
            <Route path="/b/:token/reschedule" element={<RescheduleBookingPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

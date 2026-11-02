import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../lib/AuthProvider";

export function RequireAdmin({
  children,
}: {
  children: JSX.Element;
}): JSX.Element {
  const { session, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f4f6f8] [font-family:'Geist',Helvetica] text-sm text-slate-600">
        Checking login…
      </div>
    );
  }

  if (!session) {
    return (
      <Navigate to="/login" replace state={{ from: location.pathname }} />
    );
  }

  return children;
}

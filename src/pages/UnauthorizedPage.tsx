import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { business } from "../config/business";
import { useAuth } from "../lib/AuthProvider";
import { usePageTitle } from "../lib/usePageTitle";

export function UnauthorizedPage(): JSX.Element {
  usePageTitle("Access denied");
  const { session, signOut } = useAuth();
  const navigate = useNavigate();
  const [signingOut, setSigningOut] = useState(false);

  async function handleSignOut() {
    setSigningOut(true);
    await signOut();
    navigate("/login", { replace: true });
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#f4f6f8]">
      <div className="bg-[#142033] px-4 py-1.5">
        <p className="text-center [font-family:'Geist',Helvetica] text-xs text-slate-200">
          {business.proposalNote}
        </p>
      </div>
      <main className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center px-4 py-12">
        <p className="[font-family:'Geist',Helvetica] text-xs font-medium tracking-wide text-[#2a7a78]">
          {business.niche}
        </p>
        <h1 className="mt-2 [font-family:'Gabarito',Helvetica] text-[32px] font-extrabold text-[#142033]">
          Access denied
        </h1>
        <p className="mt-2 [font-family:'Geist',Helvetica] text-sm leading-6 text-slate-600">
          You do not have permission to open the shop office. If you believe
          this is an error, sign in with the owner account.
        </p>
        <div className="mt-8 flex flex-col gap-3">
          <Link
            to="/"
            className="inline-flex h-11 items-center justify-center rounded-md bg-[#c9a04a] px-6 text-sm font-semibold text-[#142033] hover:bg-[#b8903f]"
          >
            Back to home
          </Link>
          <Link
            to="/login"
            className="inline-flex h-11 items-center justify-center rounded-md border border-slate-200 bg-white px-6 text-sm font-semibold text-[#142033] hover:bg-slate-50"
          >
            Shop login
          </Link>
          {session ? (
            <button
              type="button"
              onClick={() => void handleSignOut()}
              disabled={signingOut}
              className="inline-flex h-11 items-center justify-center rounded-md border border-slate-200 bg-white px-6 text-sm font-semibold text-[#142033] hover:bg-slate-50 disabled:opacity-60"
            >
              {signingOut ? "Signing out…" : "Sign out"}
            </button>
          ) : null}
        </div>
      </main>
    </div>
  );
}

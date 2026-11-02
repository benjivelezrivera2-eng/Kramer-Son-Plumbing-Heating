import { FormEvent, useState } from "react";
import { Link, Navigate, useLocation } from "react-router-dom";
import { toast } from "sonner";
import { business } from "../config/business";
import { useAuth } from "../lib/AuthProvider";
import { usePageTitle } from "../lib/usePageTitle";

const fieldClassName =
  "h-11 rounded-md border border-slate-300 bg-white px-3 text-sm text-[#142033] outline-none focus-visible:border-[#2a7a78] focus-visible:ring-2 focus-visible:ring-[#2a7a78]";

export function LoginPage(): JSX.Element {
  usePageTitle("Shop login");
  const { session, loading, signIn } = useAuth();
  const location = useLocation();
  const from =
    (location.state as { from?: string } | null)?.from ?? "/admin";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (!loading && session) {
    return <Navigate to={from} replace />;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    const { error } = await signIn(email, password);
    setSubmitting(false);
    if (error) {
      toast.error("That login did not work. Check the email and password.");
      return;
    }
    toast.success("Signed in.");
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#f4f6f8]">
      <div className="bg-[#142033] px-4 py-1.5">
        <p className="text-center [font-family:'Geist',Helvetica] text-xs text-slate-200">
          {business.proposalNote}
        </p>
      </div>
      <main className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center px-4 py-12">
        <Link
          to="/"
          className="[font-family:'Geist',Helvetica] text-xs font-medium tracking-wide text-[#2a7a78] hover:text-[#1f5c5b]"
        >
          {business.niche}
        </Link>
        <h1 className="mt-2 [font-family:'Gabarito',Helvetica] text-[32px] font-extrabold text-[#142033]">
          Shop login
        </h1>
        <p className="mt-2 [font-family:'Geist',Helvetica] text-sm leading-6 text-slate-600">
          Office only. There is no customer account and no sign-up on this
          page.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-8 flex flex-col gap-4 rounded-md border border-slate-200 bg-white p-6"
          noValidate
        >
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="login-email"
              className="[font-family:'Geist',Helvetica] text-sm font-semibold text-[#142033]"
            >
              Email
            </label>
            <input
              id="login-email"
              name="email"
              type="email"
              autoComplete="username"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className={fieldClassName}
              required
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="login-password"
              className="[font-family:'Geist',Helvetica] text-sm font-semibold text-[#142033]"
            >
              Password
            </label>
            <input
              id="login-password"
              name="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className={fieldClassName}
              required
            />
          </div>
          <button
            type="submit"
            disabled={submitting || loading}
            className="mt-1 h-11 rounded-md bg-[#c9a04a] px-6 text-sm font-semibold text-[#142033] transition-colors hover:bg-[#b8903f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#142033] focus-visible:ring-offset-2 disabled:opacity-60"
          >
            {submitting ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </main>
    </div>
  );
}

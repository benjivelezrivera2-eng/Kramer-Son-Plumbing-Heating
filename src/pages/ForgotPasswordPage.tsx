import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { business } from "../config/business";
import { supabase } from "../lib/supabase";
import { fieldClassName, primaryButtonClassName } from "../lib/ui";
import { usePageTitle } from "../lib/usePageTitle";

export function ForgotPasswordPage(): JSX.Element {
  usePageTitle("Forgot password");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = email.trim();
    if (!trimmed) {
      toast.error("Enter the office email.");
      return;
    }

    setSubmitting(true);
    const redirectTo = `${window.location.origin}/reset-password`;
    const { error } = await supabase.auth.resetPasswordForEmail(trimmed, {
      redirectTo,
    });
    setSubmitting(false);

    if (error) {
      toast.error(error.message);
      return;
    }

    setSent(true);
    toast.success("If that email is on the office, a reset link is on the way.");
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
          Forgot password
        </h1>
        <p className="mt-2 [font-family:'Geist',Helvetica] text-sm leading-6 text-slate-600">
          Enter the office email. We will send a link to set a new password.
        </p>

        {sent ? (
          <div className="mt-8 rounded-md border border-slate-200 bg-white p-6">
            <p className="[font-family:'Geist',Helvetica] text-sm leading-6 text-slate-700">
              Check that inbox for the reset link. It opens a page on this
              site so you can choose a new password.
            </p>
            <Link
              to="/login"
              className={`mt-6 ${primaryButtonClassName} w-full`}
            >
              Back to sign in
            </Link>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="mt-8 flex flex-col gap-4 rounded-md border border-slate-200 bg-white p-6"
            noValidate
          >
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="reset-email"
                className="[font-family:'Geist',Helvetica] text-sm font-semibold text-[#142033]"
              >
                Email
              </label>
              <input
                id="reset-email"
                name="email"
                type="email"
                autoComplete="username"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className={fieldClassName}
                required
              />
            </div>
            <button
              type="submit"
              disabled={submitting}
              className={primaryButtonClassName}
            >
              {submitting ? "Sending…" : "Send reset link"}
            </button>
            <Link
              to="/login"
              className="text-center [font-family:'Geist',Helvetica] text-sm font-medium text-[#2a7a78] hover:text-[#1f5c5b]"
            >
              Back to sign in
            </Link>
          </form>
        )}
      </main>
    </div>
  );
}

import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { business } from "../config/business";
import { useAuth } from "../lib/AuthProvider";
import { fieldClassName, primaryButtonClassName } from "../lib/ui";
import { usePageTitle } from "../lib/usePageTitle";

export function ResetPasswordPage(): JSX.Element {
  usePageTitle("Set a new password");
  const { loading, passwordRecovery, session, signOut, updatePassword } = useAuth();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (password.length < 8) {
      toast.error("Use at least 8 characters.");
      return;
    }
    if (password !== confirm) {
      toast.error("Those passwords do not match.");
      return;
    }

    setSubmitting(true);
    const { error } = await updatePassword(password);
    setSubmitting(false);
    if (error) {
      toast.error(error);
      return;
    }

    toast.success("Password updated. Sign in with the new one.");
    await signOut();
    navigate("/login", { replace: true });
  }

  const ready = !loading && (passwordRecovery || Boolean(session));

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
          Set a new password
        </h1>
        <p className="mt-2 [font-family:'Geist',Helvetica] text-sm leading-6 text-slate-600">
          This is the last step after the email link. Then sign in as usual.
        </p>

        {loading ? (
          <p className="mt-8 [font-family:'Geist',Helvetica] text-sm text-slate-600">
            Checking the reset link…
          </p>
        ) : ready ? (
          <form
            onSubmit={handleSubmit}
            className="mt-8 flex flex-col gap-4 rounded-md border border-slate-200 bg-white p-6"
            noValidate
          >
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="new-password"
                className="[font-family:'Geist',Helvetica] text-sm font-semibold text-[#142033]"
              >
                New password
              </label>
              <input
                id="new-password"
                name="password"
                type="password"
                autoComplete="new-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className={fieldClassName}
                required
                minLength={8}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="confirm-password"
                className="[font-family:'Geist',Helvetica] text-sm font-semibold text-[#142033]"
              >
                Confirm password
              </label>
              <input
                id="confirm-password"
                name="confirm"
                type="password"
                autoComplete="new-password"
                value={confirm}
                onChange={(event) => setConfirm(event.target.value)}
                className={fieldClassName}
                required
                minLength={8}
              />
            </div>
            <button
              type="submit"
              disabled={submitting}
              className={primaryButtonClassName}
            >
              {submitting ? "Saving…" : "Save password"}
            </button>
          </form>
        ) : (
          <div className="mt-8 rounded-md border border-slate-200 bg-white p-6">
            <p className="[font-family:'Geist',Helvetica] text-sm leading-6 text-slate-700">
              That reset link is missing or expired. Request a new one from the
              shop login.
            </p>
            <Link to="/forgot-password" className={`mt-6 ${primaryButtonClassName} w-full`}>
              Forgot password
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}

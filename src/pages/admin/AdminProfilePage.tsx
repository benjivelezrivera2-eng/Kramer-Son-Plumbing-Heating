import { Camera } from "lucide-react";
import { FormEvent, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { useAuth } from "../../lib/AuthProvider";
import {
  PHONE_PREFIXES,
  PROFILE_PRESETS,
  presetSrc,
  profileDisplayName,
  profileInitials,
  saveShopProfile,
  signedAvatarUrl,
  uploadAvatar,
  type AvatarKind,
  type ProfileDraft,
} from "../../lib/profile";
import { fieldClassName, primaryButtonClassName } from "../../lib/ui";
import { usePageTitle } from "../../lib/usePageTitle";

export function AdminProfilePage(): JSX.Element {
  usePageTitle("Profile");
  const { user, profile, refreshProfile } = useAuth();
  const fileRef = useRef<HTMLInputElement>(null);
  const [draft, setDraft] = useState<ProfileDraft>(emptyDraft());
  const [preview, setPreview] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!profile) return;
    setDraft({
      first_name: profile.first_name,
      last_name: profile.last_name,
      job_title: profile.job_title,
      phone_prefix: profile.phone_prefix ?? "+1",
      phone: profile.phone,
      after_hours_phone: profile.after_hours_phone,
      license_number: profile.license_number,
      address_line1: profile.address_line1,
      address_line2: profile.address_line2,
      city: profile.city,
      county: profile.county,
      post_code: profile.post_code,
      country: profile.country ?? "United States",
      avatar_path: profile.avatar_path,
      avatar_kind: profile.avatar_kind,
    });
  }, [profile]);

  useEffect(() => {
    let cancelled = false;
    if (draft.avatar_kind === "preset") {
      setPreview(presetSrc(draft.avatar_path));
      return () => {
        cancelled = true;
      };
    }
    if (draft.avatar_kind === "upload" && draft.avatar_path) {
      if (draft.avatar_path.startsWith("blob:")) {
        setPreview(draft.avatar_path);
        return () => {
          cancelled = true;
        };
      }
      void signedAvatarUrl(draft.avatar_path).then((url) => {
        if (!cancelled) setPreview(url);
      });
      return () => {
        cancelled = true;
      };
    }
    setPreview(null);
    return () => {
      cancelled = true;
    };
  }, [draft.avatar_kind, draft.avatar_path]);

  function patch(next: Partial<ProfileDraft>) {
    setDraft((current) => ({ ...current, ...next }));
  }

  async function handleFile(file: File | undefined) {
    if (!file || !user) return;
    const { path, error } = await uploadAvatar(user.id, file);
    if (error || !path) {
      toast.error("Could not upload that picture.");
      return;
    }
    patch({ avatar_kind: "upload", avatar_path: path });
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!user) return;
    setSaving(true);
    const { error } = await saveShopProfile(user.id, draft);
    setSaving(false);
    if (error) {
      toast.error("Could not save the profile.");
      return;
    }
    await refreshProfile();
    toast.success("Profile saved.");
  }

  const name = profileDisplayName(profile, user?.email);
  const initials = profileInitials(
    {
      ...(profile ?? {
        id: 0,
        user_id: user?.id ?? null,
        role: "admin",
        avatar_kind: "default",
        avatar_path: null,
        first_name: draft.first_name,
        last_name: draft.last_name,
        job_title: null,
        phone_prefix: null,
        phone: null,
        after_hours_phone: null,
        license_number: null,
        address_line1: null,
        address_line2: null,
        city: null,
        county: null,
        post_code: null,
        country: null,
      }),
      first_name: draft.first_name,
      last_name: draft.last_name,
    },
    user?.email,
  );

  return (
    <section className="mx-auto w-full max-w-xl">
      <h1 className="[font-family:'Gabarito',Helvetica] text-[32px] font-extrabold text-[#142033]">
        Profile
      </h1>
      <p className="mt-2 [font-family:'Geist',Helvetica] text-sm leading-6 text-slate-600">
        Office identity for dispatch, licenses, and after-hours calls. Homeowners
        do not get a profile.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-6">
        <div className="flex items-center gap-4">
          <div className="relative">
            {preview ? (
              <img
                src={preview}
                alt=""
                className="h-24 w-24 rounded-full border-2 border-[#c9a04a] object-cover"
              />
            ) : (
              <span className="flex h-24 w-24 items-center justify-center rounded-full bg-[#142033] [font-family:'Gabarito',Helvetica] text-2xl font-extrabold text-[#c9a04a]">
                {initials}
              </span>
            )}
            <button
              type="button"
              aria-label="Upload a portrait"
              onClick={() => fileRef.current?.click()}
              className="absolute -bottom-1 -right-1 flex h-9 w-9 items-center justify-center rounded-full bg-[#c9a04a] text-[#142033] shadow"
            >
              <Camera className="h-4 w-4" />
            </button>
            <input
              ref={fileRef}
              type="file"
              accept="image/png,image/jpeg,image/webp"
              className="hidden"
              onChange={(event) => void handleFile(event.target.files?.[0])}
            />
          </div>
          <div>
            <p className="[font-family:'Gabarito',Helvetica] text-lg font-extrabold text-[#142033]">
              {name}
            </p>
            <p className="mt-1 inline-flex rounded-full bg-[#142033] px-2 py-0.5 [font-family:'Geist',Helvetica] text-[10px] font-bold tracking-wide text-[#c9a04a]">
              ADMIN
            </p>
          </div>
        </div>

        <fieldset>
          <legend className="mb-2 [font-family:'Geist',Helvetica] text-xs font-bold tracking-wide text-slate-500">
            PORTRAIT
          </legend>
          <div className="flex flex-wrap gap-2">
            <PresetButton
              selected={draft.avatar_kind === "default"}
              onClick={() => patch({ avatar_kind: "default", avatar_path: null })}
              label="Default"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#142033] text-xs font-bold text-[#c9a04a]">
                {initials}
              </span>
            </PresetButton>
            {PROFILE_PRESETS.map((item) => (
              <PresetButton
                key={item.id}
                selected={
                  draft.avatar_kind === "preset" && draft.avatar_path === item.id
                }
                onClick={() =>
                  patch({ avatar_kind: "preset", avatar_path: item.id })
                }
                label={item.label}
              >
                <img src={item.src} alt="" className="h-12 w-12 rounded-full" />
              </PresetButton>
            ))}
          </div>
        </fieldset>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="First name">
            <input
              className={fieldClassName}
              value={draft.first_name ?? ""}
              onChange={(event) => patch({ first_name: event.target.value })}
            />
          </Field>
          <Field label="Last name">
            <input
              className={fieldClassName}
              value={draft.last_name ?? ""}
              onChange={(event) => patch({ last_name: event.target.value })}
            />
          </Field>
        </div>

        <Field label="Job title">
          <input
            className={fieldClassName}
            placeholder="Owner, office, or technician"
            value={draft.job_title ?? ""}
            onChange={(event) => patch({ job_title: event.target.value })}
          />
        </Field>

        <div className="grid gap-4 sm:grid-cols-[7rem_1fr]">
          <Field label="Prefix">
            <select
              className={fieldClassName}
              value={draft.phone_prefix ?? "+1"}
              onChange={(event) => patch({ phone_prefix: event.target.value })}
            >
              {PHONE_PREFIXES.map((prefix) => (
                <option key={prefix} value={prefix}>
                  {prefix}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Phone number">
            <input
              className={fieldClassName}
              inputMode="tel"
              value={draft.phone ?? ""}
              onChange={(event) => patch({ phone: event.target.value })}
            />
          </Field>
        </div>

        <Field label="After-hours phone">
          <input
            className={fieldClassName}
            inputMode="tel"
            placeholder="For leak and no-heat calls"
            value={draft.after_hours_phone ?? ""}
            onChange={(event) => patch({ after_hours_phone: event.target.value })}
          />
        </Field>

        <Field label="License number">
          <input
            className={fieldClassName}
            placeholder="Colorado plumbing or heating license"
            value={draft.license_number ?? ""}
            onChange={(event) => patch({ license_number: event.target.value })}
          />
        </Field>

        <fieldset className="flex flex-col gap-4">
          <legend className="[font-family:'Geist',Helvetica] text-xs font-bold tracking-wide text-slate-500">
            ADDRESS DETAILS
          </legend>
          <Field label="Address line 1">
            <input
              className={fieldClassName}
              value={draft.address_line1 ?? ""}
              onChange={(event) => patch({ address_line1: event.target.value })}
            />
          </Field>
          <Field label="Address line 2 (optional)">
            <input
              className={fieldClassName}
              value={draft.address_line2 ?? ""}
              onChange={(event) => patch({ address_line2: event.target.value })}
            />
          </Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="City">
              <input
                className={fieldClassName}
                value={draft.city ?? ""}
                onChange={(event) => patch({ city: event.target.value })}
              />
            </Field>
            <Field label="County / State">
              <input
                className={fieldClassName}
                value={draft.county ?? ""}
                onChange={(event) => patch({ county: event.target.value })}
              />
            </Field>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="ZIP">
              <input
                className={fieldClassName}
                value={draft.post_code ?? ""}
                onChange={(event) => patch({ post_code: event.target.value })}
              />
            </Field>
            <Field label="Country">
              <input
                className={fieldClassName}
                value={draft.country ?? ""}
                onChange={(event) => patch({ country: event.target.value })}
              />
            </Field>
          </div>
        </fieldset>

        <Field label="Email address">
          <input
            className={`${fieldClassName} bg-slate-50 text-slate-500`}
            value={user?.email ?? ""}
            readOnly
          />
          <p className="mt-1.5 [font-family:'Geist',Helvetica] text-xs text-slate-500">
            Email cannot be changed currently.
          </p>
        </Field>

        <button type="submit" disabled={saving} className={primaryButtonClassName}>
          {saving ? "Saving…" : "Save changes"}
        </button>
      </form>
    </section>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}): JSX.Element {
  return (
    <label className="block [font-family:'Geist',Helvetica] text-sm font-semibold text-[#142033]">
      {label}
      <div className="mt-1.5">{children}</div>
    </label>
  );
}

function PresetButton({
  selected,
  onClick,
  label,
  children,
}: {
  selected: boolean;
  onClick: () => void;
  label: string;
  children: React.ReactNode;
}): JSX.Element {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "rounded-full p-0.5",
        selected ? "ring-2 ring-[#c9a04a] ring-offset-2" : "",
      ].join(" ")}
      aria-label={label}
      aria-pressed={selected}
    >
      {children}
    </button>
  );
}

function emptyDraft(): ProfileDraft {
  return {
    first_name: "",
    last_name: "",
    job_title: "",
    phone_prefix: "+1",
    phone: "",
    after_hours_phone: "",
    license_number: "",
    address_line1: "",
    address_line2: "",
    city: "",
    county: "",
    post_code: "",
    country: "United States",
    avatar_path: null,
    avatar_kind: "default",
  };
}

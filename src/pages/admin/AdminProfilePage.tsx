import { Camera } from "lucide-react";
import { FormEvent, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Separator } from "../../components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { business } from "../../config/business";
import { useAuth } from "../../lib/AuthProvider";
import {
  PHONE_PREFIXES,
  profileDisplayName,
  profileInitials,
  saveShopProfile,
  signedAvatarUrl,
  uploadAvatar,
  type ProfileDraft,
} from "../../lib/profile";
import { cn } from "../../lib/utils";
import { usePageTitle } from "../../lib/usePageTitle";

const selectClassName = cn(
  "flex h-11 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-[#142033] shadow-sm focus-visible:border-[#2a7a78] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2a7a78]",
);

export function AdminProfilePage(): JSX.Element {
  usePageTitle("Profile");
  const { user, profile, role, refreshProfile } = useAuth();
  const fileRef = useRef<HTMLInputElement>(null);
  const [draft, setDraft] = useState<ProfileDraft>(emptyDraft());
  const [preview, setPreview] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!profile) return;
    setDraft({
      first_name: profile.first_name,
      last_name: profile.last_name,
      phone_prefix: profile.phone_prefix ?? "+1",
      phone_number: profile.phone_number,
      address_line1: profile.address_line1,
      address_line2: profile.address_line2,
      city: profile.city,
      county: profile.county,
      post_code: profile.post_code,
      country: profile.country ?? "United States",
      avatar_url: profile.avatar_url,
    });
  }, [profile]);

  useEffect(() => {
    let cancelled = false;
    if (draft.avatar_url?.startsWith("blob:")) {
      setPreview(draft.avatar_url);
      return () => {
        cancelled = true;
      };
    }
    if (draft.avatar_url) {
      void signedAvatarUrl(draft.avatar_url).then((url) => {
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
  }, [draft.avatar_url]);

  function patch(next: Partial<ProfileDraft>) {
    setDraft((current) => ({ ...current, ...next }));
  }

  async function handleFile(file: File | undefined) {
    if (!file || !user) return;
    const localUrl = URL.createObjectURL(file);
    patch({ avatar_url: localUrl });
    const { path, error } = await uploadAvatar(user.id, file);
    if (error || !path) {
      toast.error("Could not upload that picture.");
      return;
    }
    patch({ avatar_url: path });
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!user) return;
    if (draft.avatar_url?.startsWith("blob:")) {
      toast.error("Wait for the portrait upload to finish.");
      return;
    }
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

  const liveProfile = profile
    ? {
        ...profile,
        first_name: draft.first_name,
        last_name: draft.last_name,
      }
    : null;
  const name = profileDisplayName(liveProfile, user?.email);
  const initials = profileInitials(liveProfile, user?.email);

  return (
    <section className="mx-auto w-full max-w-5xl">
      <div className="space-y-1">
        <h1 className="[font-family:'Gabarito',Helvetica] text-[32px] font-extrabold text-[#142033]">
          Settings
        </h1>
        <p className="[font-family:'Geist',Helvetica] text-sm leading-6 text-slate-600">
          Manage your office profile and account preferences.
        </p>
      </div>

      <Separator className="my-6" />

      <Tabs defaultValue="profile" className="flex flex-col gap-8 lg:flex-row lg:gap-10">
        <aside className="lg:w-52 lg:shrink-0">
          <TabsList className="lg:sticky lg:top-6">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="billing">Billing</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
          </TabsList>
        </aside>

        <div className="min-w-0 flex-1 space-y-6">
          <TabsContent value="profile">
            <form onSubmit={handleSubmit} className="space-y-6">
              <Card className="border-slate-200 bg-white shadow-sm">
                <CardHeader className="flex flex-row items-start justify-between gap-4 space-y-0">
                  <div className="space-y-1.5">
                    <CardTitle className="[font-family:'Gabarito',Helvetica] text-xl font-extrabold text-[#142033]">
                      Profile
                    </CardTitle>
                    <CardDescription className="[font-family:'Geist',Helvetica] text-sm text-slate-600">
                      Office identity for the shop. Homeowners do not get a profile.
                    </CardDescription>
                  </div>
                  <div className="relative shrink-0">
                    {preview ? (
                      <img
                        src={preview}
                        alt=""
                        className="h-20 w-20 rounded-full border-2 border-[#c9a04a] object-cover"
                      />
                    ) : (
                      <span className="flex h-20 w-20 items-center justify-center rounded-full bg-[#142033] [font-family:'Gabarito',Helvetica] text-xl font-extrabold text-[#c9a04a]">
                        {initials}
                      </span>
                    )}
                    <Button
                      type="button"
                      size="icon"
                      aria-label="Upload a portrait"
                      onClick={() => fileRef.current?.click()}
                      className="absolute -bottom-1 -right-1 h-9 w-9 rounded-full bg-[#c9a04a] text-[#142033] shadow hover:bg-[#b8903f]"
                    >
                      <Camera className="h-4 w-4" />
                    </Button>
                    <input
                      ref={fileRef}
                      type="file"
                      accept="image/png,image/jpeg,image/webp"
                      className="hidden"
                      onChange={(event) => void handleFile(event.target.files?.[0])}
                    />
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center gap-3">
                    {preview ? (
                      <img
                        src={preview}
                        alt=""
                        className="h-12 w-12 rounded-full border border-[#c9a04a]/60 object-cover"
                      />
                    ) : (
                      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#142033] text-sm font-bold text-[#c9a04a]">
                        {initials}
                      </span>
                    )}
                    <div className="min-w-0">
                      <p className="truncate [font-family:'Gabarito',Helvetica] text-lg font-extrabold text-[#142033]">
                        {name}
                      </p>
                      <Badge className="mt-1 border-transparent bg-[#142033] text-[#c9a04a] hover:bg-[#142033]">
                        {(role ?? "admin").toUpperCase()}
                      </Badge>
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field id="first_name" label="First name">
                      <Input
                        id="first_name"
                        value={draft.first_name ?? ""}
                        onChange={(event) =>
                          patch({ first_name: event.target.value })
                        }
                      />
                    </Field>
                    <Field id="last_name" label="Last name">
                      <Input
                        id="last_name"
                        value={draft.last_name ?? ""}
                        onChange={(event) =>
                          patch({ last_name: event.target.value })
                        }
                      />
                    </Field>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-[7rem_1fr]">
                    <Field id="phone_prefix" label="Prefix">
                      <select
                        id="phone_prefix"
                        className={selectClassName}
                        value={draft.phone_prefix ?? "+1"}
                        onChange={(event) =>
                          patch({ phone_prefix: event.target.value })
                        }
                      >
                        {PHONE_PREFIXES.map((prefix) => (
                          <option key={prefix} value={prefix}>
                            {prefix}
                          </option>
                        ))}
                      </select>
                    </Field>
                    <Field id="phone_number" label="Phone number">
                      <Input
                        id="phone_number"
                        inputMode="tel"
                        value={draft.phone_number ?? ""}
                        onChange={(event) =>
                          patch({ phone_number: event.target.value })
                        }
                      />
                    </Field>
                  </div>

                  <div className="space-y-4">
                    <p className="[font-family:'Geist',Helvetica] text-xs font-bold tracking-wide text-slate-500">
                      ADDRESS
                    </p>
                    <Field id="address_line1" label="Address line 1">
                      <Input
                        id="address_line1"
                        value={draft.address_line1 ?? ""}
                        onChange={(event) =>
                          patch({ address_line1: event.target.value })
                        }
                      />
                    </Field>
                    <Field id="address_line2" label="Address line 2 (optional)">
                      <Input
                        id="address_line2"
                        value={draft.address_line2 ?? ""}
                        onChange={(event) =>
                          patch({ address_line2: event.target.value })
                        }
                      />
                    </Field>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <Field id="city" label="City">
                        <Input
                          id="city"
                          value={draft.city ?? ""}
                          onChange={(event) =>
                            patch({ city: event.target.value })
                          }
                        />
                      </Field>
                      <Field id="county" label="County / State">
                        <Input
                          id="county"
                          value={draft.county ?? ""}
                          onChange={(event) =>
                            patch({ county: event.target.value })
                          }
                        />
                      </Field>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <Field id="post_code" label="ZIP">
                        <Input
                          id="post_code"
                          value={draft.post_code ?? ""}
                          onChange={(event) =>
                            patch({ post_code: event.target.value })
                          }
                        />
                      </Field>
                      <Field id="country" label="Country">
                        <Input
                          id="country"
                          value={draft.country ?? ""}
                          onChange={(event) =>
                            patch({ country: event.target.value })
                          }
                        />
                      </Field>
                    </div>
                  </div>

                  <Field id="email" label="Email address">
                    <Input
                      id="email"
                      value={user?.email ?? ""}
                      readOnly
                      className="bg-slate-50 text-slate-500"
                    />
                    <p className="mt-1.5 [font-family:'Geist',Helvetica] text-xs text-slate-500">
                      Email cannot be changed currently.
                    </p>
                  </Field>
                </CardContent>
                <CardFooter className="justify-end border-t border-slate-100 pt-6">
                  <Button
                    type="submit"
                    disabled={saving}
                    className="h-11 bg-[#c9a04a] px-5 font-semibold text-[#142033] hover:bg-[#b8903f]"
                  >
                    {saving ? "Saving…" : "Save changes"}
                  </Button>
                </CardFooter>
              </Card>
            </form>
          </TabsContent>

          <TabsContent value="billing">
            <PlaceholderCard
              title="Billing"
              description="Invoices and payment methods will live here later."
            />
          </TabsContent>

          <TabsContent value="notifications">
            <PlaceholderCard
              title="Notifications"
              description="Email and alert preferences for new leads and bookings — coming soon."
            />
          </TabsContent>

          <TabsContent value="security">
            <PlaceholderCard
              title="Security"
              description="Password and session controls will go here. Use Forgot password on the login page for now."
            />
          </TabsContent>

          <TabsContent value="appearance">
            <PlaceholderCard
              title="Appearance"
              description="Theme and display options are not wired yet. The shop stays navy and gold."
            />
          </TabsContent>

          <div className="border-t border-slate-200 pt-4">
            <a
              href={business.phoneHref}
              className="[font-family:'Geist',Helvetica] text-sm font-medium text-[#2a7a78] hover:underline"
            >
              Support — call {business.phoneDisplay}
            </a>
          </div>
        </div>
      </Tabs>
    </section>
  );
}

function Field({
  id,
  label,
  children,
}: {
  id: string;
  label: string;
  children: React.ReactNode;
}): JSX.Element {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id}>{label}</Label>
      {children}
    </div>
  );
}

function PlaceholderCard({
  title,
  description,
}: {
  title: string;
  description: string;
}): JSX.Element {
  return (
    <Card className="border-slate-200 bg-white shadow-sm">
      <CardHeader>
        <CardTitle className="[font-family:'Gabarito',Helvetica] text-xl font-extrabold text-[#142033]">
          {title}
        </CardTitle>
        <CardDescription className="[font-family:'Geist',Helvetica] text-sm text-slate-600">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="[font-family:'Geist',Helvetica] text-sm text-slate-500">
          Placeholder — not available in this demo yet.
        </p>
      </CardContent>
    </Card>
  );
}

function emptyDraft(): ProfileDraft {
  return {
    first_name: "",
    last_name: "",
    phone_prefix: "+1",
    phone_number: "",
    address_line1: "",
    address_line2: "",
    city: "",
    county: "",
    post_code: "",
    country: "United States",
    avatar_url: null,
  };
}

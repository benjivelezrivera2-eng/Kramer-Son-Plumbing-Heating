import { supabase } from "./supabase";
import type { UserRole } from "./AuthProvider";

export type AvatarKind = "default" | "preset" | "upload";

export type ShopProfile = {
  id: number;
  user_id: string | null;
  role: Exclude<UserRole, null>;
  first_name: string | null;
  last_name: string | null;
  job_title: string | null;
  phone_prefix: string | null;
  phone: string | null;
  after_hours_phone: string | null;
  license_number: string | null;
  address_line1: string | null;
  address_line2: string | null;
  city: string | null;
  county: string | null;
  post_code: string | null;
  country: string | null;
  avatar_path: string | null;
  avatar_kind: AvatarKind;
};

export type ProfileDraft = Omit<ShopProfile, "id" | "user_id" | "role">;

export const PROFILE_PRESETS = [
  { id: "navy", src: "/profile-presets/navy.svg", label: "Navy" },
  { id: "gold", src: "/profile-presets/gold.svg", label: "Gold" },
  { id: "teal", src: "/profile-presets/teal.svg", label: "Teal" },
  { id: "field", src: "/profile-presets/field.svg", label: "Field" },
] as const;

export const PHONE_PREFIXES = ["+1"];

const PROFILE_COLUMNS =
  "id, user_id, role, first_name, last_name, job_title, phone_prefix, phone, after_hours_phone, license_number, address_line1, address_line2, city, county, post_code, country, avatar_path, avatar_kind";

function asKind(value: string | null | undefined): AvatarKind {
  if (value === "preset" || value === "upload") return value;
  return "default";
}

function asProfile(row: Record<string, unknown>): ShopProfile | null {
  const role = row.role;
  if (role !== "admin" && role !== "user" && role !== "client") return null;
  return {
    id: Number(row.id),
    user_id: (row.user_id as string | null) ?? null,
    role,
    first_name: (row.first_name as string | null) ?? null,
    last_name: (row.last_name as string | null) ?? null,
    job_title: (row.job_title as string | null) ?? null,
    phone_prefix: (row.phone_prefix as string | null) ?? "+1",
    phone: (row.phone as string | null) ?? null,
    after_hours_phone: (row.after_hours_phone as string | null) ?? null,
    license_number: (row.license_number as string | null) ?? null,
    address_line1: (row.address_line1 as string | null) ?? null,
    address_line2: (row.address_line2 as string | null) ?? null,
    city: (row.city as string | null) ?? null,
    county: (row.county as string | null) ?? null,
    post_code: (row.post_code as string | null) ?? null,
    country: (row.country as string | null) ?? null,
    avatar_path: (row.avatar_path as string | null) ?? null,
    avatar_kind: asKind(row.avatar_kind as string | null),
  };
}

export async function fetchShopProfile(userId: string): Promise<ShopProfile | null> {
  const { data, error } = await supabase
    .from("profile")
    .select(PROFILE_COLUMNS)
    .eq("user_id", userId)
    .maybeSingle();
  if (error || !data) return null;
  return asProfile(data as Record<string, unknown>);
}

export function profileDisplayName(
  profile: ShopProfile | null,
  email: string | null | undefined,
): string {
  const name = [profile?.first_name, profile?.last_name]
    .filter(Boolean)
    .join(" ")
    .trim();
  if (name) return name;
  const local = email?.split("@")[0]?.replace(/[._+]/g, " ");
  return local?.trim() || "Office";
}

export function profileInitials(
  profile: ShopProfile | null,
  email: string | null | undefined,
): string {
  const first = profile?.first_name?.trim()?.[0];
  const last = profile?.last_name?.trim()?.[0];
  if (first && last) return `${first}${last}`.toUpperCase();
  if (first) return first.toUpperCase();
  const local = email?.split("@")[0] ?? "O";
  return local.slice(0, 2).toUpperCase();
}

export function presetSrc(path: string | null): string | null {
  if (!path) return null;
  const match = PROFILE_PRESETS.find((item) => item.id === path);
  return match?.src ?? null;
}

export async function signedAvatarUrl(path: string | null): Promise<string | null> {
  if (!path) return null;
  const { data, error } = await supabase.storage
    .from("avatars")
    .createSignedUrl(path, 60 * 60);
  if (error || !data?.signedUrl) return null;
  return data.signedUrl;
}

export async function saveShopProfile(
  userId: string,
  draft: ProfileDraft,
): Promise<{ error: string | null }> {
  const { error } = await supabase
    .from("profile")
    .update({
      first_name: emptyToNull(draft.first_name),
      last_name: emptyToNull(draft.last_name),
      job_title: emptyToNull(draft.job_title),
      phone_prefix: draft.phone_prefix || "+1",
      phone: emptyToNull(draft.phone),
      after_hours_phone: emptyToNull(draft.after_hours_phone),
      license_number: emptyToNull(draft.license_number),
      address_line1: emptyToNull(draft.address_line1),
      address_line2: emptyToNull(draft.address_line2),
      city: emptyToNull(draft.city),
      county: emptyToNull(draft.county),
      post_code: emptyToNull(draft.post_code),
      country: emptyToNull(draft.country),
      avatar_path: draft.avatar_path,
      avatar_kind: draft.avatar_kind,
    })
    .eq("user_id", userId);
  return { error: error?.message ?? null };
}

export async function uploadAvatar(
  userId: string,
  file: File,
): Promise<{ path: string | null; error: string | null }> {
  const safeName = file.name.replace(/[^\w.-]+/g, "-").toLowerCase();
  const path = `${userId}/${Date.now()}-${safeName}`;
  const { error } = await supabase.storage.from("avatars").upload(path, file, {
    upsert: true,
    contentType: file.type || "image/png",
  });
  if (error) return { path: null, error: error.message };
  return { path, error: null };
}

function emptyToNull(value: string | null | undefined): string | null {
  const trimmed = value?.trim() ?? "";
  return trimmed.length ? trimmed : null;
}

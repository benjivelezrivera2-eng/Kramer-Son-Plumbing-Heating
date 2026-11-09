import { supabase } from "./supabase";
import type { UserRole } from "./AuthProvider";

export type ShopProfile = {
  id: string;
  role: Exclude<UserRole, null>;
  full_name: string | null;
  first_name: string | null;
  last_name: string | null;
  phone_prefix: string | null;
  phone_number: string | null;
  address_line1: string | null;
  address_line2: string | null;
  city: string | null;
  county: string | null;
  post_code: string | null;
  country: string | null;
  avatar_url: string | null;
  created_at: string | null;
};

export type ProfileDraft = {
  first_name: string | null;
  last_name: string | null;
  phone_prefix: string | null;
  phone_number: string | null;
  address_line1: string | null;
  address_line2: string | null;
  city: string | null;
  county: string | null;
  post_code: string | null;
  country: string | null;
  avatar_url: string | null;
};

export const PHONE_PREFIXES = ["+1"];

const PROFILE_COLUMNS =
  "id, role, full_name, first_name, last_name, phone_prefix, phone_number, address_line1, address_line2, city, county, post_code, country, avatar_url, created_at";

function asProfile(row: Record<string, unknown>): ShopProfile | null {
  const role = row.role;
  if (role !== "admin" && role !== "user" && role !== "client") return null;
  return {
    id: String(row.id),
    role,
    full_name: (row.full_name as string | null) ?? null,
    first_name: (row.first_name as string | null) ?? null,
    last_name: (row.last_name as string | null) ?? null,
    phone_prefix: (row.phone_prefix as string | null) ?? "+1",
    phone_number: (row.phone_number as string | null) ?? null,
    address_line1: (row.address_line1 as string | null) ?? null,
    address_line2: (row.address_line2 as string | null) ?? null,
    city: (row.city as string | null) ?? null,
    county: (row.county as string | null) ?? null,
    post_code: (row.post_code as string | null) ?? null,
    country: (row.country as string | null) ?? null,
    avatar_url: (row.avatar_url as string | null) ?? null,
    created_at: (row.created_at as string | null) ?? null,
  };
}

export async function fetchShopProfile(
  userId: string,
): Promise<ShopProfile | null> {
  const { data, error } = await supabase
    .from("profiles")
    .select(PROFILE_COLUMNS)
    .eq("id", userId)
    .maybeSingle();
  if (error || !data) return null;
  return asProfile(data as Record<string, unknown>);
}

export function profileDisplayName(
  profile: ShopProfile | null,
  email: string | null | undefined,
): string {
  const composed = [profile?.first_name, profile?.last_name]
    .filter(Boolean)
    .join(" ")
    .trim();
  if (composed) return composed;
  if (profile?.full_name?.trim()) return profile.full_name.trim();
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
  const fromFull = profile?.full_name?.trim()?.[0];
  if (fromFull) return fromFull.toUpperCase();
  const local = email?.split("@")[0] ?? "O";
  return local.slice(0, 2).toUpperCase();
}

export async function signedAvatarUrl(
  path: string | null,
): Promise<string | null> {
  if (!path) return null;
  if (path.startsWith("blob:") || path.startsWith("http")) return path;
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
  const first = emptyToNull(draft.first_name);
  const last = emptyToNull(draft.last_name);
  const fullName = [first, last].filter(Boolean).join(" ") || null;

  const { error } = await supabase
    .from("profiles")
    .update({
      first_name: first,
      last_name: last,
      full_name: fullName,
      phone_prefix: draft.phone_prefix || "+1",
      phone_number: emptyToNull(draft.phone_number),
      address_line1: emptyToNull(draft.address_line1),
      address_line2: emptyToNull(draft.address_line2),
      city: emptyToNull(draft.city),
      county: emptyToNull(draft.county),
      post_code: emptyToNull(draft.post_code),
      country: emptyToNull(draft.country),
      avatar_url: draft.avatar_url,
    })
    .eq("id", userId);
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

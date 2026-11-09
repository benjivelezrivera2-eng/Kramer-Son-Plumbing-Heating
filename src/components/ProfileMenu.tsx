import { ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../lib/AuthProvider";
import {
  profileDisplayName,
  profileInitials,
  signedAvatarUrl,
} from "../lib/profile";

type ProfileMenuProps = {
  tone: "dark" | "light";
  /** Sidebar uses `up`; header uses `down`. */
  placement?: "up" | "down";
  onNavigate?: () => void;
};

export function ProfileMenu({
  tone,
  placement = "up",
  onNavigate,
}: ProfileMenuProps): JSX.Element {
  const { user, profile, signOut } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const name = profileDisplayName(profile, user?.email);
  const initials = profileInitials(profile, user?.email);

  useEffect(() => {
    let cancelled = false;
    if (profile?.avatar_url) {
      void signedAvatarUrl(profile.avatar_url).then((url) => {
        if (!cancelled) setAvatarUrl(url);
      });
      return () => {
        cancelled = true;
      };
    }
    setAvatarUrl(null);
    return () => {
      cancelled = true;
    };
  }, [profile?.avatar_url]);

  useEffect(() => {
    function handlePointer(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    }
    function handleKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", handlePointer);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handlePointer);
      document.removeEventListener("keydown", handleKey);
    };
  }, []);

  const dark = tone === "dark";
  const buttonClass = dark
    ? "flex w-full items-center gap-2 rounded-md px-1 py-1.5 text-left hover:bg-white/5"
    : "flex w-full items-center gap-2 rounded-md px-1 py-1.5 text-left hover:bg-slate-50";
  const nameClass = dark
    ? "truncate [font-family:'Geist',Helvetica] text-sm font-semibold text-white"
    : "truncate [font-family:'Geist',Helvetica] text-sm font-semibold text-[#142033]";
  const emailClass = dark
    ? "truncate [font-family:'Geist',Helvetica] text-xs text-slate-400"
    : "truncate [font-family:'Geist',Helvetica] text-xs text-slate-500";
  const chevronClass = dark ? "h-4 w-4 shrink-0 text-slate-400" : "h-4 w-4 shrink-0 text-slate-500";
  const menuPosition =
    placement === "down"
      ? "absolute left-0 right-0 top-full z-20 mt-2"
      : "absolute bottom-full left-0 right-0 z-20 mb-2";
  const menuClass = dark
    ? `${menuPosition} overflow-hidden rounded-md border border-white/10 bg-[#142033] shadow-lg`
    : `${menuPosition} overflow-hidden rounded-md border border-slate-200 bg-white shadow-lg`;
  const dividerClass = dark ? "border-b border-white/10 px-3 py-3" : "border-b border-slate-100 px-3 py-3";
  const itemClass = dark
    ? "flex h-11 items-center px-3 [font-family:'Geist',Helvetica] text-sm font-medium text-slate-200 hover:bg-white/5"
    : "flex h-11 items-center px-3 [font-family:'Geist',Helvetica] text-sm font-medium text-[#142033] hover:bg-slate-50";
  const triggerLabel =
    profile?.role === "admin" ? `${name} · Admin` : name;

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        className={buttonClass}
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        <AvatarMark src={avatarUrl} initials={initials} />
        <span className={`min-w-0 flex-1 ${nameClass}`}>{triggerLabel}</span>
        <ChevronDown
          className={`${chevronClass} transition-transform ${open ? "rotate-180" : ""}`}
          aria-hidden
        />
      </button>
      {open && (
        <div className={menuClass} role="menu">
          <div className={dividerClass}>
            <p className={nameClass}>{name}</p>
            <p className={`mt-0.5 ${emailClass}`}>{user?.email}</p>
            {profile?.role === "admin" && (
              <p className="mt-2 inline-flex rounded-full bg-[#c9a04a]/20 px-2 py-0.5 [font-family:'Geist',Helvetica] text-[10px] font-bold tracking-wide text-[#c9a04a]">
                ADMIN
              </p>
            )}
          </div>
          <Link
            to="/admin/profile"
            role="menuitem"
            className={itemClass}
            onClick={() => {
              setOpen(false);
              onNavigate?.();
            }}
          >
            Profile
          </Link>
          <Link
            to="/admin/profile"
            role="menuitem"
            className={itemClass}
            onClick={() => {
              setOpen(false);
              onNavigate?.();
            }}
          >
            Settings
          </Link>
          <button
            type="button"
            role="menuitem"
            className={`${itemClass} w-full text-left ${
              dark ? "text-red-300 hover:bg-white/5" : "text-red-600 hover:bg-red-50"
            }`}
            onClick={() => {
              setOpen(false);
              onNavigate?.();
              void signOut().then(() => {
                navigate("/login", { replace: true });
              });
            }}
          >
            Sign out
          </button>
        </div>
      )}
    </div>
  );
}

function AvatarMark({
  src,
  initials,
}: {
  src: string | null;
  initials: string;
}): JSX.Element {
  if (src) {
    return (
      <img
        src={src}
        alt=""
        className="h-10 w-10 shrink-0 rounded-full border border-[#c9a04a]/60 object-cover"
      />
    );
  }
  return (
    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#c9a04a] [font-family:'Gabarito',Helvetica] text-sm font-extrabold text-[#142033]">
      {initials}
    </span>
  );
}

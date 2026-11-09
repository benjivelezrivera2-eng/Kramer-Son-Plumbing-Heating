import { Bell } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { MockNotification } from "../../lib/adminMock";

type NotificationBellProps = {
  items: MockNotification[];
  onMarkRead: (id: string) => void;
  onMarkAllRead: () => void;
};

export function NotificationBell({
  items,
  onMarkRead,
  onMarkAllRead,
}: NotificationBellProps): JSX.Element {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const unread = items.filter((item) => item.unread).length;

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

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        className="relative flex h-11 w-11 items-center justify-center rounded-md border border-slate-200 text-[#142033] hover:bg-slate-50"
        aria-label={unread > 0 ? `Notifications, ${unread} unread` : "Notifications"}
        aria-expanded={open}
        aria-haspopup="dialog"
        onClick={() => setOpen((value) => !value)}
      >
        <Bell className="h-5 w-5" />
        {unread > 0 && (
          <span className="absolute right-1.5 top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#c9a04a] px-1 [font-family:'Geist',Helvetica] text-[10px] font-bold text-[#142033]">
            {unread}
          </span>
        )}
      </button>
      {open && (
        <div
          role="dialog"
          aria-label="Notifications"
          className="absolute right-0 z-30 mt-2 w-[min(22rem,calc(100vw-2rem))] overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg"
        >
          <div className="flex items-center justify-between gap-3 border-b border-slate-100 px-4 py-3">
            <div>
              <p className="[font-family:'Gabarito',Helvetica] text-sm font-extrabold text-[#142033]">
                Notifications
              </p>
              <p className="[font-family:'Geist',Helvetica] text-xs text-slate-500">
                Sample feed for a later form alert.
              </p>
            </div>
            <button
              type="button"
              className="[font-family:'Geist',Helvetica] text-xs font-semibold text-[#2a7a78]"
              onClick={onMarkAllRead}
            >
              Mark all read
            </button>
          </div>
          <ul className="max-h-80 overflow-y-auto">
            {items.map((item) => (
              <li key={item.id}>
                <button
                  type="button"
                  className="flex w-full gap-3 px-4 py-3 text-left hover:bg-slate-50"
                  onClick={() => onMarkRead(item.id)}
                >
                  <span
                    className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${
                      item.unread ? "bg-[#c9a04a]" : "bg-slate-200"
                    }`}
                    aria-hidden
                  />
                  <span className="min-w-0">
                    <span className="flex items-baseline justify-between gap-3">
                      <span className="[font-family:'Geist',Helvetica] text-sm font-semibold text-[#142033]">
                        {item.title}
                      </span>
                      <span className="shrink-0 [font-family:'Geist',Helvetica] text-xs text-slate-500">
                        {item.at}
                      </span>
                    </span>
                    <span className="mt-1 block [font-family:'Geist',Helvetica] text-sm leading-5 text-slate-600">
                      {item.body}
                    </span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

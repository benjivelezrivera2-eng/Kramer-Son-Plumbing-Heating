import { Bell } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { MockNotification } from "../../lib/adminMock";

type NotificationBellProps = {
  items: MockNotification[];
  onMarkRead: (id: string) => void;
};

export function NotificationBell({ items, onMarkRead }: NotificationBellProps): JSX.Element {
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
        className="flex h-11 w-11 items-center justify-center rounded-md text-[#142033] hover:bg-slate-50"
        aria-label={unread > 0 ? `Notifications, ${unread} unread` : "Notifications"}
        aria-expanded={open}
        aria-haspopup="dialog"
        onClick={() => setOpen((value) => !value)}
      >
        <Bell className="h-5 w-5" />
      </button>
      {open && (
        <div
          role="dialog"
          aria-label="Notifications"
          className="absolute right-0 z-30 mt-2 w-80 overflow-hidden rounded-md border border-slate-200 bg-white shadow-lg"
        >
          <p className="border-b border-slate-100 px-4 py-3 [font-family:'Geist',Helvetica] text-sm font-semibold text-[#142033]">
            Notifications
          </p>
          <ul className="max-h-80 overflow-y-auto">
            {items.map((item) => (
              <li key={item.id} className="border-b border-slate-100">
                <button
                  type="button"
                  className="w-full px-4 py-3 text-left hover:bg-slate-50"
                  onClick={() => onMarkRead(item.id)}
                >
                  <span
                    className={`block [font-family:'Geist',Helvetica] text-sm font-semibold ${
                      item.unread ? "text-[#142033]" : "text-slate-400"
                    }`}
                  >
                    {item.title}
                  </span>
                  <span
                    className={`mt-1 block [font-family:'Geist',Helvetica] text-sm leading-5 ${
                      item.unread ? "text-slate-600" : "text-slate-400"
                    }`}
                  >
                    {item.body}
                  </span>
                  <span className="mt-1 block [font-family:'Geist',Helvetica] text-xs text-slate-400">
                    {item.at}
                  </span>
                </button>
              </li>
            ))}
          </ul>
          <button
            type="button"
            className="w-full bg-slate-50 px-4 py-2.5 text-center [font-family:'Geist',Helvetica] text-sm text-slate-600 hover:bg-slate-100"
            onClick={() => setOpen(false)}
          >
            View all activity
          </button>
        </div>
      )}
    </div>
  );
}

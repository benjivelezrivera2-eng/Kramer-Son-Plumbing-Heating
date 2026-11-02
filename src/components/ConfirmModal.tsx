import type { ReactNode } from "react";

export function ConfirmModal({
  title,
  children,
  confirmLabel = "Confirm",
  cancelLabel = "Keep it",
  danger = false,
  onConfirm,
  onCancel,
}: {
  title: string;
  children: ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  danger?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}): JSX.Element {
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-[#142033]/50 p-4 sm:items-center">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirm-title"
        className="w-full max-w-md rounded-md border border-slate-200 bg-white p-6"
      >
        <h2
          id="confirm-title"
          className="[font-family:'Gabarito',Helvetica] text-xl font-bold text-[#142033]"
        >
          {title}
        </h2>
        <div className="mt-3 [font-family:'Geist',Helvetica] text-sm leading-6 text-slate-600">
          {children}
        </div>
        <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onCancel}
            className="h-11 rounded-md border border-slate-300 px-4 text-sm font-semibold text-[#142033] hover:bg-slate-50"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className={
              danger
                ? "h-11 rounded-md bg-red-600 px-4 text-sm font-semibold text-white hover:bg-red-700"
                : "h-11 rounded-md bg-[#c9a04a] px-4 text-sm font-semibold text-[#142033] hover:bg-[#b8903f]"
            }
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

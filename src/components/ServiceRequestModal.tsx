import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

type ServiceRequestContextValue = {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
};

const ServiceRequestContext = createContext<ServiceRequestContextValue | null>(
  null,
);

export function ServiceRequestProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = useCallback(() => setIsOpen(true), []);
  const closeModal = useCallback(() => setIsOpen(false), []);

  return (
    <ServiceRequestContext.Provider value={{ isOpen, openModal, closeModal }}>
      {children}
      <ServiceRequestModal isOpen={isOpen} onClose={closeModal} />
    </ServiceRequestContext.Provider>
  );
}

export function useServiceRequest() {
  const ctx = useContext(ServiceRequestContext);
  if (!ctx) {
    throw new Error("useServiceRequest must be used within ServiceRequestProvider");
  }
  return ctx;
}

type FormState = {
  name: string;
  phone: string;
  city: string;
  description: string;
};

const initialForm: FormState = {
  name: "",
  phone: "",
  city: "",
  description: "",
};

const fieldClassName =
  "rounded-lg border border-slate-300 px-3 text-sm outline-none focus-visible:border-[#1f7777] focus-visible:ring-2 focus-visible:ring-[#1f7777]";

function getFocusable(container: HTMLElement): HTMLElement[] {
  return Array.from(
    container.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])',
    ),
  ).filter((el) => !el.hasAttribute("disabled") && el.tabIndex !== -1);
}

function ServiceRequestModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [form, setForm] = useState<FormState>(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});
  const firstFieldRef = useRef<HTMLInputElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);
  const wasOpen = useRef(false);
  const closeTimer = useRef<number | null>(null);

  const clearCloseTimer = () => {
    if (closeTimer.current !== null) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  const handleClose = useCallback(() => {
    clearCloseTimer();
    setSubmitted(false);
    setErrors({});
    setForm(initialForm);
    onClose();
  }, [onClose]);

  useEffect(() => {
    return () => clearCloseTimer();
  }, []);

  useEffect(() => {
    if (isOpen) {
      previouslyFocused.current =
        document.activeElement instanceof HTMLElement
          ? document.activeElement
          : null;
      wasOpen.current = true;
      const isPhone = window.matchMedia("(max-width: 767px)").matches;
      const timer = window.setTimeout(() => {
        if (isPhone) {
          dialogRef.current?.focus();
        } else {
          firstFieldRef.current?.focus();
        }
      }, 0);
      return () => window.clearTimeout(timer);
    }

    if (wasOpen.current) {
      wasOpen.current = false;
      previouslyFocused.current?.focus({ preventScroll: true });
      previouslyFocused.current = null;
    }
  }, [isOpen]);

  useEffect(() => {
    if (submitted) dialogRef.current?.focus();
  }, [submitted]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape") {
      event.preventDefault();
      handleClose();
      return;
    }
    if (event.key !== "Tab" || !dialogRef.current) return;

    const focusable = getFocusable(dialogRef.current);
    if (focusable.length === 0) {
      event.preventDefault();
      dialogRef.current.focus();
      return;
    }

    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    const active = document.activeElement;

    if (event.shiftKey && (active === first || active === dialogRef.current)) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && active === last) {
      event.preventDefault();
      first.focus();
    }
  };

  if (!isOpen) return null;

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const newErrors: { name?: string; phone?: string } = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.phone.trim()) newErrors.phone = "Phone is required";
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setSubmitted(true);
    setForm(initialForm);
    clearCloseTimer();
    closeTimer.current = window.setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 3000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto overscroll-contain bg-black/50 p-4"
      onClick={handleClose}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="service-request-title"
        tabIndex={-1}
        onClick={(event) => event.stopPropagation()}
        onKeyDown={handleKeyDown}
        className="my-8 w-full max-w-md overscroll-contain rounded-2xl bg-white p-4 shadow-xl outline-none sm:p-8"
      >
        <div className="mb-6 flex items-center justify-between gap-4">
          <h2
            id="service-request-title"
            className="[font-family:'Gabarito',Helvetica] text-xl font-extrabold text-[#1b2a4a] sm:text-2xl"
          >
            Request Service
          </h2>
          <button
            type="button"
            onClick={handleClose}
            aria-label="Close form"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1b2a4a]"
          >
            <span className="text-2xl leading-none">&times;</span>
          </button>
        </div>

        <p
          aria-live="polite"
          className={
            submitted
              ? "[font-family:'Geist',Helvetica] text-sm font-medium leading-6 text-[#1f7777]"
              : "sr-only"
          }
        >
          {submitted ? "Demo only. Nothing was sent." : ""}
        </p>

        {!submitted && (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="sr-name"
                className="[font-family:'Geist',Helvetica] text-sm font-semibold text-[#1b2a4a]"
              >
                Name <span className="text-red-500">*</span>
              </label>
              <input
                id="sr-name"
                ref={firstFieldRef}
                name="name"
                type="text"
                autoComplete="name"
                value={form.name}
                onChange={(event) => setForm({ ...form, name: event.target.value })}
                className={`h-11 ${fieldClassName}`}
                placeholder="Your name"
              />
              {errors.name && (
                <span className="text-xs text-red-500">{errors.name}</span>
              )}
            </div>
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="sr-phone"
                className="[font-family:'Geist',Helvetica] text-sm font-semibold text-[#1b2a4a]"
              >
                Phone <span className="text-red-500">*</span>
              </label>
              <input
                id="sr-phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                value={form.phone}
                onChange={(event) => setForm({ ...form, phone: event.target.value })}
                className={`h-11 ${fieldClassName}`}
                placeholder="(970) 555-0142"
              />
              {errors.phone && (
                <span className="text-xs text-red-500">{errors.phone}</span>
              )}
            </div>
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="sr-city"
                className="[font-family:'Geist',Helvetica] text-sm font-semibold text-[#1b2a4a]"
              >
                City
              </label>
              <input
                id="sr-city"
                name="city"
                type="text"
                autoComplete="address-level2"
                value={form.city}
                onChange={(event) => setForm({ ...form, city: event.target.value })}
                className={`h-11 ${fieldClassName}`}
                placeholder="Sterling, Fort Morgan, Brush, Greeley"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="sr-desc"
                className="[font-family:'Geist',Helvetica] text-sm font-semibold text-[#1b2a4a]"
              >
                Problem Description
              </label>
              <textarea
                id="sr-desc"
                name="description"
                autoComplete="off"
                value={form.description}
                onChange={(event) =>
                  setForm({ ...form, description: event.target.value })
                }
                rows={3}
                className={`min-h-[80px] py-2 ${fieldClassName}`}
                placeholder="Describe the issue"
              />
            </div>
            <button
              type="submit"
              className="mt-2 h-11 rounded-lg bg-[#d4a843] px-6 text-sm font-bold text-[#1b2a4a] transition-colors hover:bg-[#c49a3b] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1b2a4a] focus-visible:ring-offset-2"
            >
              Submit Request
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

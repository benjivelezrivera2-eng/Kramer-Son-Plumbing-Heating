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
      <ServiceRequestModal
        isOpen={isOpen}
        onClose={closeModal}
      />
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

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => firstFieldRef.current?.focus(), 50);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { name?: string; phone?: string } = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.phone.trim()) newErrors.phone = "Phone is required";
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setSubmitted(true);
    setForm(initialForm);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 3000);
  };

  const handleClose = () => {
    setSubmitted(false);
    setErrors({});
    setForm(initialForm);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/50 p-4"
      onClick={handleClose}
    >
      <div
        className="my-8 w-full max-w-md rounded-2xl bg-white p-4 shadow-xl sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-6 flex items-center justify-between gap-4">
          <h2 className="[font-family:'Gabarito',Helvetica] text-xl font-extrabold text-[#1b2a4a] sm:text-2xl">
            Request Service
          </h2>
          <button
            type="button"
            onClick={handleClose}
            aria-label="Close form"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-700"
          >
            <span className="text-2xl leading-none">&times;</span>
          </button>
        </div>

        {submitted ? (
          <p className="[font-family:'Geist',Helvetica] text-sm font-medium leading-6 text-[#2a8b8b]">
            Demo only. Nothing was sent.
          </p>
        ) : (
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
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="h-11 rounded-lg border border-slate-300 px-3 text-sm outline-none focus:border-[#2a8b8b] focus:ring-1 focus:ring-[#2a8b8b]"
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
                type="tel"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="h-11 rounded-lg border border-slate-300 px-3 text-sm outline-none focus:border-[#2a8b8b] focus:ring-1 focus:ring-[#2a8b8b]"
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
                type="text"
                value={form.city}
                onChange={(e) => setForm({ ...form, city: e.target.value })}
                className="h-11 rounded-lg border border-slate-300 px-3 text-sm outline-none focus:border-[#2a8b8b] focus:ring-1 focus:ring-[#2a8b8b]"
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
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                rows={3}
                className="min-h-[80px] rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-[#2a8b8b] focus:ring-1 focus:ring-[#2a8b8b]"
                placeholder="Describe the issue"
              />
            </div>
            <button
              type="submit"
              className="mt-2 h-11 rounded-lg bg-[#d4a843] px-6 text-sm font-bold text-[#1b2a4a] transition-colors hover:bg-[#c49a3b]"
            >
              Submit Request
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

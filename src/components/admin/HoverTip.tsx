import { Info } from "lucide-react";

export const hoverLiftClass =
  "group/hover relative z-0 border border-slate-200 bg-white transition duration-200 hover:z-20 hover:-translate-y-0.5 hover:border-[#2a7a78] hover:shadow-[0_10px_24px_rgba(20,32,51,0.12)]";

export function HoverMark(): JSX.Element {
  return (
    <Info
      className="h-3.5 w-3.5 shrink-0 text-slate-400 transition group-hover/hover:text-[#2a7a78]"
      aria-hidden
    />
  );
}

export function HoverTip({ text }: { text: string }): JSX.Element {
  return (
    <p
      role="tooltip"
      className="pointer-events-none invisible absolute bottom-full left-3 z-20 mb-2 w-max max-w-[13rem] rounded-md bg-[#142033] px-2.5 py-1.5 [font-family:'Geist',Helvetica] text-xs leading-4 text-white opacity-0 shadow-lg transition group-hover/hover:visible group-hover/hover:opacity-100"
    >
      {text}
      <span aria-hidden className="absolute -bottom-1 left-3 h-2 w-2 rotate-45 bg-[#142033]" />
    </p>
  );
}

export function visitStatusTip(status: string): string {
  switch (status) {
    case "Requested":
      return "Website request. Not confirmed yet.";
    case "Confirmed":
      return "Confirmed, so it counts toward revenue.";
    case "Pending":
      return "The office marked this visit pending.";
    case "Done":
      return "Finished. Not an active job.";
    case "Cancelled":
      return "Cancelled. Not counted as revenue.";
    default:
      return status;
  }
}

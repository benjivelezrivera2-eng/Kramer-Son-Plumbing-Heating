import { useEffect, useState } from "react";

export function useMockReady(delayMs = 700): boolean {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const timer = window.setTimeout(() => setReady(true), delayMs);
    return () => window.clearTimeout(timer);
  }, [delayMs]);
  return ready;
}

export function SampleNote(): JSX.Element {
  return (
    <p className="[font-family:'Geist',Helvetica] text-xs font-medium tracking-wide text-[#8a6a2f]">
      Sample data. Nothing here is saved.
    </p>
  );
}

export function SkeletonBlock({ className = "" }: { className?: string }): JSX.Element {
  return <div className={`animate-pulse rounded-xl bg-slate-200/80 ${className}`} aria-hidden />;
}

export function SkeletonRows({ count = 4 }: { count?: number }): JSX.Element {
  return (
    <div className="space-y-3" aria-hidden>
      {Array.from({ length: count }, (_, index) => (
        <SkeletonBlock key={index} className="h-16" />
      ))}
    </div>
  );
}

export function NoMatches({ query }: { query: string }): JSX.Element {
  return (
    <p className="rounded-xl border border-dashed border-slate-300 bg-white px-4 py-8 text-center [font-family:'Geist',Helvetica] text-sm text-slate-600">
      No sample records match “{query.trim()}”.
    </p>
  );
}

export function PageHeading({
  title,
  body,
}: {
  title: string;
  body: string;
}): JSX.Element {
  return (
    <div className="flex flex-wrap items-end justify-between gap-3">
      <div>
        <h1 className="[font-family:'Gabarito',Helvetica] text-3xl font-extrabold text-[#142033]">
          {title}
        </h1>
        <p className="mt-2 max-w-2xl [font-family:'Geist',Helvetica] text-sm leading-6 text-slate-600">
          {body}
        </p>
      </div>
      <SampleNote />
    </div>
  );
}

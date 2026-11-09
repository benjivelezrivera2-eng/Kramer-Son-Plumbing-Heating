import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { NoMatches, PageHeading, SkeletonRows, useMockReady } from "../../components/admin/MockBits";
import { matchesQuery, mockServices, type OfficeContext } from "../../lib/adminMock";
import { usePageTitle } from "../../lib/usePageTitle";

const groups = ["All", "Plumbing", "Heating"] as const;

export function MockServicesPage(): JSX.Element {
  usePageTitle("Services");
  const { query } = useOutletContext<OfficeContext>();
  const ready = useMockReady();
  const [group, setGroup] = useState<(typeof groups)[number]>("All");
  const rows = mockServices.filter((row) => {
    const inGroup = group === "All" || row.category === group;
    return (
      inGroup &&
      matchesQuery(query, row.name, row.category, row.summary, row.startingPrice?.toString())
    );
  });

  return (
    <section aria-busy={!ready}>
      <PageHeading
        title="Services"
        body="Plumbing and Heating, as a sample. Starting prices are for the office only and do not appear on the public website."
      />
      <div className="mt-6 flex flex-wrap gap-2">
        {groups.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setGroup(item)}
            className={`h-9 rounded-full px-3 [font-family:'Geist',Helvetica] text-sm font-semibold ${
              group === item ? "bg-[#142033] text-white" : "border border-slate-200 bg-white text-[#142033]"
            }`}
          >
            {item}
          </button>
        ))}
      </div>
      <div className="mt-4">
        {!ready ? (
          <SkeletonRows count={5} />
        ) : rows.length === 0 ? (
          <NoMatches query={query || group} />
        ) : (
          <ul className="grid gap-3 md:grid-cols-2">
            {rows.map((row) => (
              <li key={row.id} className="rounded-xl border border-slate-200 bg-white p-5">
                <p className="[font-family:'Geist',Helvetica] text-xs font-semibold tracking-wide text-[#2a7a78]">
                  {row.category}
                </p>
                <div className="mt-1 flex items-baseline justify-between gap-3">
                  <h2 className="[font-family:'Gabarito',Helvetica] text-lg font-extrabold text-[#142033]">
                    {row.name}
                  </h2>
                  {row.startingPrice != null ? (
                    <p className="shrink-0 [font-family:'Geist',Helvetica] text-sm font-semibold text-[#142033]">
                      ${row.startingPrice}
                    </p>
                  ) : null}
                </div>
                <p className="mt-2 [font-family:'Geist',Helvetica] text-sm leading-6 text-slate-600">{row.summary}</p>
                {row.startingPrice != null ? (
                  <p className="mt-2 [font-family:'Geist',Helvetica] text-xs text-slate-500">Starting price</p>
                ) : null}
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

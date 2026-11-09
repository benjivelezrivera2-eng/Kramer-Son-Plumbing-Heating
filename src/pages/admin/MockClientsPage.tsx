import { useOutletContext } from "react-router-dom";
import { NoMatches, PageHeading, SkeletonRows, useMockReady } from "../../components/admin/MockBits";
import { matchesQuery, mockClients, type OfficeContext } from "../../lib/adminMock";
import { usePageTitle } from "../../lib/usePageTitle";

export function MockClientsPage(): JSX.Element {
  usePageTitle("Team");
  const { query } = useOutletContext<OfficeContext>();
  const ready = useMockReady();
  const rows = mockClients.filter((row) =>
    matchesQuery(query, row.name, row.city, row.phone, row.role),
  );

  return (
    <section aria-busy={!ready}>
      <PageHeading
        title="Team"
        body="People who work at Kramer & Son. Names and numbers on this screen are samples."
      />
      <div className="mt-6">
        {!ready ? (
          <SkeletonRows />
        ) : rows.length === 0 ? (
          <NoMatches query={query} />
        ) : (
          <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
            <table className="w-full text-left">
              <thead className="border-b border-slate-100 bg-slate-50">
                <tr>
                  {["Name", "City", "Phone", "Role"].map((heading) => (
                    <th
                      key={heading}
                      className="px-4 py-3 [font-family:'Geist',Helvetica] text-xs font-semibold text-slate-500"
                    >
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.id} className="border-b border-slate-100 last:border-0">
                    <td className="px-4 py-3 [font-family:'Geist',Helvetica] text-sm font-semibold text-[#142033]">
                      {row.name}
                    </td>
                    <td className="px-4 py-3 [font-family:'Geist',Helvetica] text-sm text-slate-600">{row.city}</td>
                    <td className="px-4 py-3 [font-family:'Geist',Helvetica] text-sm text-slate-600">{row.phone}</td>
                    <td className="px-4 py-3 [font-family:'Geist',Helvetica] text-sm text-slate-600">{row.role}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}

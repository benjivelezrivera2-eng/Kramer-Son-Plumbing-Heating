import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { type Customer } from "../../lib/shop";
import { supabase } from "../../lib/supabase";
import { usePageTitle } from "../../lib/usePageTitle";

export function AdminCustomersPage(): JSX.Element {
  usePageTitle("Customers");
  const [customers, setCustomers] = useState<Customer[]>([]);

  useEffect(() => {
    void supabase
      .from("customers")
      .select("*")
      .order("created_at", { ascending: false })
      .then(({ data }) => setCustomers((data ?? []) as Customer[]));
  }, []);

  return (
    <section className="mx-auto w-full max-w-3xl">
      <h1 className="[font-family:'Gabarito',Helvetica] text-[32px] font-extrabold text-[#142033]">
        Customers
      </h1>
      <p className="mt-2 text-sm text-slate-600">
        People, not logins. Same phone or email stays one record.
      </p>
      {customers.length === 0 ? (
        <p className="mt-8 rounded-md border border-slate-200 bg-white p-6 text-sm">
          No customers yet.
        </p>
      ) : (
        <ul className="mt-8 flex flex-col gap-3">
          {customers.map((customer) => (
            <li key={customer.id}>
              <Link
                to={`/admin/customers/${customer.id}`}
                className="block rounded-md border border-slate-200 bg-white p-4"
              >
                <p className="font-semibold text-[#142033]">{customer.name}</p>
                <p className="text-sm text-slate-600">
                  {customer.phone || "No phone"}
                  {customer.email ? ` · ${customer.email}` : ""}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

import { useEffect, useMemo, useState } from "react";
import api from "../api";

export default function DonorsInfoPage() {
  const [rows, setRows] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    api.get("/donors").then((res) => setRows(res.data)).catch(() => setRows([]));
  }, []);

  const filteredRows = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter((row) => {
      const idText = String(row.donor_id);
      const nameText = row.person?.name?.toLowerCase() || "";
      return idText.includes(q) || nameText.includes(q);
    });
  }, [rows, query]);

  return (
    <section className="rounded-lg bg-white p-6 shadow">
      <h2 className="mb-2 text-2xl font-semibold">Donors Information</h2>
      <p className="mb-4 text-sm text-slate-600">
        Use this page to quickly find donor IDs before adding organs or creating matches.
      </p>

      <input
        className="mb-4 w-full rounded border p-2"
        placeholder="Search by donor ID or name"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <div className="overflow-x-auto">
        <table className="min-w-full border text-sm">
          <thead className="bg-slate-100">
            <tr>
              <th className="border p-2">Donor ID</th>
              <th className="border p-2">Name</th>
              <th className="border p-2">Blood Group</th>
              <th className="border p-2">Phone</th>
              <th className="border p-2">Organs (type - status)</th>
            </tr>
          </thead>
          <tbody>
            {filteredRows.map((row) => (
              <tr key={row.donor_id}>
                <td className="border p-2 font-semibold">{row.donor_id}</td>
                <td className="border p-2">{row.person?.name || "-"}</td>
                <td className="border p-2">{row.person?.blood_group || "-"}</td>
                <td className="border p-2">{row.person?.phone || "-"}</td>
                <td className="border p-2">
                  {row.organs && row.organs.length > 0
                    ? row.organs
                        .map(
                          (o) =>
                            `${o.organ_type} - ${
                              o.availability_status === "allocated" ? "allocated" : "available"
                            }`
                        )
                        .join(", ")
                    : "No organs"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

import { useEffect, useState } from "react";
import api from "../api";

export default function MatchesPage() {
  const [rows, setRows] = useState([]);

  const load = () => api.get("/matches").then((res) => setRows(res.data)).catch(() => setRows([]));
  useEffect(() => {
    load();
  }, []);

  return (
    <section className="rounded-lg bg-white p-6 shadow">
      <h2 className="mb-4 text-2xl font-semibold">Matches</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border text-sm">
          <thead className="bg-slate-100">
            <tr>
              <th className="border p-2">Match ID</th>
              <th className="border p-2">Recipient</th>
              <th className="border p-2">Organ</th>
              <th className="border p-2">Hospital</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.match_id}>
                <td className="border p-2">{row.match_id}</td>
                <td className="border p-2">{row.recipient?.person?.name}</td>
                <td className="border p-2">{row.organ?.organ_type}</td>
                <td className="border p-2">
                  {row.hospital?.name} ({row.hospital?.location})
                </td>
                <td className="border p-2">{row.status || "-"}</td>
                <td className="border p-2">{new Date(row.match_date).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

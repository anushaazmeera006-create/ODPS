import { useEffect, useState } from "react";
import api from "../api";

export default function AuditLogsPage() {
  const [rows, setRows] = useState([]);
  const [q, setQ] = useState("");

  const load = () =>
    api
      .get("/audit-logs", { params: { q } })
      .then((res) => setRows(res.data))
      .catch(() => setRows([]));

  useEffect(() => {
    load();
  }, []);

  return (
    <section className="space-y-4 rounded-lg bg-white p-6 shadow">
      <h2 className="text-2xl font-semibold">Audit Logs</h2>
      <div className="flex gap-2">
        <input className="w-full rounded border p-2" placeholder="Search details" value={q} onChange={(e) => setQ(e.target.value)} />
        <button className="rounded bg-blue-700 px-4 py-2 text-white" onClick={load}>
          Search
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full border text-sm">
          <thead className="bg-slate-100">
            <tr>
              <th className="border p-2">Time</th>
              <th className="border p-2">Action</th>
              <th className="border p-2">Details</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.log_id}>
                <td className="border p-2">{new Date(row.timestamp).toLocaleString()}</td>
                <td className="border p-2">{row.action}</td>
                <td className="border p-2">{row.details || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

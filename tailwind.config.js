import { useState } from "react";
import api from "../api";

export default function RecipientHistoryPage() {
  const [recipientId, setRecipientId] = useState(
    new URLSearchParams(window.location.search).get("id") || ""
  );
  const [data, setData] = useState(null);

  const load = async () => {
    if (!recipientId) return;
    try {
      const res = await api.get(`/recipients/${recipientId}/history`);
      setData(res.data);
    } catch {
      setData(null);
    }
  };

  return (
    <section className="space-y-4 rounded-lg bg-white p-6 shadow">
      <h2 className="text-2xl font-semibold">Recipient History</h2>
      <div className="flex gap-2">
        <input className="w-full rounded border p-2" placeholder="Recipient ID" value={recipientId} onChange={(e) => setRecipientId(e.target.value)} />
        <button className="rounded bg-blue-700 px-4 py-2 text-white" onClick={load}>
          Load History
        </button>
      </div>
      {data && (
        <div className="space-y-3 text-sm">
          <p>
            <strong>Name:</strong> {data.recipient?.person?.name} | <strong>Status:</strong> {data.recipient?.status}
          </p>
          <p>
            <strong>Matches:</strong> {data.matches?.length || 0}
          </p>
          <p>
            <strong>Audit Entries:</strong> {data.logs?.length || 0}
          </p>
        </div>
      )}
    </section>
  );
}

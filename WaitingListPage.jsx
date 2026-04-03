import { useState } from "react";
import api from "../api";

export default function RecipientDashboard() {
  const [form, setForm] = useState({
    recipient_id: "",
    organ_type_needed: "",
    urgency: 3,
    waiting_time: 0,
    request_date: ""
  });
  const [message, setMessage] = useState("");

  const submitRequest = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...form,
        recipient_id: Number(form.recipient_id),
        urgency: Number(form.urgency)
      };
      const res = await api.post("/recipient/request", payload);
      setMessage(res.data.message);
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to submit request.");
    }
  };

  const runMatching = async () => {
    try {
      const res = await api.post("/match/run");
      setMessage(`Matching completed. Matches created: ${res.data.matches_created}`);
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to run matching.");
    }
  };

  return (
    <section className="space-y-4 rounded-lg bg-white p-6 shadow">
      <h2 className="text-2xl font-semibold">Recipient Dashboard</h2>
      <p className="text-sm text-slate-600">
        Enter recipient details and request date. Request date is the day when this organ request is made.
      </p>
      <form className="grid gap-4 md:grid-cols-2" onSubmit={submitRequest}>
        <label className="flex flex-col gap-1 text-sm">
          Recipient ID
          <input
            className="rounded border p-2"
            placeholder="Enter recipient ID"
            type="number"
            value={form.recipient_id}
            onChange={(e) => setForm({ ...form, recipient_id: e.target.value })}
          />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          Organ Type Needed
          <input
            className="rounded border p-2"
            placeholder="e.g. Liver"
            value={form.organ_type_needed}
            onChange={(e) => setForm({ ...form, organ_type_needed: e.target.value })}
          />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          Urgency (1-5)
          <input
            className="rounded border p-2"
            type="number"
            min="1"
            max="5"
            value={form.urgency}
            onChange={(e) => setForm({ ...form, urgency: e.target.value })}
          />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          Waiting Time (days)
          <input
            className="rounded border p-2"
            type="number"
            min="0"
            value={form.waiting_time}
            onChange={(e) => setForm({ ...form, waiting_time: e.target.value })}
          />
        </label>
        <label className="flex flex-col gap-1 text-sm md:col-span-2">
          Request Date (date when recipient requested this organ)
          <input
            className="rounded border p-2"
            type="date"
            value={form.request_date}
            onChange={(e) => setForm({ ...form, request_date: e.target.value })}
          />
        </label>
        <button className="rounded bg-blue-700 px-4 py-2 text-white hover:bg-blue-800 md:col-span-2">
          Request Organ
        </button>
      </form>
      <button className="rounded bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-700" onClick={runMatching}>
        Run Matching Algorithm
      </button>
      {message && <p className="text-sm text-emerald-700">{message}</p>}
    </section>
  );
}

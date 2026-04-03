import { useState } from "react";
import api from "../api";

export default function DonorDashboard() {
  const [form, setForm] = useState({
    donor_id: "",
    organ_type: "",
    availability_status: "available",
    expiry_time: ""
  });
  const [message, setMessage] = useState("");

  const submitOrgan = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/donor/add-organ", {
        ...form,
        donor_id: Number(form.donor_id)
      });
      setMessage(res.data.message);
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to add organ.");
    }
  };

  return (
    <section className="rounded-lg bg-white p-6 shadow">
      <h2 className="mb-4 text-2xl font-semibold">Donor Dashboard</h2>
      <p className="mb-4 text-sm text-slate-600">
        Enter donor details and organ information. Use organ expiry date/time to indicate until when the organ is usable.
      </p>
      <form className="grid gap-4 md:grid-cols-2" onSubmit={submitOrgan}>
        <label className="flex flex-col gap-1 text-sm">
          Donor ID
          <input
            className="rounded border p-2"
            placeholder="Enter donor ID"
            type="number"
            value={form.donor_id}
            onChange={(e) => setForm({ ...form, donor_id: e.target.value })}
          />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          Organ Type
          <input
            className="rounded border p-2"
            placeholder="e.g. Kidney, Liver"
            value={form.organ_type}
            onChange={(e) => setForm({ ...form, organ_type: e.target.value })}
          />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          Organ Expiry Date and Time
          <input
            className="rounded border p-2"
            type="datetime-local"
            value={form.expiry_time}
            onChange={(e) => setForm({ ...form, expiry_time: e.target.value })}
          />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          Availability Status
          <select
            className="rounded border p-2"
            value={form.availability_status}
            onChange={(e) => setForm({ ...form, availability_status: e.target.value })}
          >
            <option value="available">available</option>
            <option value="allocated">allocated</option>
          </select>
        </label>
        <button className="rounded bg-blue-700 px-4 py-2 text-white hover:bg-blue-800 md:col-span-2">
          Add Organ
        </button>
      </form>
      {message && <p className="mt-4 text-sm text-emerald-700">{message}</p>}
    </section>
  );
}

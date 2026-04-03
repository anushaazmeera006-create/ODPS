import { useEffect, useState } from "react";
import api from "../api";

export default function HospitalsPage() {
  const [rows, setRows] = useState([]);
  const [form, setForm] = useState({ name: "", location: "" });
  const [message, setMessage] = useState("");
  const role = localStorage.getItem("odms_role");

  const load = () => api.get("/hospitals").then((res) => setRows(res.data)).catch(() => setRows([]));
  useEffect(() => {
    load();
  }, []);

  const addHospital = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/hospitals", form);
      setMessage(res.data.message);
      setForm({ name: "", location: "" });
      load();
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to add hospital.");
    }
  };

  return (
    <section className="space-y-4 rounded-lg bg-white p-6 shadow">
      <h2 className="text-2xl font-semibold">Hospitals</h2>
      {role === "admin" && (
        <form className="grid gap-3 md:grid-cols-3" onSubmit={addHospital}>
          <input className="rounded border p-2" placeholder="Hospital Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <input className="rounded border p-2" placeholder="Location" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />
          <button className="rounded bg-blue-700 px-4 py-2 text-white">Add Hospital</button>
        </form>
      )}
      {message && <p className="text-sm text-emerald-700">{message}</p>}
      <table className="min-w-full border text-sm">
        <thead className="bg-slate-100">
          <tr>
            <th className="border p-2">ID</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Location</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((h) => (
            <tr key={h.hospital_id}>
              <td className="border p-2">{h.hospital_id}</td>
              <td className="border p-2">{h.name}</td>
              <td className="border p-2">{h.location}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

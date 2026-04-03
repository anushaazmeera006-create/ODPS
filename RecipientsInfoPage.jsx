import { useState } from "react";
import api from "../api";

export default function LoginPage() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [message, setMessage] = useState("");

  const login = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", form);
      localStorage.setItem("odms_token", res.data.token);
      localStorage.setItem("odms_role", res.data.role);
      window.location.href = "/";
    } catch (error) {
      setMessage(error.response?.data?.message || "Login failed.");
    }
  };

  return (
    <section className="mx-auto max-w-lg rounded-lg bg-white p-6 shadow">
      <h2 className="mb-4 text-2xl font-semibold">Login</h2>
      <p className="mb-2 text-sm text-slate-600">Use one of these demo users:</p>
      <p className="mb-4 text-xs text-slate-600">admin/admin123, coordinator/coord123, hospital/hospital123</p>
      <form className="space-y-3" onSubmit={login}>
        <input className="w-full rounded border p-2" placeholder="Username" onChange={(e) => setForm({ ...form, username: e.target.value })} />
        <input className="w-full rounded border p-2" placeholder="Password" type="password" onChange={(e) => setForm({ ...form, password: e.target.value })} />
        <button className="w-full rounded bg-blue-700 px-4 py-2 text-white">Login</button>
      </form>
      {message && <p className="mt-3 text-sm text-rose-700">{message}</p>}
    </section>
  );
}

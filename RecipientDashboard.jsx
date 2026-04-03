import { useEffect, useState } from "react";
import api from "../api";

export default function HomePage() {
  const [stats, setStats] = useState({ totalDonors: 0, totalRecipients: 0, totalMatches: 0 });

  useEffect(() => {
    api.get("/stats").then((res) => setStats(res.data)).catch(() => {});
  }, []);

  return (
    <section className="space-y-6">
      <div className="rounded-lg bg-white p-6 shadow">
        <h1 className="text-3xl font-bold text-blue-900">Organ Donation Management System</h1>
        <p className="mt-2 text-slate-600">
          Manage donor registration, recipient requests, waiting list priority, and organ matching.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-lg bg-white p-6 shadow">
          <p className="text-sm text-slate-500">Total Donors</p>
          <p className="text-3xl font-bold">{stats.totalDonors}</p>
        </div>
        <div className="rounded-lg bg-white p-6 shadow">
          <p className="text-sm text-slate-500">Total Recipients</p>
          <p className="text-3xl font-bold">{stats.totalRecipients}</p>
        </div>
        <div className="rounded-lg bg-white p-6 shadow">
          <p className="text-sm text-slate-500">Total Matches</p>
          <p className="text-3xl font-bold">{stats.totalMatches}</p>
        </div>
      </div>
    </section>
  );
}

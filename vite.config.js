// import { useEffect, useMemo, useState } from "react";
// import api from "../api";

// export default function RecipientsInfoPage() {
//   const [rows, setRows] = useState([]);
//   const [query, setQuery] = useState("");

//   useEffect(() => {
//     api.get("/recipients").then((res) => setRows(res.data)).catch(() => setRows([]));
//   }, []);

//   const filteredRows = useMemo(() => {
//     const q = query.trim().toLowerCase();
//     if (!q) return rows;
//     return rows.filter((row) => {
//       const idText = String(row.recipient_id);
//       const nameText = row.person?.name?.toLowerCase() || "";
//       return idText.includes(q) || nameText.includes(q);
//     });
//   }, [rows, query]);

//   return (
//     <section className="rounded-lg bg-white p-6 shadow">
//       <h2 className="mb-2 text-2xl font-semibold">Recipients Information</h2>
//       <p className="mb-4 text-sm text-slate-600">
//         Use this page to quickly find recipient IDs before requesting organs or running matching.
//       </p>

//       <input
//         className="mb-4 w-full rounded border p-2"
//         placeholder="Search by recipient ID or name"
//         value={query}
//         onChange={(e) => setQuery(e.target.value)}
//       />

//       <div className="overflow-x-auto">
//         <table className="min-w-full border text-sm">
//           <thead className="bg-slate-100">
//             <tr>
//               <th className="border p-2">Recipient ID</th>
//               <th className="border p-2">Name</th>
//               <th className="border p-2">Blood Group</th>
//               <th className="border p-2">Organ Needed</th>
//               <th className="border p-2">Urgency</th>
//               <th className="border p-2">Request Date</th>
//               <th className="border p-2">Status</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredRows.map((row) => (
//               <tr key={row.recipient_id}>
//                 <td className="border p-2 font-semibold">{row.recipient_id}</td>
//                 <td className="border p-2">{row.person?.name || "-"}</td>
//                 <td className="border p-2">{row.person?.blood_group || "-"}</td>
//                 <td className="border p-2">{row.organ_needed || "-"}</td>
//                 <td className="border p-2">{row.urgency_level}</td>
//                 <td className="border p-2">
//                   {row.lastRequestDate
//                     ? new Date(row.lastRequestDate).toLocaleDateString()
//                     : "-"}
//                 </td>
//                 <td className="border p-2">{row.status}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </section>
//   );
// }
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()]
});

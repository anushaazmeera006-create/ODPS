import { NavLink } from "react-router-dom";

const links = [
  { to: "/", label: "Home" },
  { to: "/register", label: "Register" },
  { to: "/donors-info", label: "Donors Info" },
  { to: "/recipients-info", label: "Recipients Info" },
  { to: "/donor", label: "Donor Dashboard" },
  { to: "/recipient", label: "Recipient Dashboard" },
  { to: "/waiting-list", label: "Waiting List" },
  { to: "/matches", label: "Matches" }
];

export default function Navbar() {
  return (
    <nav className="bg-blue-800 text-white">
      <div className="mx-auto flex max-w-6xl flex-wrap gap-4 p-4">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `rounded px-3 py-1 text-sm ${isActive ? "bg-white text-blue-800" : "hover:bg-blue-700"}`
            }
          >
            {link.label}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}

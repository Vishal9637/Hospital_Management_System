import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  UserCog,
  BedDouble,
  ClipboardList,
  FileText,
} from "lucide-react";

export default function Sidebar() {
  const location = useLocation();

  const menu = [
    { name: "Dashboard", path: "/", icon: <LayoutDashboard size={18} /> },
    { name: "Patients", path: "/patients", icon: <Users size={18} /> },
    { name: "Doctors", path: "/doctors", icon: <UserCog size={18} /> },
    { name: "Rooms", path: "/rooms", icon: <BedDouble size={18} /> },
    { name: "Assign Doctor", path: "/assign", icon: <ClipboardList size={18} /> },
    { name: "Billing", path: "/billing", icon: <FileText size={18} /> },
  ];

  return (
    <div className="fixed top-0 left-0 h-screen w-64 bg-gradient-to-b from-green-600 to-green-800 text-white p-5 shadow-xl flex flex-col z-50">

      {/* LOGO / TITLE */}
      <div className="flex items-center gap-3 mb-8">
        <div className="bg-white text-green-700 p-2 rounded-xl shadow-lg text-xl">
          🏥
        </div>

        <div>
          <h2 className="text-lg font-bold leading-tight">
            Hospital Management
          </h2>
          <p className="text-xs text-green-200">
            Admin Panel
          </p>
        </div>
      </div>

      {/* MENU */}
      <nav className="flex flex-col gap-2">

        {menu.map((item, index) => (
          <Link
            key={index}
            to={item.path}
            className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 
              ${
                location.pathname === item.path
                  ? "bg-white text-green-700 font-semibold shadow"
                  : "hover:bg-green-700"
              }`}
          >
            {item.icon}
            {item.name}
          </Link>
        ))}

      </nav>

      {/* FOOTER */}
      <div className="mt-auto text-xs text-green-200 pt-6 border-t border-green-500">
        © 2026 HMS System
      </div>

    </div>
  );
}
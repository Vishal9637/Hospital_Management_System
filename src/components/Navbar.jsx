import { Bell, User } from "lucide-react";

export default function Navbar() {
  return (
    <div className="fixed top-0 left-64 right-0 z-40 bg-white/80 backdrop-blur-md shadow-md px-6 py-3 flex justify-between items-center border-b border-gray-200">

      {/* LEFT */}
      <div className="flex items-center gap-3">
        <div className="bg-gradient-to-r from-green-500 to-green-700 text-white p-2 rounded-xl shadow">
          🏥
        </div>

        <div>
          <h1 className="text-lg font-bold text-gray-800">
            Hospital Management
          </h1>
          <p className="text-xs text-gray-500">
            Admin Dashboard
          </p>
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-5">

        {/* Notification */}
        <div className="relative cursor-pointer hover:scale-105 transition">
          <Bell className="text-gray-600" size={20} />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] px-1 rounded-full">
            3
          </span>
        </div>

        {/* Profile */}
        <div className="flex items-center gap-3 cursor-pointer hover:bg-gray-100 px-3 py-1 rounded-lg transition">

          <div className="text-right">
            <p className="text-sm font-semibold text-gray-800">Admin</p>
            <p className="text-xs text-gray-500">Administrator</p>
          </div>

          <div className="w-9 h-9 bg-gradient-to-r from-green-500 to-green-700 text-white flex items-center justify-center rounded-full shadow">
            <User size={18} />
          </div>

        </div>
      </div>
    </div>
  );
}
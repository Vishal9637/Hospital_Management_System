import { useEffect, useState } from "react";
import { getDashboard } from "../services/api";
import {
  Users,
  UserCheck,
  BedDouble,
  IndianRupee,
} from "lucide-react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function Dashboard() {
  const [data, setData] = useState({
    patients: 0,
    doctors: 0,
    rooms: 0,
    revenue: 0,
  });

  const fetchData = async () => {
    try {
      const res = await getDashboard();
      setData(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const chartData = [
    { name: "Patients", value: data.patients },
    { name: "Doctors", value: data.doctors },
    { name: "Rooms", value: data.rooms },
  ];

  return (
    <div className="ml-64 pt-20 min-h-screen bg-gray-50 p-6">

      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Dashboard Overview
        </h1>
        <p className="text-gray-500">
          Welcome to Hospital Management System
        </p>
      </div>

      {/* CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">

        {[
          {
            title: "Patients",
            value: data.patients,
            icon: <Users size={22} />,
            color: "from-green-400 to-green-600",
          },
          {
            title: "Doctors",
            value: data.doctors,
            icon: <UserCheck size={22} />,
            color: "from-blue-400 to-blue-600",
          },
          {
            title: "Rooms",
            value: data.rooms,
            icon: <BedDouble size={22} />,
            color: "from-yellow-400 to-yellow-500",
          },
          {
            title: "Revenue",
            value: `₹ ${data.revenue}`,
            icon: <IndianRupee size={22} />,
            color: "from-red-400 to-red-500",
          },
        ].map((item, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl shadow-md p-5 flex justify-between items-center hover:shadow-xl transition"
          >
            <div>
              <p className="text-gray-500 text-sm">{item.title}</p>
              <h2 className="text-2xl font-bold text-gray-800">
                {item.value}
              </h2>
            </div>

            <div
              className={`bg-gradient-to-r ${item.color} text-white p-3 rounded-xl shadow-lg`}
            >
              {item.icon}
            </div>
          </div>
        ))}
      </div>

      {/* CHART */}
      <div className="bg-white rounded-2xl shadow-md p-6 max-w-3xl">

        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          Hospital Analytics
        </h2>

        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={chartData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar
              dataKey="value"
              fill="#16a34a"
              radius={[6, 6, 0, 0]}
              barSize={30}
            />
          </BarChart>
        </ResponsiveContainer>

      </div>

    </div>
  );
}
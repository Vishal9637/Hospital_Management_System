import { useEffect, useState } from "react";
import {
  getDoctors,
  addDoctor,
  updateDoctor,
  deleteDoctor,
} from "../services/api";

export default function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const [form, setForm] = useState({
    name: "",
    specialization: "",
    phone: "",
    email: "",
    fees: "",
  });

  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [isEdit, setIsEdit] = useState(false);

  const fetchDoctors = async () => {
    const res = await getDoctors();
    setDoctors(res.data);
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isEdit) {
      await updateDoctor(selectedDoctor.doctor_id, form);
    } else {
      await addDoctor(form);
    }

    setForm({
      name: "",
      specialization: "",
      phone: "",
      email: "",
      fees: "",
    });

    setIsEdit(false);
    setSelectedDoctor(null);
    fetchDoctors();
  };

  const handleDelete = async (id) => {
    await deleteDoctor(id);
    fetchDoctors();
  };

  const handleEdit = (d) => {
    setForm({
      name: d.name || "",
      specialization: d.specialization || "",
      phone: d.phone || "",
      email: d.email || "",
      fees: d.fees || "",
    });
    setSelectedDoctor(d);
    setIsEdit(true);
  };

  const handleView = (d) => {
    setSelectedDoctor(d);
  };

  return (
    <div className="ml-64 pt-20 min-h-screen bg-gray-50 p-6">

      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Doctor Management
        </h1>
        <p className="text-gray-500">
          Manage doctor records and details
        </p>
      </div>

      {/* FORM */}
      <div className="bg-white p-6 rounded-2xl shadow-md mb-8 border border-gray-100">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          {isEdit ? "Update Doctor" : "Add Doctor"}
        </h2>

        <form onSubmit={handleSubmit} className="grid md:grid-cols-3 gap-4">

          <input
            className="border p-3 rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
            placeholder="Name"
            value={form.name}
            onChange={(e)=>setForm({...form,name:e.target.value})}
          />

          <input
            className="border p-3 rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
            placeholder="Specialization"
            value={form.specialization}
            onChange={(e)=>setForm({...form,specialization:e.target.value})}
          />

          <input
            className="border p-3 rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
            placeholder="Phone"
            value={form.phone}
            onChange={(e)=>setForm({...form,phone:e.target.value})}
          />

          <input
            className="border p-3 rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
            placeholder="Email"
            value={form.email}
            onChange={(e)=>setForm({...form,email:e.target.value})}
          />

          <input
            className="border p-3 rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
            placeholder="Fees"
            value={form.fees}
            onChange={(e)=>setForm({...form,fees:e.target.value})}
          />

          <button className="md:col-span-3 bg-gradient-to-r from-green-500 to-green-700 text-white py-2 rounded-lg font-semibold hover:shadow-lg transition">
            {isEdit ? "Update Doctor" : "Add Doctor"}
          </button>

        </form>
      </div>

      {/* TABLE */}
      <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">

        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          Doctor List
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-center border rounded-lg overflow-hidden">

            <thead className="bg-gradient-to-r from-green-500 to-green-700 text-white">
              <tr>
                <th className="p-3">ID</th>
                <th className="p-3">Name</th>
                <th className="p-3">Specialization</th>
                <th className="p-3">Fees</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>

            <tbody>
              {doctors.map((d) => (
                <tr key={d.doctor_id} className="border-t hover:bg-gray-50 transition">

                  <td className="p-2">{d.doctor_id}</td>
                  <td className="p-2 font-medium">{d.name}</td>
                  <td className="p-2 text-gray-600">{d.specialization}</td>
                  <td className="p-2 text-green-600 font-semibold">₹ {d.fees}</td>

                  <td className="p-2 space-x-2">

                    <button
                      onClick={()=>handleView(d)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg"
                    >
                      View
                    </button>

                    <button
                      onClick={()=>handleEdit(d)}
                      className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded-lg"
                    >
                      Edit
                    </button>

                    <button
                      onClick={()=>handleDelete(d.doctor_id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg"
                    >
                      Delete
                    </button>

                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>

      </div>

      {/* MODAL */}
      {selectedDoctor && !isEdit && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">

          <div className="bg-white p-6 rounded-2xl w-96 shadow-xl">

            <h2 className="text-xl font-bold mb-4 text-gray-800">
              Doctor Details
            </h2>

            <div className="space-y-2 text-gray-700">
              <p><b>ID:</b> {selectedDoctor.doctor_id}</p>
              <p><b>Name:</b> {selectedDoctor.name}</p>
              <p><b>Specialization:</b> {selectedDoctor.specialization}</p>
              <p><b>Phone:</b> {selectedDoctor.phone}</p>
              <p><b>Email:</b> {selectedDoctor.email}</p>
              <p><b>Fees:</b> ₹ {selectedDoctor.fees}</p>
            </div>

            <button
              onClick={()=>setSelectedDoctor(null)}
              className="mt-6 w-full bg-gradient-to-r from-green-500 to-green-700 text-white py-2 rounded-lg font-semibold"
            >
              Close
            </button>

          </div>

        </div>
      )}

    </div>
  );
}
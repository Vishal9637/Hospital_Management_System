import { useEffect, useState } from "react";
import {
  getPatients,
  addPatient,
  deletePatient,
  updatePatient,
} from "../services/api";

export default function Patients() {
  const [patients, setPatients] = useState([]);
  const [form, setForm] = useState({
    name: "",
    age: "",
    gender: "",
    phone: "",
    address: "",
    disease: "",
  });

  const [selectedPatient, setSelectedPatient] = useState(null);
  const [isEdit, setIsEdit] = useState(false);

  const fetchPatients = async () => {
    const res = await getPatients();
    setPatients(res.data);
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isEdit) {
      await updatePatient(selectedPatient.patient_id, form);
    } else {
      await addPatient(form);
    }

    setForm({
      name: "",
      age: "",
      gender: "",
      phone: "",
      address: "",
      disease: "",
    });

    setIsEdit(false);
    setSelectedPatient(null);
    fetchPatients();
  };

  const handleDelete = async (id) => {
    await deletePatient(id);
    fetchPatients();
  };

  const handleEdit = (p) => {
    setForm({
      name: p.name || "",
      age: p.age || "",
      gender: p.gender || "",
      phone: p.phone || "",
      address: p.address || "",
      disease: p.disease || "",
    });
    setSelectedPatient(p);
    setIsEdit(true);
  };

  const handleView = (p) => {
    setSelectedPatient(p);
  };

  return (
    <div className="ml-64 pt-20 min-h-screen bg-gray-50 p-6">

      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Patient Management
        </h1>
        <p className="text-gray-500">
          Manage patient records and details
        </p>
      </div>

      {/* FORM CARD */}
      <div className="bg-white p-6 rounded-2xl shadow-md mb-8 border border-gray-100">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          {isEdit ? "Update Patient" : "Add Patient"}
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
            placeholder="Age"
            value={form.age}
            onChange={(e)=>setForm({...form,age:e.target.value})}
          />

          <input
            className="border p-3 rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
            placeholder="Gender"
            value={form.gender}
            onChange={(e)=>setForm({...form,gender:e.target.value})}
          />

          <input
            className="border p-3 rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
            placeholder="Phone"
            value={form.phone}
            onChange={(e)=>setForm({...form,phone:e.target.value})}
          />

          <input
            className="border p-3 rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
            placeholder="Disease"
            value={form.disease}
            onChange={(e)=>setForm({...form,disease:e.target.value})}
          />

          <textarea
            className="border p-3 rounded-lg md:col-span-3 focus:ring-2 focus:ring-green-400 outline-none"
            placeholder="Address"
            value={form.address}
            onChange={(e)=>setForm({...form,address:e.target.value})}
          />

          <button className="md:col-span-3 bg-gradient-to-r from-green-500 to-green-700 text-white py-2 rounded-lg font-semibold hover:shadow-lg transition">
            {isEdit ? "Update Patient" : "Add Patient"}
          </button>

        </form>
      </div>

      {/* TABLE CARD */}
      <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">

        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          Patient List
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-center border rounded-lg overflow-hidden">

            <thead className="bg-gradient-to-r from-green-500 to-green-700 text-white">
              <tr>
                <th className="p-3">ID</th>
                <th className="p-3">Name</th>
                <th className="p-3">Age</th>
                <th className="p-3">Gender</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>

            <tbody>
              {patients.map((p) => (
                <tr key={p.patient_id} className="border-t hover:bg-gray-50 transition">

                  <td className="p-2">{p.patient_id}</td>
                  <td className="p-2 font-medium">{p.name}</td>
                  <td className="p-2">{p.age}</td>
                  <td className="p-2">{p.gender}</td>

                  <td className="p-2 space-x-2">

                    <button
                      onClick={() => handleView(p)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg transition"
                    >
                      View
                    </button>

                    <button
                      onClick={() => handleEdit(p)}
                      className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded-lg transition"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(p.patient_id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg transition"
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
      {selectedPatient && !isEdit && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">

          <div className="bg-white p-6 rounded-2xl w-96 shadow-xl">

            <h2 className="text-xl font-bold mb-4 text-gray-800">
              Patient Details
            </h2>

            <div className="space-y-2 text-gray-700">
              <p><b>ID:</b> {selectedPatient.patient_id}</p>
              <p><b>Name:</b> {selectedPatient.name}</p>
              <p><b>Age:</b> {selectedPatient.age}</p>
              <p><b>Gender:</b> {selectedPatient.gender}</p>
              <p><b>Phone:</b> {selectedPatient.phone}</p>
              <p><b>Disease:</b> {selectedPatient.disease}</p>
              <p><b>Address:</b> {selectedPatient.address}</p>
              <p><b>Date:</b> {selectedPatient.admission_date}</p>
            </div>

            <button
              onClick={() => setSelectedPatient(null)}
              className="mt-6 w-full bg-gradient-to-r from-green-500 to-green-700 text-white py-2 rounded-lg font-semibold hover:shadow-lg transition"
            >
              Close
            </button>

          </div>

        </div>
      )}

    </div>
  );
}
import { useEffect, useState } from "react";
import {
  getAssignments,
  assignDoctor,
  updateAssignment,
  deleteAssignmentDoctor,
  getPatients,
  getDoctors,
} from "../services/api";

export default function AssignDoctor() {
  const [assignments, setAssignments] = useState([]);
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);

  const [form, setForm] = useState({
    patient_id: "",
    doctor_id: "",
  });

  const [isEdit, setIsEdit] = useState(false);
  const [selected, setSelected] = useState(null);

  const fetchData = async () => {
    try {
      const assignRes = await getAssignments();
      const patientRes = await getPatients();
      const doctorRes = await getDoctors();

      setAssignments(assignRes.data);
      setPatients(patientRes.data);
      setDoctors(doctorRes.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.patient_id || !form.doctor_id) {
      alert("Select both patient and doctor");
      return;
    }

    if (isEdit) {
      await updateAssignment(selected.id, form);
    } else {
      await assignDoctor(form);
    }

    setForm({ patient_id: "", doctor_id: "" });
    setIsEdit(false);
    setSelected(null);
    fetchData();
  };

  const handleEdit = (a) => {
    setForm({
      patient_id: a.patient_id,
      doctor_id: a.doctor_id,
    });
    setSelected(a);
    setIsEdit(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this record?")) {
      await deleteAssignmentDoctor(id);
      fetchData();
    }
  };

  return (
    <div className="ml-64 pt-20 min-h-screen bg-gray-50 p-6">

      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Assign Doctor
        </h1>
        <p className="text-gray-500">
          Manage patient-doctor assignments efficiently
        </p>
      </div>

      {/* FORM */}
      <div className="bg-white p-6 rounded-2xl shadow-md mb-8 border border-gray-100">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          {isEdit ? "Update Assignment" : "Assign Doctor"}
        </h2>

        <form onSubmit={handleSubmit} className="grid md:grid-cols-3 gap-4">

          <select
            value={form.patient_id}
            onChange={(e)=>setForm({...form,patient_id:e.target.value})}
            className="border p-3 rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
          >
            <option value="">Select Patient</option>
            {patients.map(p=>(
              <option key={p.patient_id} value={p.patient_id}>
                {p.patient_id} - {p.name}
              </option>
            ))}
          </select>

          <select
            value={form.doctor_id}
            onChange={(e)=>setForm({...form,doctor_id:e.target.value})}
            className="border p-3 rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
          >
            <option value="">Select Doctor</option>
            {doctors.map(d=>(
              <option key={d.doctor_id} value={d.doctor_id}>
                {d.name} ({d.specialization})
              </option>
            ))}
          </select>

          <button className="bg-gradient-to-r from-green-500 to-green-700 text-white rounded-lg py-2 font-semibold hover:shadow-lg transition">
            {isEdit ? "Update" : "Assign"}
          </button>

        </form>
      </div>

      {/* TABLE */}
      <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">

        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          Assigned Doctors
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-center border rounded-lg overflow-hidden">

            <thead className="bg-gradient-to-r from-green-500 to-green-700 text-white">
              <tr>
                <th className="p-3">ID</th>
                <th className="p-3">Patient</th>
                <th className="p-3">Doctor</th>
                <th className="p-3">Specialization</th>
                <th className="p-3">Date</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>

            <tbody>
              {assignments.map(a=>(
                <tr key={a.id} className="border-t hover:bg-gray-50 transition">
                  <td className="p-2">{a.id}</td>
                  <td className="p-2 font-medium">{a.patient_name}</td>
                  <td className="p-2">{a.doctor_name}</td>
                  <td className="p-2 text-gray-600">{a.specialization}</td>
                  <td className="p-2">{a.assigned_date}</td>

                  <td className="p-2 space-x-2">
                    <button
                      onClick={()=>handleEdit(a)}
                      className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded-lg"
                    >
                      Edit
                    </button>

                    <button
                      onClick={()=>handleDelete(a.id)}
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

    </div>
  );
}
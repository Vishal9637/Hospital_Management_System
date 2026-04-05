import { useEffect, useState } from "react";
import {
  getBillingData,
  createBill,
  getBills,
  updateBill,
  deleteBill,
} from "../services/api";

export default function Billing() {
  const [patients, setPatients] = useState([]);
  const [bills, setBills] = useState([]);

  const [form, setForm] = useState({
    patient_id: "",
    doctor_fee: 0,
    room_fee: 0,
    medicine_fee: 0,
    payment_status: "Pending",
  });

  const [editBillId, setEditBillId] = useState(null);
  const [editData, setEditData] = useState({
    medicine_fee: 0,
    payment_status: "Pending",
  });

  const fetchData = async () => {
    setPatients((await getBillingData()).data);
    setBills((await getBills()).data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handlePatientChange = (id) => {
    const p = patients.find(x => x.patient_id == id);

    setForm({
      ...form,
      patient_id: id,
      doctor_fee: p.doctor_fee,
      room_fee: p.room_fee,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createBill(form);
    setForm({
      patient_id: "",
      doctor_fee: 0,
      room_fee: 0,
      medicine_fee: 0,
      payment_status: "Pending",
    });
    fetchData();
  };

  const handleEdit = (bill) => {
    setEditBillId(bill.bill_id);
    setEditData({
      medicine_fee: bill.medicine_fee,
      payment_status: bill.payment_status,
    });
  };

  const handleUpdate = async (id) => {
    await updateBill(id, editData);
    setEditBillId(null);
    fetchData();
  };

  return (
    <div className="ml-64 pt-20 min-h-screen bg-gray-50 p-6">

      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Billing System
        </h1>
        <p className="text-gray-500">
          Manage patient billing and payments
        </p>
      </div>

      {/* FORM */}
      <div className="bg-white p-6 rounded-2xl shadow-md mb-8 border border-gray-100">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          Generate Bill
        </h2>

        <form onSubmit={handleSubmit} className="grid md:grid-cols-5 gap-4">

          <select
            onChange={(e)=>handlePatientChange(e.target.value)}
            className="border p-3 rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
          >
            <option>Select Patient</option>
            {patients.map(p=>(
              <option key={p.patient_id} value={p.patient_id}>
                {p.name}
              </option>
            ))}
          </select>

          <input value={form.doctor_fee} disabled className="border p-3 rounded-lg bg-gray-100" />
          <input value={form.room_fee} disabled className="border p-3 rounded-lg bg-gray-100" />

          <input
            placeholder="Medicine Fee"
            className="border p-3 rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
            value={form.medicine_fee}
            onChange={(e)=>setForm({...form,medicine_fee:e.target.value})}
          />

          <select
            value={form.payment_status}
            onChange={(e)=>setForm({...form,payment_status:e.target.value})}
            className="border p-3 rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
          >
            <option>Pending</option>
            <option>Paid</option>
          </select>

          <button className="col-span-full md:col-span-1 bg-gradient-to-r from-green-500 to-green-700 text-white rounded-lg py-2 font-semibold hover:shadow-lg transition">
            Generate
          </button>

        </form>
      </div>

      {/* TABLE */}
      <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">

        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          Billing Records
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-center border rounded-lg overflow-hidden">

            <thead className="bg-gradient-to-r from-green-500 to-green-700 text-white">
              <tr>
                <th className="p-3">Patient</th>
                <th className="p-3">Doctor</th>
                <th className="p-3">Room</th>
                <th className="p-3">Medicine</th>
                <th className="p-3">Total</th>
                <th className="p-3">Status</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>

            <tbody>
              {bills.map(b=>(
                <tr key={b.bill_id} className="border-t hover:bg-gray-50 transition">

                  <td className="p-2 font-medium">{b.name}</td>
                  <td className="p-2">₹ {b.doctor_fee}</td>
                  <td className="p-2">₹ {b.room_fee}</td>

                  <td className="p-2">
                    {editBillId === b.bill_id ? (
                      <input
                        value={editData.medicine_fee}
                        onChange={(e)=>
                          setEditData({...editData,medicine_fee:e.target.value})
                        }
                        className="border p-1 w-20 rounded"
                      />
                    ) : (
                      `₹ ${b.medicine_fee}`
                    )}
                  </td>

                  <td className="p-2 text-green-600 font-bold">
                    ₹ {b.total_amount}
                  </td>

                  <td className="p-2">
                    {editBillId === b.bill_id ? (
                      <select
                        value={editData.payment_status}
                        onChange={(e)=>
                          setEditData({...editData,payment_status:e.target.value})
                        }
                        className="border p-1 rounded"
                      >
                        <option>Pending</option>
                        <option>Paid</option>
                      </select>
                    ) : (
                      <span
                        className={
                          b.payment_status === "Paid"
                            ? "bg-green-100 text-green-600 px-2 py-1 rounded-full text-xs font-semibold"
                            : "bg-red-100 text-red-500 px-2 py-1 rounded-full text-xs font-semibold"
                        }
                      >
                        {b.payment_status}
                      </span>
                    )}
                  </td>

                  <td className="p-2 space-x-2">

                    {editBillId === b.bill_id ? (
                      <button
                        onClick={()=>handleUpdate(b.bill_id)}
                        className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-lg"
                      >
                        Save
                      </button>
                    ) : (
                      <button
                        onClick={()=>handleEdit(b)}
                        className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded-lg"
                      >
                        Edit
                      </button>
                    )}

                    <button
                      onClick={()=>deleteBill(b.bill_id).then(fetchData)}
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
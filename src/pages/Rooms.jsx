import { useEffect, useState } from "react";
import {
  getRooms,
  addRoom,
  updateRoom,
  deleteRoom,
  assignRoom,
  getAssignedRooms,
  getPatients,
  checkoutRoom,
  deleteAssignment,
} from "../services/api";

export default function Rooms() {
  const [rooms, setRooms] = useState([]);
  const [patients, setPatients] = useState([]);
  const [assigned, setAssigned] = useState([]);

  const [roomForm, setRoomForm] = useState({
    room_number: "",
    room_type: "",
    fees: "",
  });

  const [isEdit, setIsEdit] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);

  const [assignForm, setAssignForm] = useState({
    patient_id: "",
    room_id: "",
  });

  const fetchData = async () => {
    setRooms((await getRooms()).data);
    setPatients((await getPatients()).data);
    setAssigned((await getAssignedRooms()).data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddRoom = async (e) => {
    e.preventDefault();

    if (isEdit) {
      await updateRoom(selectedRoom.room_id, roomForm);
    } else {
      await addRoom(roomForm);
    }

    setRoomForm({ room_number: "", room_type: "", fees: "" });
    setIsEdit(false);
    setSelectedRoom(null);
    fetchData();
  };

  const handleEditRoom = (r) => {
    setRoomForm({
      room_number: r.room_number,
      room_type: r.room_type,
      fees: r.fees,
    });
    setSelectedRoom(r);
    setIsEdit(true);
  };

  const handleDeleteRoom = async (id) => {
    if (window.confirm("Delete this room?")) {
      await deleteRoom(id);
      fetchData();
    }
  };

  const handleAssign = async (e) => {
    e.preventDefault();
    const res = await assignRoom(assignForm);
    alert(res.data.message);
    fetchData();
  };

  const handleDeleteAssignment = async (id) => {
    if (window.confirm("Delete assigned room?")) {
      await deleteAssignment(id);
      fetchData();
    }
  };

  return (
    <div className="ml-64 pt-20  min-h-screen bg-gray-50 p-6">

      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Room Management
        </h1>
        <p className="text-gray-500">
          Manage rooms and patient allocations
        </p>
      </div>

      {/* ADD ROOM */}
      <div className="bg-white p-6 rounded-2xl shadow-md mb-8 border border-gray-100">
        <h2 className="text-lg font-semibold mb-4 text-gray-700">
          {isEdit ? "Update Room" : "Add Room"}
        </h2>

        <form onSubmit={handleAddRoom} className="grid md:grid-cols-4 gap-4">

          <input
            className="border p-3 rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
            placeholder="Room Number"
            value={roomForm.room_number}
            onChange={(e)=>setRoomForm({...roomForm,room_number:e.target.value})}
          />

          <input
            className="border p-3 rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
            placeholder="Room Type"
            value={roomForm.room_type}
            onChange={(e)=>setRoomForm({...roomForm,room_type:e.target.value})}
          />

          <input
            className="border p-3 rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
            placeholder="Fees / Day"
            value={roomForm.fees}
            onChange={(e)=>setRoomForm({...roomForm,fees:e.target.value})}
          />

          <button className="bg-gradient-to-r from-green-500 to-green-700 text-white rounded-lg py-2 font-semibold hover:shadow-lg transition">
            {isEdit ? "Update" : "Add"}
          </button>

        </form>
      </div>

      {/* ROOM LIST */}
      <div className="bg-white p-6 rounded-2xl shadow-md mb-8 border border-gray-100">

        <h2 className="text-lg font-semibold mb-4 text-gray-700">
          Room List
        </h2>

        <table className="w-full text-center border rounded-lg overflow-hidden">
          <thead className="bg-gradient-to-r from-green-500 to-green-700 text-white">
            <tr>
              <th className="p-3">ID</th>
              <th className="p-3">Room</th>
              <th className="p-3">Type</th>
              <th className="p-3">Fees</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {rooms.map(r=>(
              <tr key={r.room_id} className="border-t hover:bg-gray-50 transition">
                <td className="p-2">{r.room_id}</td>
                <td className="p-2 font-medium">{r.room_number}</td>
                <td className="p-2 text-gray-600">{r.room_type}</td>
                <td className="p-2 text-green-600 font-semibold">₹ {r.fees}</td>

                <td className="p-2 space-x-2">
                  <button
                    onClick={()=>handleEditRoom(r)}
                    className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded-lg"
                  >
                    Edit
                  </button>

                  <button
                    onClick={()=>handleDeleteRoom(r.room_id)}
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

      {/* ASSIGN ROOM */}
      <div className="bg-white p-6 rounded-2xl shadow-md mb-8 border border-gray-100">

        <h2 className="text-lg font-semibold mb-4 text-gray-700">
          Assign Room
        </h2>

        <form onSubmit={handleAssign} className="grid md:grid-cols-3 gap-4">

          <select
            onChange={(e)=>setAssignForm({...assignForm,patient_id:e.target.value})}
            className="border p-3 rounded-lg"
          >
            <option>Select Patient</option>
            {patients.map(p=>(
              <option key={p.patient_id} value={p.patient_id}>
                {p.name}
              </option>
            ))}
          </select>

          <select
            onChange={(e)=>setAssignForm({...assignForm,room_id:e.target.value})}
            className="border p-3 rounded-lg"
          >
            <option>Select Room</option>
            {rooms.map(r=>(
              <option key={r.room_id} value={r.room_id}>
                {r.room_number} (₹{r.fees})
              </option>
            ))}
          </select>

          <button className="bg-gradient-to-r from-green-500 to-green-700 text-white rounded-lg py-2 font-semibold">
            Assign
          </button>

        </form>

      </div>

      {/* ASSIGNED ROOMS */}
      <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">

        <h2 className="text-lg font-semibold mb-4 text-gray-700">
          Assigned Rooms
        </h2>

        <table className="w-full text-center border rounded-lg overflow-hidden">
          <thead className="bg-gradient-to-r from-green-500 to-green-700 text-white">
            <tr>
              <th className="p-3">Patient</th>
              <th className="p-3">Room</th>
              <th className="p-3">Fees</th>
              <th className="p-3">Days</th>
              <th className="p-3">Total</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {assigned.map(a=>(
              <tr key={a.id} className="border-t hover:bg-gray-50 transition">

                <td className="p-2 font-medium">{a.patient_name}</td>
                <td className="p-2">{a.room_number}</td>
                <td className="p-2">₹ {a.fees}</td>
                <td className="p-2">{a.total_days}</td>

                <td className="p-2 text-green-600 font-bold">
                  ₹ {a.total_amount}
                </td>

                <td className="p-2 space-x-2">

                  {!a.checkout_date && (
                    <button
                      onClick={()=>checkoutRoom(a.id).then(fetchData)}
                      className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded-lg"
                    >
                      Checkout
                    </button>
                  )}

                  <button
                    onClick={()=>handleDeleteAssignment(a.id)}
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
  );
}
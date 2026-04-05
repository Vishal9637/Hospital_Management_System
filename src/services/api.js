import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// ================= PATIENT =================
export const getPatients = () => API.get("/patients");
export const addPatient = (data) => API.post("/patients", data);
export const updatePatient = (id, data) =>
  API.put(`/patients/${id}`, data);
export const deletePatient = (id) =>
  API.delete(`/patients/${id}`);

// ================= DOCTOR =================
export const getDoctors = () => API.get("/doctors");
export const addDoctor = (data) => API.post("/doctors", data);
export const updateDoctor = (id, data) =>
  API.put(`/doctors/${id}`, data);
export const deleteDoctor = (id) =>
  API.delete(`/doctors/${id}`);

// ================= ROOM =================
export const getRooms = () => API.get("/rooms");
export const addRoom = (data) => API.post("/rooms", data);
export const updateRoom = (id, data) => API.put(`/rooms/${id}`, data);

export const assignRoom = (data) => API.post("/rooms/assign", data);
export const getAssignedRooms = () => API.get("/rooms/assigned");

export const checkoutRoom = (id) =>
  API.put(`/rooms/checkout/${id}`);

export const deleteAssignment = (id) =>
  API.delete(`/rooms/${id}`);
export const deleteRoom = (id) =>
  API.delete(`/rooms/room/${id}`);



// ================= BILLING =================
export const getBillingData = () => API.get("/billing/data");
export const createBill = (data) => API.post("/billing", data);
export const getBills = () => API.get("/billing");
export const updateBill = (id, data) =>
  API.put(`/billing/${id}`, data);
export const deleteBill = (id) =>
  API.delete(`/billing/${id}`);

// ================= DASHBOARD =================
export const getDashboard = () => API.get("/dashboard");

// ================= PATIENT-DOCTOR =================
export const getAssignments = () => API.get("/patient-doctor");
export const assignDoctor = (data) => API.post("/patient-doctor", data);
export const updateAssignment = (id, data) =>
  API.put(`/patient-doctor/${id}`, data);
export const deleteAssignmentDoctor = (id) =>
  API.delete(`/patient-doctor/${id}`);
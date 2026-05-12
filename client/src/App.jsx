import React from "react";

import { Routes, Route } from "react-router-dom";

import Payment from "./pages/Payment";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Signup from "./pages/Signup";
import MyPurchases from "./pages/MyPurchases";
import Dashboard from "./pages/Dashboard";
import AdminRequests from "./pages/AdminRequests";
import AddNote from "./pages/AddNote";
import SubjectNotes from "./pages/SubjectNotes";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/login" element={<Login />} />

      <Route path="/signup" element={<Signup />} />

      <Route path="/dashboard" element={<Dashboard />} />

      <Route path="/add-note" element={<AddNote />} />

      <Route path="/payment" element={<Payment />} />

      <Route path="/admin-requests" element={<AdminRequests />} />

      <Route path="/my-purchases" element={<MyPurchases />} />

      <Route path="/profile" element={<Profile />} />

      <Route path="/subject/:name" element={<SubjectNotes />} />
    </Routes>
  );
}

import React, { useState } from "react";

import { useNavigate } from "react-router-dom";

import API from "../services/api";

export default function Signup() {
  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      const response = await API.post(
        "/signup",

        {
          name,
          email,
          password,
        },
      );

      console.log(response.data);

      navigate("/login");
    } catch (error) {
      console.log(error);

      alert("Signup Failed");
    }
  };

  return (
    <div className="container py-5">
      <div className="col-md-4 mx-auto card p-4 shadow">
        <h2 className="text-center mb-4">Signup</h2>

        <input
          type="text"
          placeholder="Enter name"
          className="form-control mb-3"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Enter email"
          className="form-control mb-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Enter password"
          className="form-control mb-3"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="btn btn-primary w-100" onClick={handleSignup}>
          Signup
        </button>
      </div>
    </div>
  );
}

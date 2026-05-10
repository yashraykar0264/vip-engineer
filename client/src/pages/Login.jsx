import React, { useState } from "react";

import { useNavigate } from "react-router-dom";

import API from "../services/api";

export default function Login() {
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // LOGIN FUNCTION

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await API.post(
        "/login",

        {
          email,
          password,
        },
      );

      // SAVE TOKEN

      localStorage.setItem("token", response.data.token);

      // SAVE ROLE

      localStorage.setItem("role", response.data.role);

      // REDIRECT

      navigate("/dashboard");
    } catch (error) {
      console.log(error);

      alert("Invalid Email or Password ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",

        background: "linear-gradient(135deg, #0f172a, #1e293b, #312e81)",

        display: "flex",

        justifyContent: "center",

        alignItems: "center",

        padding: "20px",
      }}
    >
      {/* LOGIN CARD */}

      <div
        style={{
          width: "100%",

          maxWidth: "450px",

          background: "rgba(255,255,255,0.08)",

          backdropFilter: "blur(10px)",

          borderRadius: "30px",

          padding: "40px",

          border: "1px solid rgba(255,255,255,0.1)",

          boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
        }}
      >
        {/* TOP */}

        <div className="text-center mb-5">
          <div
            style={{
              fontSize: "70px",
            }}
          >
            🚀
          </div>

          <h1
            className="fw-bold text-white"
            style={{
              fontSize: "45px",
            }}
          >
            VIP Engineer
          </h1>

          <p
            style={{
              color: "#cbd5e1",

              fontSize: "17px",
            }}
          >
            Login to continue your journey
          </p>
        </div>

        {/* FORM */}

        <form onSubmit={handleLogin}>
          {/* EMAIL */}

          <div className="mb-4">
            <label className="text-white fw-bold mb-2">Email Address</label>

            <input
              type="email"
              placeholder="Enter your email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                padding: "14px",

                borderRadius: "14px",

                border: "none",

                background: "rgba(255,255,255,0.1)",

                color: "white",

                fontSize: "16px",
              }}
            />
          </div>

          {/* PASSWORD */}

          <div className="mb-4">
            <label className="text-white fw-bold mb-2">Password</label>

            <input
              type="password"
              placeholder="Enter your password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                padding: "14px",

                borderRadius: "14px",

                border: "none",

                background: "rgba(255,255,255,0.1)",

                color: "white",

                fontSize: "16px",
              }}
            />
          </div>

          {/* LOGIN BUTTON */}

          <button
            type="submit"
            className="btn fw-bold w-100"
            disabled={loading}
            style={{
              background: "linear-gradient(to right, #3b82f6, #8b5cf6)",

              color: "white",

              padding: "14px",

              borderRadius: "16px",

              border: "none",

              fontSize: "18px",
            }}
          >
            {loading ? "Logging in..." : "Login 🚀"}
          </button>
        </form>

        {/* FOOTER */}

        <div className="text-center mt-4">
          <p
            style={{
              color: "#cbd5e1",
            }}
          >
            Don’t have an account?
          </p>

          <button
            className="btn btn-light fw-bold"
            style={{
              borderRadius: "14px",

              padding: "12px 20px",
            }}
            onClick={() => navigate("/signup")}
          >
            Create Account ✨
          </button>
        </div>
      </div>
    </div>
  );
}

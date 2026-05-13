import React, { useState } from "react";

import { useNavigate, useLocation } from "react-router-dom";

import API from "../services/api";
import { toast } from "react-toastify";
export default function Login() {
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const location = useLocation();

  // LOGIN FUNCTION

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await API.post("/login", {
        email,
        password,
      });

      // SAVE TOKEN

      localStorage.setItem("token", response.data.token);

      // SAVE ROLE

      localStorage.setItem("role", response.data.role);

      // SUCCESS MESSAGE

      toast.success("Login Successful 🚀");

      // REDIRECT

      navigate("/dashboard");
    } catch (error) {
      console.log(error);

      toast.error("Invalid Email or Password ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #020617 0%, #0f172a 40%, #1e1b4b 100%)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* BACKGROUND CIRCLES */}

      <div
        style={{
          position: "absolute",
          width: "350px",
          height: "350px",
          background: "#3b82f6",
          borderRadius: "50%",
          top: "-100px",
          left: "-100px",
          filter: "blur(120px)",
          opacity: 0.4,
        }}
      ></div>

      <div
        style={{
          position: "absolute",
          width: "300px",
          height: "300px",
          background: "#8b5cf6",
          borderRadius: "50%",
          bottom: "-100px",
          right: "-100px",
          filter: "blur(120px)",
          opacity: 0.4,
        }}
      ></div>

      {/* LOGIN CARD */}

      <div
        style={{
          width: "100%",
          maxWidth: "480px",
          background: "rgba(255,255,255,0.08)",
          backdropFilter: "blur(18px)",
          borderRadius: "32px",
          padding: "45px",
          border: "1px solid rgba(255,255,255,0.1)",
          boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
          position: "relative",
          zIndex: 2,
        }}
      >
        {/* TOP */}

        <div className="text-center mb-5">
          <div
            style={{
              fontSize: "75px",
            }}
          >
            🚀
          </div>

          <h1
            className="fw-bold text-white"
            style={{
              fontSize: "48px",
              letterSpacing: "1px",
            }}
          >
            VIP Engineer
          </h1>

          <p
            style={{
              color: "#cbd5e1",
              fontSize: "17px",
              marginTop: "10px",
            }}
          >
            Login to access premium engineering notes
          </p>
        </div>

        {/* LOGIN ALERT */}

        {location.state?.message && (
          <div
            className="mb-4"
            style={{
              background: "rgba(239,68,68,0.15)",
              border: "1px solid rgba(239,68,68,0.4)",
              color: "#fecaca",
              padding: "14px",
              borderRadius: "16px",
              textAlign: "center",
              fontWeight: "bold",
              fontSize: "15px",
            }}
          >
            🔒 {location.state.message}
          </div>
        )}

        {/* FORM */}

        <form onSubmit={handleLogin}>
          {/* EMAIL */}

          <div className="mb-4">
            <label
              className="fw-bold mb-2"
              style={{
                color: "#f8fafc",
              }}
            >
              Email Address
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                padding: "15px",
                borderRadius: "16px",
                border: "1px solid rgba(255,255,255,0.1)",
                background: "rgba(255,255,255,0.08)",
                color: "white",
                fontSize: "16px",
                boxShadow: "none",
              }}
            />
          </div>

          {/* PASSWORD */}

          <div className="mb-4">
            <label
              className="fw-bold mb-2"
              style={{
                color: "#f8fafc",
              }}
            >
              Password
            </label>

            <input
              type="password"
              placeholder="Enter your password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                padding: "15px",
                borderRadius: "16px",
                border: "1px solid rgba(255,255,255,0.1)",
                background: "rgba(255,255,255,0.08)",
                color: "white",
                fontSize: "16px",
                boxShadow: "none",
              }}
            />
          </div>

          {/* LOGIN BUTTON */}

          <button
            type="submit"
            className="btn fw-bold w-100"
            disabled={loading}
            style={{
              background: "linear-gradient(to right, #2563eb, #8b5cf6)",
              color: "white",
              padding: "15px",
              borderRadius: "18px",
              border: "none",
              fontSize: "18px",
              transition: "0.3s",
              boxShadow: "0 10px 30px rgba(59,130,246,0.4)",
            }}
          >
            {loading ? "Logging in..." : "Login 🚀"}
          </button>
        </form>

        {/* DIVIDER */}

        <div
          className="d-flex align-items-center my-4"
          style={{
            color: "#94a3b8",
          }}
        >
          <div
            style={{
              flex: 1,
              height: "1px",
              background: "rgba(255,255,255,0.1)",
            }}
          ></div>

          <span
            style={{
              padding: "0 15px",
              fontSize: "14px",
            }}
          >
            OR
          </span>

          <div
            style={{
              flex: 1,
              height: "1px",
              background: "rgba(255,255,255,0.1)",
            }}
          ></div>
        </div>

        {/* SIGNUP */}

        <div className="text-center">
          <p
            style={{
              color: "#cbd5e1",
              marginBottom: "15px",
            }}
          >
            Don’t have an account?
          </p>

          <button
            className="btn fw-bold w-100"
            style={{
              borderRadius: "18px",
              padding: "14px",
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "white",
              fontSize: "16px",
            }}
            onClick={() => navigate("/signup")}
          >
            Create Account ✨
          </button>
        </div>

        {/* FOOTER */}

        <div
          className="text-center mt-5"
          style={{
            color: "#94a3b8",
            fontSize: "14px",
          }}
        >
          Built for Engineers ❤️
        </div>
      </div>
    </div>
  );
}

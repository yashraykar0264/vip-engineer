import React, { useState } from "react";

import { useLocation, useNavigate } from "react-router-dom";

import API from "../services/api";

export default function Payment() {
  const location = useLocation();

  const navigate = useNavigate();

  const note = location.state;

  const [transactionId, setTransactionId] = useState("");

  const [screenshot, setScreenshot] = useState(null);

  const [loading, setLoading] = useState(false);

  // SUBMIT PAYMENT

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const formData = new FormData();

      // IMPORTANT

      formData.append("noteId", note._id);

      formData.append("transactionId", transactionId);

      // MUST MATCH upload.single("screenshot")

      formData.append("screenshot", screenshot);

      await API.post("/purchase", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Payment Submitted Successfully ✅");

      navigate("/dashboard");
    } catch (error) {
      console.log(error);

      alert("Payment Submission Failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to right, #0f172a, #1e1b4b)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "30px",
      }}
    >
      <div
        className="card border-0 p-4"
        style={{
          width: "100%",
          maxWidth: "600px",
          borderRadius: "25px",
          background: "rgba(255,255,255,0.08)",
          backdropFilter: "blur(15px)",
          color: "white",
          boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
        }}
      >
        {/* HEADING */}

        <h1 className="fw-bold text-center mb-4">Complete Payment 💳</h1>

        {/* NOTE DETAILS */}

        <div
          className="p-4 mb-4"
          style={{
            background: "rgba(255,255,255,0.05)",
            borderRadius: "20px",
          }}
        >
          <h2 className="fw-bold">{note.title}</h2>

          <p className="text-light">{note.description}</p>

          <h1
            className="fw-bold"
            style={{
              color: "#22c55e",
            }}
          >
            ₹{note.price}
          </h1>
        </div>

        {/* QR */}

        <div className="text-center mb-4">
          <img
            src="/qr.png"
            alt="QR"
            style={{
              width: "220px",
              borderRadius: "20px",
            }}
          />

          <p className="mt-3 text-light">Scan QR & Complete Payment</p>
        </div>

        {/* FORM */}

        <form onSubmit={handleSubmit}>
          {/* TRANSACTION ID */}

          <div className="mb-4">
            <label className="form-label fw-bold">
              Transaction ID (Optional)
            </label>

            <input
              type="text"
              className="form-control"
              placeholder="Enter Transaction ID"
              value={transactionId}
              onChange={(e) => setTransactionId(e.target.value)}
              style={{
                padding: "14px",
                borderRadius: "14px",
                border: "none",
              }}
            />
          </div>

          {/* SCREENSHOT */}

          <div className="mb-4">
            <label className="form-label fw-bold">
              Upload Payment Screenshot
            </label>

            <input
              type="file"
              className="form-control"
              accept="image/*"
              required
              onChange={(e) => setScreenshot(e.target.files[0])}
              style={{
                padding: "14px",
                borderRadius: "14px",
                border: "none",
              }}
            />
          </div>

          {/* SUBMIT BUTTON */}

          <button
            type="submit"
            disabled={loading}
            className="btn w-100 fw-bold"
            style={{
              padding: "15px",
              borderRadius: "16px",
              fontSize: "18px",
              background: "linear-gradient(to right, #2563eb, #7c3aed)",
              color: "white",
              border: "none",
            }}
          >
            {loading ? "Submitting..." : "Submit Payment 🚀"}
          </button>
        </form>

        {/* BACK BUTTON */}

        <button
          className="btn btn-light fw-bold w-100 mt-4"
          style={{
            padding: "14px",
            borderRadius: "16px",
          }}
          onClick={() => navigate("/dashboard")}
        >
          Back To Dashboard
        </button>
      </div>
    </div>
  );
}

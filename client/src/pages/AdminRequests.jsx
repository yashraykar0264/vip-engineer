import React, { useEffect, useState } from "react";

import API from "../services/api";

import { useNavigate } from "react-router-dom";

export default function AdminRequests() {
  const [requests, setRequests] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    const role = localStorage.getItem("role");

    if (!token || role !== "admin") {
      navigate("/");

      return;
    }

    fetchRequests();
  }, []);

  // FETCH REQUESTS

  const fetchRequests = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await API.get("/purchase-requests", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setRequests(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  // APPROVE PAYMENT

  const approvePayment = async (purchaseId) => {
    try {
      const token = localStorage.getItem("token");

      await API.patch(
        `/purchase/approve/${purchaseId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      alert("Payment Approved ✅");

      fetchRequests();
    } catch (error) {
      console.log(error);

      alert("Approval Failed ❌");
    }
  };

  // LOGOUT

  const handleLogout = () => {
    localStorage.clear();

    navigate("/");
  };

  // FIX SCREENSHOT URL

  const getScreenshotUrl = (screenshot) => {
    if (!screenshot) return "";

    return `https://vip-engineer.onrender.com/screenshots/${screenshot}`;
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to right, #f8fafc, #dbeafe)",
      }}
    >
      {/* NAVBAR */}

      <nav
        className="navbar navbar-dark px-4 py-3"
        style={{
          background: "linear-gradient(to right, #0f172a, #1e293b)",
        }}
      >
        <h2 className="text-white fw-bold m-0">VIP Engineer Admin 🚀</h2>

        <button className="btn btn-danger fw-bold" onClick={handleLogout}>
          Logout
        </button>
      </nav>

      {/* HEADING */}

      <div className="container py-5">
        <h1
          className="fw-bold text-center mb-5"
          style={{
            fontSize: "50px",
            color: "#0f172a",
          }}
        >
          Purchase Requests 💳
        </h1>

        {/* EMPTY */}

        {requests.length === 0 && (
          <div className="text-center">
            <h3 className="text-secondary">No Purchase Requests 😔</h3>
          </div>
        )}

        {/* REQUESTS */}

        <div className="row g-4">
          {requests.map((req) => (
            <div className="col-md-6 col-lg-4" key={req._id}>
              <div
                className="card border-0 h-100"
                style={{
                  borderRadius: "20px",
                  overflow: "hidden",
                  boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
                  background: "#fff",
                }}
              >
                {/* TOP BAR */}

                <div
                  style={{
                    height: "10px",
                    background: "linear-gradient(to right, #2563eb, #7c3aed)",
                  }}
                ></div>

                {/* BODY */}

                <div className="card-body p-4">
                  {/* USER */}

                  <h5 className="fw-bold mb-1">👤 {req.userId?.name}</h5>

                  <p className="text-secondary mb-3">{req.userId?.email}</p>

                  {/* NOTE */}

                  <h4 className="fw-bold">📚 {req.noteId?.title}</h4>

                  {/* PRICE */}

                  <h5
                    className="fw-bold mt-3"
                    style={{
                      color: "#16a34a",
                    }}
                  >
                    ₹{req.noteId?.price}
                  </h5>

                  {/* TRANSACTION */}

                  <div className="mt-3">
                    <h6 className="fw-bold">Transaction ID 🧾</h6>

                    <p className="text-secondary">
                      {req.transactionId || "Not Provided"}
                    </p>
                  </div>

                  {/* SCREENSHOT */}

                  {req.screenshot && (
                    <div className="mt-4">
                      <h6 className="fw-bold mb-2">Payment Screenshot 📸</h6>

                      <img
                        src={getScreenshotUrl(req.screenshot)}
                        alt="payment"
                        onError={(e) => {
                          e.target.style.display = "none";
                        }}
                        style={{
                          width: "100%",
                          height: "220px",
                          objectFit: "cover",
                          borderRadius: "12px",
                          border: "2px solid #e5e7eb",
                        }}
                      />
                    </div>
                  )}

                  {/* STATUS */}

                  <div className="mt-4">
                    <span
                      className={`badge px-3 py-2 ${
                        req.paymentStatus === "approved"
                          ? "bg-success"
                          : "bg-warning text-dark"
                      }`}
                      style={{
                        fontSize: "15px",
                        borderRadius: "10px",
                      }}
                    >
                      {req.paymentStatus.toUpperCase()}
                    </span>
                  </div>

                  {/* BUTTON */}

                  {req.paymentStatus !== "approved" ? (
                    <button
                      className="btn btn-success w-100 fw-bold mt-4"
                      style={{
                        padding: "12px",
                        borderRadius: "12px",
                        fontSize: "17px",
                      }}
                      onClick={() => approvePayment(req._id)}
                    >
                      Approve Payment ✅
                    </button>
                  ) : (
                    <button
                      className="btn btn-secondary w-100 fw-bold mt-4"
                      disabled
                      style={{
                        padding: "12px",
                        borderRadius: "12px",
                        fontSize: "17px",
                      }}
                    >
                      Already Approved ✔
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

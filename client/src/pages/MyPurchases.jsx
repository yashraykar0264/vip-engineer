import React, { useEffect, useState } from "react";

import API from "../services/api";

import { useNavigate } from "react-router-dom";

export default function MyPurchases() {
  const [purchases, setPurchases] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/");
      return;
    }

    fetchPurchases();
  }, []);

  // FETCH PURCHASES

  const fetchPurchases = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await API.get("/my-purchases", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setPurchases(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  // VIEW PDF

  const viewPDF = (noteId) => {
    try {
      const token = localStorage.getItem("token");

      window.open(
        `https://vip-engineer.onrender.com/notes/view/${noteId}?token=${token}`,
        "_blank",
      );
    } catch (error) {
      console.log(error);

      alert("Access Denied");
    }
  };

  // LOGOUT

  const handleLogout = () => {
    localStorage.clear();

    navigate("/");
  };

  // GROUP PURCHASES

  const groupedPurchases = purchases.reduce((acc, purchase) => {
    const folder = purchase.noteId?.folder || "Other";

    if (!acc[folder]) {
      acc[folder] = [];
    }

    acc[folder].push(purchase);

    return acc;
  }, {});

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
        <h2 className="fw-bold text-white">VIP Engineer 🚀</h2>

        <div className="d-flex gap-3">
          <button
            className="btn btn-light fw-bold"
            onClick={() => navigate("/dashboard")}
          >
            Dashboard
          </button>

          <button className="btn btn-danger fw-bold" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </nav>

      {/* HEADING */}

      <div className="container py-5">
        <h1
          className="fw-bold text-center mb-5"
          style={{
            fontSize: "55px",

            color: "#0f172a",
          }}
        >
          My Purchases 📚
        </h1>

        {/* EMPTY */}

        {purchases.length === 0 && (
          <div className="text-center">
            <h3 className="text-secondary">No Purchases Yet 😔</h3>
          </div>
        )}

        {/* SUBJECT WISE */}

        {Object.keys(groupedPurchases).map((folder) => (
          <div key={folder} className="mb-5">
            <h2 className="fw-bold mb-4">📂 {folder}</h2>

            <div className="row g-4">
              {groupedPurchases[folder].map((purchase) => (
                <div className="col-md-4" key={purchase._id}>
                  <div
                    className="card border-0 h-100"
                    style={{
                      borderRadius: "24px",

                      overflow: "hidden",

                      boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
                    }}
                  >
                    {/* TOP BAR */}

                    <div
                      style={{
                        height: "10px",

                        background:
                          "linear-gradient(to right, #2563eb, #7c3aed)",
                      }}
                    ></div>

                    {/* BODY */}

                    <div className="card-body p-4 d-flex flex-column">
                      <h3 className="fw-bold">{purchase.noteId?.title}</h3>

                      <p
                        className="text-secondary"
                        style={{
                          minHeight: "80px",
                        }}
                      >
                        {purchase.noteId?.description}
                      </p>

                      <h2
                        className="fw-bold"
                        style={{
                          color: "#16a34a",
                        }}
                      >
                        ₹{purchase.noteId?.price}
                      </h2>

                      {/* STATUS */}

                      <div className="mt-3">
                        <span
                          className={`badge px-3 py-2 ${
                            purchase.paymentStatus === "approved"
                              ? "bg-success"
                              : "bg-warning text-dark"
                          }`}
                          style={{
                            fontSize: "15px",

                            borderRadius: "10px",
                          }}
                        >
                          {purchase.paymentStatus.toUpperCase()}
                        </span>
                      </div>

                      {/* BUTTON */}

                      <div className="mt-auto">
                        {purchase.paymentStatus === "approved" ? (
                          <button
                            className="btn btn-success w-100 fw-bold mt-4"
                            style={{
                              padding: "12px",

                              borderRadius: "14px",
                            }}
                            onClick={() => viewPDF(purchase.noteId._id)}
                          >
                            View PDF 📄
                          </button>
                        ) : (
                          <button
                            className="btn btn-warning w-100 fw-bold mt-4"
                            disabled
                            style={{
                              padding: "12px",

                              borderRadius: "14px",
                            }}
                          >
                            Pending Approval ⏳
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

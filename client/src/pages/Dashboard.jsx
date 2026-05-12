import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import API from "../services/api";

export default function Dashboard() {
  const [notes, setNotes] = useState([]);

  const [purchases, setPurchases] = useState([]);

  const navigate = useNavigate();

  const role = localStorage.getItem("role");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/");
      return;
    }

    fetchNotes();

    fetchPurchases();
  }, []);

  const fetchNotes = async () => {
    try {
      const response = await API.get("/notes");

      setNotes(response.data);
    } catch (error) {
      console.log(error);
    }
  };

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

  const handleLogout = () => {
    localStorage.clear();

    navigate("/");
  };

  const viewPDF = async (noteId) => {
    try {
      const token = localStorage.getItem("token");

      const response = await API.get(`/notes/view/${noteId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },

        responseType: "blob",
      });

      const file = new Blob([response.data], {
        type: "application/pdf",
      });

      const fileURL = URL.createObjectURL(file);

      window.open(fileURL);
    } catch (error) {
      console.log(error);

      alert("Access Denied");
    }
  };

  const deleteNote = async (noteId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this note?",
    );

    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");

      await API.delete(`/delete-note/${noteId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setNotes((prevNotes) =>
        prevNotes.filter(
          (note) => note._id !== noteId,
        ),
      );

      alert(
        "Note Deleted Successfully ✅",
      );
    } catch (error) {
      console.log(error);

      alert("Delete Failed ❌");
    }
  };

  const getPurchaseStatus = (
    noteId,
  ) => {
    const purchase = purchases.find(
      (p) => p.noteId === noteId,
    );

    return (
      purchase?.paymentStatus ||
      null
    );
  };

  // GROUP NOTES BY SUBJECT

  const groupedNotes = notes.reduce(
    (acc, note) => {
      const subject =
        note.subject || "Other";

      if (!acc[subject]) {
        acc[subject] = [];
      }

      acc[subject].push(note);

      return acc;
    },
    {},
  );

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #0f172a, #1e293b, #312e81)",
        color: "white",
      }}
    >
      <nav
        className="navbar navbar-expand-lg px-4 py-3"
        style={{
          background:
            "rgba(255,255,255,0.05)",
          backdropFilter:
            "blur(12px)",
          borderBottom:
            "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <div className="container-fluid">
          <h2 className="fw-bold m-0">
            VIP Engineer 🚀
          </h2>

          <div className="d-flex gap-3 flex-wrap">
            {role === "admin" && (
              <>
                <button
                  className="btn btn-warning fw-bold"
                  onClick={() =>
                    navigate("/add-note")
                  }
                >
                  Add Note ➕
                </button>

                <button
                  className="btn btn-info fw-bold"
                  onClick={() =>
                    navigate(
                      "/admin-requests",
                    )
                  }
                >
                  Requests 💳
                </button>
              </>
            )}

            <button
              className="btn btn-light fw-bold"
              onClick={() =>
                navigate(
                  "/my-purchases",
                )
              }
            >
              My Purchases 📚
            </button>

            <button
              className="btn btn-light fw-bold"
              onClick={() =>
                navigate("/profile")
              }
            >
              Profile 👤
            </button>

            <button
              className="btn btn-danger fw-bold"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="container py-5">
        <div className="text-center mb-5">
          <h1
            className="fw-bold"
            style={{
              fontSize: "65px",
            }}
          >
            Premium Engineering Notes
            📚
          </h1>

          <p
            className="mt-3"
            style={{
              color: "#cbd5e1",
              fontSize: "20px",
            }}
          >
            Unlock premium
            handwritten notes 🚀
          </p>
        </div>

        {Object.keys(
          groupedNotes,
        ).map((subject) => (
          <div
            key={subject}
            className="mb-5"
          >
            <h1
              className="fw-bold mb-4"
              style={{
                color: "#ffffff",
              }}
            >
              📂 {subject}
            </h1>

            <div className="row g-4">
              {groupedNotes[
                subject
              ].map((note) => {
                const status =
                  getPurchaseStatus(
                    note._id,
                  );

                return (
                  <div
                    className="col-lg-4 col-md-6"
                    key={note._id}
                  >
                    <div
                      className="h-100 p-4"
                      style={{
                        background:
                          "rgba(255,255,255,0.08)",
                        borderRadius:
                          "28px",
                        backdropFilter:
                          "blur(10px)",
                        border:
                          "1px solid rgba(255,255,255,0.1)",
                      }}
                    >
                      <div
                        className="mb-4"
                        style={{
                          fontSize:
                            "50px",
                        }}
                      >
                        📘
                      </div>

                      <h3 className="fw-bold">
                        {note.title}
                      </h3>

                      <p
                        style={{
                          color:
                            "#cbd5e1",
                          minHeight:
                            "80px",
                          marginTop:
                            "15px",
                        }}
                      >
                        {
                          note.description
                        }
                      </p>

                      <h2
                        className="fw-bold mt-3"
                        style={{
                          color:
                            "#4ade80",
                        }}
                      >
                        ₹{note.price}
                      </h2>

                      <div className="mt-4">
                        {role ===
                          "admin" && (
                          <button
                            className="btn btn-danger w-100 fw-bold mb-3"
                            onClick={() =>
                              deleteNote(
                                note._id,
                              )
                            }
                          >
                            Delete Note 🗑️
                          </button>
                        )}

                        {!status && (
                          <button
                            className="btn w-100 fw-bold"
                            style={{
                              background:
                                "linear-gradient(to right, #3b82f6, #8b5cf6)",
                              color:
                                "white",
                              border:
                                "none",
                            }}
                            onClick={() =>
                              navigate(
                                "/payment",
                                {
                                  state:
                                    note,
                                },
                              )
                            }
                          >
                            Buy Now 🚀
                          </button>
                        )}

                        {status ===
                          "pending" && (
                          <button
                            className="btn btn-warning w-100 fw-bold"
                            disabled
                          >
                            Pending
                            Approval ⏳
                          </button>
                        )}

                        {status ===
                          "approved" && (
                          <button
                            className="btn btn-success w-100 fw-bold"
                            onClick={() =>
                              viewPDF(
                                note._id,
                              )
                            }
                          >
                            View PDF 📄
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        {notes.length === 0 && (
          <div className="text-center mt-5">
            <h3
              style={{
                color: "#cbd5e1",
              }}
            >
              No Notes Available 😔
            </h3>
          </div>
        )}
      </div>
    </div>
  );
}
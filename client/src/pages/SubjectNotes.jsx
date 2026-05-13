import React, { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../services/api";

export default function SubjectNotes() {
  const { name } = useParams();

  const navigate = useNavigate();

  const [notes, setNotes] = useState([]);

  const [search, setSearch] = useState("");

  const [purchases, setPurchases] = useState([]);

  const role = localStorage.getItem("role");

  useEffect(() => {
    fetchNotes();

    fetchPurchases();
  }, [name]);

  // FETCH NOTES

  const fetchNotes = async () => {
    try {
      const response = await API.get("/notes");

      const filtered = response.data.filter((note) => note.folder === name);

      setNotes(filtered);
    } catch (error) {
      console.log(error);
    }
  };

  // FETCH PURCHASES

  const fetchPurchases = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) return;

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

  // CHECK PURCHASED

  const isPurchased = (noteId) => {
    return purchases.some(
      (purchase) =>
        purchase.noteId?._id === noteId &&
        purchase.paymentStatus === "approved",
    );
  };

  // PREMIUM CLICK

  const handlePremiumClick = (note) => {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.warning("Please Login First 🔒");

      navigate("/login");

      return;
    }

    navigate("/payment", {
      state: note,
    });
  };

  // DELETE NOTE

  const handleDeleteNote = async (id) => {
    try {
      const confirmDelete = window.confirm("Delete This Note?");

      if (!confirmDelete) return;

      const token = localStorage.getItem("token");

      const response = await API.delete(`/delete-note/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success(response.data.message);

      fetchNotes();
    } catch (error) {
      console.log(error);

      toast.error("Delete Failed ❌");
    }
  };

  // FILTERS

  const freeNotes = notes.filter((note) => note.price === 0);

  const premiumNotes = notes.filter((note) => note.price > 0);

  const filteredFree = freeNotes.filter((note) =>
    note.title.toLowerCase().includes(search.toLowerCase()),
  );

  const filteredPremium = premiumNotes.filter((note) =>
    note.title.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top left,#172554 0%,#020617 45%,#1e1b4b 100%)",
        color: "white",
        overflowX: "hidden",
      }}
    >
      {/* GLOW */}

      <div
        style={{
          position: "fixed",
          width: "300px",
          height: "300px",
          background: "#2563eb",
          borderRadius: "50%",
          top: "-100px",
          left: "-100px",
          filter: "blur(120px)",
          opacity: 0.2,
          zIndex: 0,
        }}
      ></div>

      <div
        style={{
          position: "fixed",
          width: "300px",
          height: "300px",
          background: "#7c3aed",
          borderRadius: "50%",
          bottom: "-100px",
          right: "-100px",
          filter: "blur(120px)",
          opacity: 0.2,
          zIndex: 0,
        }}
      ></div>

      {/* NAVBAR */}

      <nav
        className="px-3 px-md-5 py-3 d-flex justify-content-between align-items-center"
        style={{
          background: "rgba(255,255,255,0.05)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          position: "sticky",
          top: 0,
          zIndex: 1000,
        }}
      >
        <h2
          className="fw-bold m-0"
          style={{
            fontSize: window.innerWidth < 768 ? "28px" : "38px",
          }}
        >
          VIP Engineer 🚀
        </h2>

        <button
          className="btn fw-bold"
          style={{
            background: "linear-gradient(to right,#2563eb,#7c3aed)",
            color: "white",
            border: "none",
            borderRadius: "14px",
            padding: "10px 22px",
          }}
          onClick={() => navigate("/dashboard")}
        >
          Dashboard 📚
        </button>
      </nav>

      <div className="container py-5">
        {/* HERO */}

        <div className="text-center mb-5">
          <div
            style={{
              fontSize: window.innerWidth < 768 ? "70px" : "90px",
            }}
          >
            📂
          </div>

          <h1
            className="fw-bold"
            style={{
              fontSize: window.innerWidth < 768 ? "52px" : "90px",
              lineHeight: "1",
            }}
          >
            {name}
          </h1>

          <p
            className="mx-auto mt-4"
            style={{
              maxWidth: "750px",
              color: "#94a3b8",
              fontSize: window.innerWidth < 768 ? "16px" : "22px",
              lineHeight: "1.8",
            }}
          >
            Premium engineering notes, handwritten PDFs and smart
            placement-focused content 🚀
          </p>
        </div>

        {/* STATS */}

        <div className="row g-4 mb-5">
          {[
            {
              icon: "📚",
              title: "Total Notes",
              value: notes.length,
              color: "#60a5fa",
            },

            {
              icon: "🆓",
              title: "Free Notes",
              value: freeNotes.length,
              color: "#22c55e",
            },

            {
              icon: "🔥",
              title: "Premium",
              value: premiumNotes.length,
              color: "#facc15",
            },
          ].map((item, index) => (
            <div className="col-lg-4 col-md-6" key={index}>
              <div
                className="h-100 text-center"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "28px",
                  backdropFilter: "blur(12px)",
                  padding: "35px 20px",
                }}
              >
                <div
                  style={{
                    fontSize: "50px",
                  }}
                >
                  {item.icon}
                </div>

                <h1
                  className="fw-bold mt-3"
                  style={{
                    fontSize: "48px",
                    color: item.color,
                  }}
                >
                  {item.value}
                </h1>

                <p
                  style={{
                    color: "#cbd5e1",
                    fontSize: "18px",
                  }}
                >
                  {item.title}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* SEARCH */}

        <div className="mb-5">
          <input
            type="text"
            placeholder="🔍 Search Notes..."
            className="form-control p-3"
            style={{
              borderRadius: "18px",
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.08)",
              color: "white",
              fontSize: "17px",
            }}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* FREE NOTES */}

        {filteredFree.length > 0 && (
          <div className="mb-5">
            <div className="d-flex align-items-center gap-3 mb-4">
              <h1
                className="fw-bold"
                style={{
                  color: "#22c55e",
                  fontSize: window.innerWidth < 768 ? "34px" : "46px",
                }}
              >
                🆓 Free Notes
              </h1>

              <div
                style={{
                  flex: 1,
                  height: "4px",
                  background: "linear-gradient(to right,#22c55e,transparent)",
                  borderRadius: "10px",
                }}
              ></div>
            </div>

            <div className="row g-4">
              {filteredFree.map((note) => (
                <div className="col-xl-3 col-lg-4 col-md-6" key={note._id}>
                  <div
                    style={{
                      background: "rgba(255,255,255,0.06)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      borderRadius: "28px",
                      backdropFilter: "blur(12px)",
                      padding: "26px",
                      height: "100%",
                      transition: "0.3s",
                      position: "relative",
                      overflow: "hidden",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-8px)";

                      e.currentTarget.style.boxShadow =
                        "0 20px 40px rgba(34,197,94,0.2)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0px)";

                      e.currentTarget.style.boxShadow = "none";
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        width: "110px",
                        height: "110px",
                        background: "rgba(34,197,94,0.12)",
                        borderRadius: "50%",
                        top: "-30px",
                        right: "-30px",
                      }}
                    ></div>

                    <div
                      style={{
                        fontSize: "60px",
                      }}
                    >
                      📖
                    </div>

                    <h2
                      className="fw-bold mt-3"
                      style={{
                        fontSize: "30px",
                      }}
                    >
                      {note.title}
                    </h2>

                    <p
                      style={{
                        color: "#cbd5e1",
                        lineHeight: "1.7",
                        minHeight: "80px",
                      }}
                    >
                      {note.description}
                    </p>

                    <span className="badge bg-success mb-4">FREE ACCESS</span>

                    <button
                      className="btn btn-success w-100 fw-bold"
                      style={{
                        borderRadius: "16px",
                        padding: "14px",
                        fontSize: "16px",
                      }}
                      onClick={async () => {
                        try {
                          const response = await fetch(
                            `https://vip-engineer.onrender.com/notes/free/${note._id}`,
                          );

                          if (!response.ok) {
                            toast.error("Failed To Open PDF ❌");

                            return;
                          }

                          const blob = await response.blob();

                          const fileURL = window.URL.createObjectURL(blob);

                          window.open(fileURL);
                        } catch (error) {
                          console.log(error);

                          toast.error("Error Opening PDF ❌");
                        }
                      }}
                    >
                      Open PDF 🚀
                    </button>

                    {role === "admin" && (
                      <button
                        className="btn btn-danger w-100 fw-bold mt-3"
                        style={{
                          borderRadius: "16px",
                          padding: "14px",
                        }}
                        onClick={() => handleDeleteNote(note._id)}
                      >
                        Delete 🗑️
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PREMIUM NOTES */}

        {filteredPremium.length > 0 && (
          <div>
            <div className="d-flex align-items-center gap-3 mb-4">
              <h1
                className="fw-bold"
                style={{
                  color: "#facc15",
                  fontSize: window.innerWidth < 768 ? "34px" : "46px",
                }}
              >
                🔥 Premium Notes
              </h1>

              <div
                style={{
                  flex: 1,
                  height: "4px",
                  background: "linear-gradient(to right,#facc15,transparent)",
                  borderRadius: "10px",
                }}
              ></div>
            </div>

            <div className="row g-4">
              {filteredPremium.map((note) => (
                <div className="col-xl-3 col-lg-4 col-md-6" key={note._id}>
                  <div
                    style={{
                      background:
                        "linear-gradient(135deg,rgba(37,99,235,0.12),rgba(124,58,237,0.16))",
                      border: "1px solid rgba(255,255,255,0.08)",
                      borderRadius: "28px",
                      backdropFilter: "blur(12px)",
                      padding: "26px",
                      height: "100%",
                      transition: "0.3s",
                      position: "relative",
                      overflow: "hidden",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-8px)";

                      e.currentTarget.style.boxShadow =
                        "0 20px 40px rgba(124,58,237,0.3)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0px)";

                      e.currentTarget.style.boxShadow = "none";
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        width: "110px",
                        height: "110px",
                        background: "rgba(255,255,255,0.08)",
                        borderRadius: "50%",
                        top: "-30px",
                        right: "-30px",
                      }}
                    ></div>

                    <div
                      style={{
                        fontSize: "60px",
                      }}
                    >
                      🔒
                    </div>

                    <h2
                      className="fw-bold mt-3"
                      style={{
                        fontSize: "30px",
                      }}
                    >
                      {note.title}
                    </h2>

                    <p
                      style={{
                        color: "#cbd5e1",
                        lineHeight: "1.7",
                        minHeight: "80px",
                      }}
                    >
                      {note.description}
                    </p>

                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <span className="badge bg-danger">PREMIUM</span>

                      <h3
                        className="fw-bold m-0"
                        style={{
                          color: "#60a5fa",
                        }}
                      >
                        ₹{note.price}
                      </h3>
                    </div>

                    {isPurchased(note._id) ? (
                      <button
                        className="btn btn-success w-100 fw-bold"
                        style={{
                          borderRadius: "16px",
                          padding: "14px",
                          border: "none",
                          background:
                            "linear-gradient(to right,#16a34a,#22c55e)",
                        }}
                        onClick={async () => {
                          try {
                            const token = localStorage.getItem("token");

                            const response = await fetch(
                              `https://vip-engineer.onrender.com/notes/view/${note._id}`,
                              {
                                headers: {
                                  Authorization: `Bearer ${token}`,
                                },
                              },
                            );

                            if (!response.ok) {
                              toast.error("Access Denied ❌");

                              return;
                            }

                            const blob = await response.blob();

                            const fileURL = window.URL.createObjectURL(blob);

                            window.open(fileURL);
                          } catch (error) {
                            console.log(error);

                            toast.error("Failed To Open PDF ❌");
                          }
                        }}
                      >
                        Open PDF 🚀
                      </button>
                    ) : (
                      <button
                        className="btn w-100 fw-bold"
                        style={{
                          background:
                            "linear-gradient(to right,#2563eb,#7c3aed)",
                          border: "none",
                          color: "white",
                          borderRadius: "16px",
                          padding: "14px",
                        }}
                        onClick={() => handlePremiumClick(note)}
                      >
                        Buy Premium 🚀
                      </button>
                    )}

                    {role === "admin" && (
                      <button
                        className="btn btn-danger w-100 fw-bold mt-3"
                        style={{
                          borderRadius: "16px",
                          padding: "14px",
                        }}
                        onClick={() => handleDeleteNote(note._id)}
                      >
                        Delete 🗑️
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* EMPTY */}

        {notes.length === 0 && (
          <div
            className="text-center mt-5"
            style={{
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "30px",
              padding: "60px 20px",
              color: "#cbd5e1",
            }}
          >
            <h1 className="fw-bold">No Notes Available 😔</h1>

            <p className="mt-3">Admin has not uploaded notes yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}

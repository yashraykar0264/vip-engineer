import React, { useEffect, useMemo, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import API from "../services/api";

export default function HomeSubjectNotes() {
  const { name } = useParams();

  const navigate = useNavigate();

  const [notes, setNotes] = useState([]);

  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchNotes();
  }, [name]);

  const fetchNotes = async () => {
    try {
      const response = await API.get("/home-notes");

      const filtered = response.data.filter((note) => note.folder === name);

      setNotes(filtered);
    } catch (error) {
      console.log(error);
    }
  };

  // FILTER

  const filteredNotes = useMemo(() => {
    return notes.filter((note) =>
      note.title.toLowerCase().includes(search.toLowerCase()),
    );
  }, [notes, search]);

  const freeNotes = filteredNotes.filter((note) => note.type === "free");

  const premiumNotes = filteredNotes.filter((note) => note.type === "premium");

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top left,#172554 0%,#020617 45%,#1e1b4b 100%)",
        overflowX: "hidden",
        color: "white",
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
          onClick={() => navigate("/")}
        >
          Home 🏠
        </button>
      </nav>

      <div
        className="container"
        style={{
          position: "relative",
          zIndex: 2,
          paddingTop: "60px",
          paddingBottom: "80px",
        }}
      >
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
            Explore curated engineering resources, handwritten PDFs and premium
            learning material 🚀
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
              icon: "🔒",
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
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              borderRadius: "18px",
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.08)",
              color: "white",
              fontSize: "17px",
            }}
          />
        </div>

        {/* FREE NOTES */}

        {freeNotes.length > 0 && (
          <>
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

            <div className="row g-4 mb-5">
              {freeNotes.map((note) => (
                <div className="col-xl-3 col-lg-4 col-md-6" key={note._id}>
                  <div
                    style={{
                      background: "rgba(255,255,255,0.06)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      borderRadius: "28px",
                      backdropFilter: "blur(12px)",
                      padding: "26px",
                      height: "100%",
                      position: "relative",
                      overflow: "hidden",
                      transition: "0.3s",
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
                      onClick={() => {
                        window.open(
                          `https://vip-engineer.onrender.com/notes/free/${note._id}`,
                          "_blank",
                        );
                      }}
                    >
                      Open PDF 🚀
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* PREMIUM */}

        {premiumNotes.length > 0 && (
          <>
            <div className="d-flex align-items-center gap-3 mb-4">
              <h1
                className="fw-bold"
                style={{
                  color: "#facc15",
                  fontSize: window.innerWidth < 768 ? "34px" : "46px",
                }}
              >
                🔒 Premium Notes
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
              {premiumNotes.map((note) => (
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
                      position: "relative",
                      overflow: "hidden",
                      transition: "0.3s",
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

                    <span className="badge bg-warning text-dark mb-4">
                      PREMIUM ACCESS
                    </span>

                    <button
                      className="btn w-100 fw-bold"
                      style={{
                        background: "linear-gradient(to right,#2563eb,#7c3aed)",
                        border: "none",
                        color: "white",
                        borderRadius: "16px",
                        padding: "14px",
                        fontSize: "16px",
                      }}
                      onClick={() => {
                        const token = localStorage.getItem("token");

                        if (!token) {
                          navigate("/login");

                          return;
                        }

                        navigate("/dashboard");
                      }}
                    >
                      Unlock Premium 🚀
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
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

import React, { useEffect, useMemo, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import API from "../services/api";

export default function HomeSubjectNotes() {
  const { name } = useParams();

  const navigate = useNavigate();

  const [notes, setNotes] = useState([]);

  const [search, setSearch] = useState("");

  // FETCH NOTES

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

  // FILTERED NOTES

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
        background: "linear-gradient(135deg,#020617,#071028,#1e1b4b)",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* BACKGROUND GLOW */}

      <div
        style={{
          position: "fixed",
          width: "350px",
          height: "350px",
          background: "#2563eb",
          borderRadius: "50%",
          top: "-100px",
          left: "-100px",
          filter: "blur(120px)",
          opacity: 0.25,
          zIndex: 0,
        }}
      ></div>

      <div
        style={{
          position: "fixed",
          width: "350px",
          height: "350px",
          background: "#7c3aed",
          borderRadius: "50%",
          bottom: "-100px",
          right: "-100px",
          filter: "blur(120px)",
          opacity: 0.25,
          zIndex: 0,
        }}
      ></div>

      {/* NAVBAR */}

      <nav
        className="navbar navbar-dark px-4 py-3"
        style={{
          background: "rgba(255,255,255,0.05)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          position: "sticky",
          top: 0,
          zIndex: 100,
        }}
      >
        <div className="container-fluid">
          <h2
            className="fw-bold text-white m-0"
            style={{
              letterSpacing: "1px",
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
              padding: "10px 20px",
            }}
            onClick={() => navigate("/")}
          >
            Home 🏠
          </button>
        </div>
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
              fontSize: "90px",
            }}
          >
            📂
          </div>

          <h1
            className="fw-bold text-white"
            style={{
              fontSize: "80px",
              letterSpacing: "2px",
            }}
          >
            {name}
          </h1>

          <p
            style={{
              color: "#cbd5e1",
              fontSize: "22px",
            }}
          >
            Explore Free & Premium Engineering Resources 🚀
          </p>
        </div>

        {/* STATS */}

        <div className="row g-4 mb-5">
          <div className="col-md-4">
            <div
              style={{
                background: "rgba(255,255,255,0.06)",
                borderRadius: "28px",
                padding: "30px",
                textAlign: "center",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <div
                style={{
                  fontSize: "55px",
                }}
              >
                📚
              </div>

              <h1
                className="fw-bold text-white mt-2"
                style={{
                  fontSize: "50px",
                }}
              >
                {notes.length}
              </h1>

              <p
                style={{
                  color: "#cbd5e1",
                }}
              >
                Total Notes
              </p>
            </div>
          </div>

          <div className="col-md-4">
            <div
              style={{
                background: "rgba(255,255,255,0.06)",
                borderRadius: "28px",
                padding: "30px",
                textAlign: "center",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <div
                style={{
                  fontSize: "55px",
                }}
              >
                🆓
              </div>

              <h1
                className="fw-bold mt-2"
                style={{
                  color: "#22c55e",
                  fontSize: "50px",
                }}
              >
                {freeNotes.length}
              </h1>

              <p
                style={{
                  color: "#cbd5e1",
                }}
              >
                Free Notes
              </p>
            </div>
          </div>

          <div className="col-md-4">
            <div
              style={{
                background: "rgba(255,255,255,0.06)",
                borderRadius: "28px",
                padding: "30px",
                textAlign: "center",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <div
                style={{
                  fontSize: "55px",
                }}
              >
                🔒
              </div>

              <h1
                className="fw-bold mt-2"
                style={{
                  color: "#facc15",
                  fontSize: "50px",
                }}
              >
                {premiumNotes.length}
              </h1>

              <p
                style={{
                  color: "#cbd5e1",
                }}
              >
                Premium Notes
              </p>
            </div>
          </div>
        </div>

        {/* SEARCH */}

        <div className="mb-5">
          <input
            type="text"
            placeholder="🔍 Search Notes..."
            className="form-control"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              padding: "18px",
              borderRadius: "18px",
              border: "1px solid rgba(255,255,255,0.1)",
              background: "rgba(255,255,255,0.08)",
              color: "white",
              fontSize: "18px",
              backdropFilter: "blur(10px)",
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
                  fontSize: "45px",
                }}
              >
                🆓 Free Notes
              </h1>

              <div
                style={{
                  height: "4px",
                  flex: 1,
                  background: "linear-gradient(to right,#22c55e,transparent)",
                  borderRadius: "10px",
                }}
              ></div>
            </div>

            <div className="row g-4 mb-5">
              {freeNotes.map((note) => (
                <div className="col-md-6 col-lg-4" key={note._id}>
                  <div
                    style={{
                      background: "rgba(255,255,255,0.07)",
                      borderRadius: "30px",
                      padding: "30px",
                      color: "white",
                      backdropFilter: "blur(12px)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      transition: "0.3s",
                      height: "100%",
                      position: "relative",
                      overflow: "hidden",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform =
                        "translateY(-10px) scale(1.02)";

                      e.currentTarget.style.boxShadow =
                        "0 20px 40px rgba(34,197,94,0.25)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform =
                        "translateY(0px) scale(1)";

                      e.currentTarget.style.boxShadow = "none";
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        width: "120px",
                        height: "120px",
                        background: "rgba(34,197,94,0.15)",
                        borderRadius: "50%",
                        top: "-30px",
                        right: "-30px",
                      }}
                    ></div>

                    <div
                      style={{
                        fontSize: "70px",
                      }}
                    >
                      📖
                    </div>

                    <h2 className="fw-bold mt-3">{note.title}</h2>

                    <p
                      style={{
                        color: "#cbd5e1",
                        minHeight: "60px",
                      }}
                    >
                      {note.description}
                    </p>

                    <span className="badge bg-success mb-4">FREE ACCESS</span>

                    <a
                      href={`https://vip-engineer.onrender.com${note.pdf}`}
                      target="_blank"
                      rel="noreferrer"
                      className="btn btn-success w-100 fw-bold"
                      style={{
                        borderRadius: "16px",
                        padding: "14px",
                        fontSize: "17px",
                      }}
                    >
                      Open PDF 🚀
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* PREMIUM NOTES */}

        {premiumNotes.length > 0 && (
          <>
            <div className="d-flex align-items-center gap-3 mb-4">
              <h1
                className="fw-bold"
                style={{
                  color: "#facc15",
                  fontSize: "45px",
                }}
              >
                🔒 Premium Notes
              </h1>

              <div
                style={{
                  height: "4px",
                  flex: 1,
                  background: "linear-gradient(to right,#facc15,transparent)",
                  borderRadius: "10px",
                }}
              ></div>
            </div>

            <div className="row g-4">
              {premiumNotes.map((note) => (
                <div className="col-md-6 col-lg-4" key={note._id}>
                  <div
                    style={{
                      background:
                        "linear-gradient(135deg,rgba(37,99,235,0.15),rgba(124,58,237,0.18))",
                      borderRadius: "30px",
                      padding: "30px",
                      color: "white",
                      backdropFilter: "blur(12px)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      transition: "0.3s",
                      height: "100%",
                      position: "relative",
                      overflow: "hidden",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform =
                        "translateY(-10px) scale(1.02)";

                      e.currentTarget.style.boxShadow =
                        "0 20px 40px rgba(124,58,237,0.35)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform =
                        "translateY(0px) scale(1)";

                      e.currentTarget.style.boxShadow = "none";
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        width: "130px",
                        height: "130px",
                        background: "rgba(255,255,255,0.08)",
                        borderRadius: "50%",
                        top: "-30px",
                        right: "-30px",
                      }}
                    ></div>

                    <div
                      style={{
                        fontSize: "70px",
                      }}
                    >
                      🔒
                    </div>

                    <h2 className="fw-bold mt-3">{note.title}</h2>

                    <p
                      style={{
                        color: "#cbd5e1",
                        minHeight: "60px",
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
                        borderRadius: "16px",
                        padding: "14px",
                        fontSize: "17px",
                        background: "linear-gradient(to right,#2563eb,#7c3aed)",
                        color: "white",
                        border: "none",
                      }}
                      onClick={() => {
                        const token = localStorage.getItem("token");

                        if (!token) {
                          navigate("/login", {
                            state: {
                              message: "Login to access premium dashboard 🔒",
                            },
                          });

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
              borderRadius: "30px",
              padding: "60px",
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

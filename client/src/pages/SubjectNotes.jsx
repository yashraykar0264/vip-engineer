import React, { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import API from "../services/api";

export default function SubjectNotes() {
  const { name } = useParams();

  const navigate = useNavigate();

  const [notes, setNotes] = useState([]);

  const [search, setSearch] = useState("");

  const role = localStorage.getItem("role");

  useEffect(() => {
    fetchNotes();
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

  // BUY PREMIUM

  const handlePremiumClick = (note) => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please Login First 🔒");

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

      alert(response.data.message);

      fetchNotes();
    } catch (error) {
      console.log(error);

      alert("Failed To Delete Note");
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

        background: "linear-gradient(135deg, #020617, #0f172a, #312e81)",

        color: "white",
      }}
    >
      {/* NAVBAR */}

      <nav
        className="navbar navbar-dark px-4 py-3"
        style={{
          background: "rgba(255,255,255,0.05)",

          backdropFilter: "blur(12px)",

          borderBottom: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <h2 className="fw-bold">VIP Engineer 🚀</h2>

        <button
          className="btn btn-light fw-bold"
          onClick={() => navigate("/dashboard")}
        >
          Dashboard
        </button>
      </nav>

      <div className="container py-5">
        {/* HEADER */}

        <div className="text-center mb-5">
          <h1
            className="fw-bold"
            style={{
              fontSize: "65px",
            }}
          >
            📂 {name}
          </h1>

          <p
            style={{
              color: "#cbd5e1",

              fontSize: "20px",
            }}
          >
            Premium Engineering Notes Marketplace 🚀
          </p>
        </div>

        {/* STATS */}

        <div className="row g-4 mb-5">
          <div className="col-md-4">
            <div
              className="p-4 text-center"
              style={{
                background: "rgba(255,255,255,0.08)",

                borderRadius: "25px",
              }}
            >
              <h1>📚</h1>

              <h2 className="fw-bold">{notes.length}</h2>

              <p>Total Notes</p>
            </div>
          </div>

          <div className="col-md-4">
            <div
              className="p-4 text-center"
              style={{
                background: "rgba(255,255,255,0.08)",

                borderRadius: "25px",
              }}
            >
              <h1>🆓</h1>

              <h2 className="fw-bold text-success">{freeNotes.length}</h2>

              <p>Free Notes</p>
            </div>
          </div>

          <div className="col-md-4">
            <div
              className="p-4 text-center"
              style={{
                background: "rgba(255,255,255,0.08)",

                borderRadius: "25px",
              }}
            >
              <h1>🔥</h1>

              <h2 className="fw-bold text-warning">{premiumNotes.length}</h2>

              <p>Premium Notes</p>
            </div>
          </div>
        </div>

        {/* SEARCH */}

        <div className="mb-5">
          <input
            type="text"
            placeholder="🔍 Search Notes..."
            className="form-control p-3"
            style={{
              borderRadius: "18px",

              fontSize: "18px",
            }}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* FREE NOTES */}

        <div className="mb-5">
          <h2 className="fw-bold mb-4 text-success">🆓 Free Notes</h2>

          <div className="row g-4">
            {filteredFree.map((note) => (
              <div className="col-lg-4 col-md-6" key={note._id}>
                <div
                  className="card border-0 shadow-lg h-100"
                  style={{
                    borderRadius: "30px",

                    overflow: "hidden",

                    background: "rgba(255,255,255,0.08)",

                    backdropFilter: "blur(10px)",

                    color: "white",
                  }}
                >
                  <div
                    style={{
                      height: "8px",

                      background: "linear-gradient(to right, #22c55e, #16a34a)",
                    }}
                  ></div>

                  <div className="card-body p-4">
                    <div
                      style={{
                        fontSize: "60px",
                      }}
                    >
                      📖
                    </div>

                    <h3 className="fw-bold mt-3">{note.title}</h3>

                    <p
                      style={{
                        color: "#cbd5e1",
                      }}
                    >
                      {note.description}
                    </p>

                    <span className="badge bg-success px-3 py-2">🆓 FREE</span>

                    <a
                      href={`https://vip-engineer.onrender.com${note.pdf}`}
                      target="_blank"
                      rel="noreferrer"
                      className="btn btn-success w-100 fw-bold mt-4"
                      style={{
                        borderRadius: "14px",

                        padding: "12px",
                      }}
                    >
                      Open PDF 🚀
                    </a>

                    {role === "admin" && (
                      <button
                        className="btn btn-danger w-100 fw-bold mt-3"
                        style={{
                          borderRadius: "14px",

                          padding: "12px",
                        }}
                        onClick={() => handleDeleteNote(note._id)}
                      >
                        Delete 🗑️
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* PREMIUM NOTES */}

        <div>
          <h2 className="fw-bold mb-4 text-warning">🔥 Premium Notes</h2>

          <div className="row g-4">
            {filteredPremium.map((note) => (
              <div className="col-lg-4 col-md-6" key={note._id}>
                <div
                  className="card border-0 shadow-lg h-100"
                  style={{
                    borderRadius: "30px",

                    overflow: "hidden",

                    background: "rgba(255,255,255,0.08)",

                    backdropFilter: "blur(10px)",

                    color: "white",
                  }}
                >
                  <div
                    style={{
                      height: "8px",

                      background: "linear-gradient(to right, #2563eb, #7c3aed)",
                    }}
                  ></div>

                  <div className="card-body p-4">
                    <div
                      style={{
                        fontSize: "60px",
                      }}
                    >
                      📘
                    </div>

                    <h3 className="fw-bold mt-3">{note.title}</h3>

                    <p
                      style={{
                        color: "#cbd5e1",
                      }}
                    >
                      {note.description}
                    </p>

                    <span className="badge bg-danger px-3 py-2">
                      🔒 PREMIUM
                    </span>

                    <h2
                      className="fw-bold mt-3"
                      style={{
                        color: "#60a5fa",
                      }}
                    >
                      ₹{note.price}
                    </h2>

                    <button
                      className="btn btn-light w-100 fw-bold mt-4"
                      style={{
                        borderRadius: "14px",

                        padding: "12px",
                      }}
                      onClick={() => handlePremiumClick(note)}
                    >
                      Buy Premium 🚀
                    </button>

                    {role === "admin" && (
                      <button
                        className="btn btn-danger w-100 fw-bold mt-3"
                        style={{
                          borderRadius: "14px",

                          padding: "12px",
                        }}
                        onClick={() => handleDeleteNote(note._id)}
                      >
                        Delete 🗑️
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* EMPTY */}

        {notes.length === 0 && (
          <div className="text-center mt-5">
            <h2>No Notes Available 😔</h2>
          </div>
        )}
      </div>
    </div>
  );
}

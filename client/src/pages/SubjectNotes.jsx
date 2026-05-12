import React, { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import API from "../services/api";

export default function SubjectNotes() {
  const { name } = useParams();

  const navigate = useNavigate();

  const [notes, setNotes] = useState([]);

  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchNotes();
  }, [name]);

  const fetchNotes = async () => {
    try {
      const response = await API.get("/notes");

      const filtered = response.data.filter((note) => note.subject === name);

      setNotes(filtered);
    } catch (error) {
      console.log(error);
    }
  };

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

  // FREE NOTES

  const freeNotes = notes.filter((note) => note.price === 0);

  // PREMIUM NOTES

  const premiumNotes = notes.filter((note) => note.price > 0);

  // SEARCH FILTER

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
        background: "linear-gradient(to right, #e2e8f0, #f8fafc)",
      }}
    >
      {/* NAVBAR */}

      <nav
        className="navbar navbar-dark px-4 py-3"
        style={{
          background: "linear-gradient(to right, #020617, #0f172a)",
        }}
      >
        <h2 className="text-white fw-bold">VIP Engineer 🚀</h2>

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
            📂 {name} Notes
          </h1>

          <p className="text-secondary fs-4 mt-3">
            Placement focused notes and PDFs 🚀
          </p>
        </div>

        {/* SEARCH */}

        <div className="mb-5">
          <input
            type="text"
            placeholder="🔍 Search Notes..."
            className="form-control p-3 shadow-sm"
            style={{
              borderRadius: "16px",
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
              <div className="col-md-4" key={note._id}>
                <div
                  className="card border-0 shadow-lg h-100"
                  style={{
                    borderRadius: "24px",
                  }}
                >
                  <div
                    style={{
                      height: "10px",
                      background: "linear-gradient(to right, #22c55e, #16a34a)",
                    }}
                  ></div>

                  <div className="card-body p-4">
                    <div
                      style={{
                        fontSize: "55px",
                      }}
                    >
                      📖
                    </div>

                    <h3 className="fw-bold mt-3">{note.title}</h3>

                    <p className="text-secondary mt-3">{note.description}</p>

                    <span
                      className="badge bg-success px-3 py-2 mt-3"
                      style={{
                        fontSize: "16px",
                        borderRadius: "10px",
                      }}
                    >
                      🆓 FREE ACCESS
                    </span>

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
                      Open Free PDF 🚀
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* PREMIUM NOTES */}

        <div className="mb-5">
          <h2 className="fw-bold mb-4 text-primary">🔒 Premium Notes</h2>

          <div className="row g-4">
            {filteredPremium.map((note) => (
              <div className="col-md-4" key={note._id}>
                <div
                  className="card border-0 shadow-lg h-100"
                  style={{
                    borderRadius: "24px",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      height: "10px",
                      background: "linear-gradient(to right, #2563eb, #7c3aed)",
                    }}
                  ></div>

                  <div className="card-body p-4">
                    <div
                      style={{
                        fontSize: "55px",
                      }}
                    >
                      📘
                    </div>

                    <h3 className="fw-bold mt-3">{note.title}</h3>

                    <p className="text-secondary mt-3">{note.description}</p>

                    <span
                      className="badge bg-danger px-3 py-2"
                      style={{
                        fontSize: "16px",
                        borderRadius: "10px",
                      }}
                    >
                      🔥 PREMIUM
                    </span>

                    <h4
                      className="fw-bold mt-3"
                      style={{
                        color: "#2563eb",
                      }}
                    >
                      ₹{note.price}
                    </h4>

                    <button
                      className="btn btn-dark w-100 fw-bold mt-4"
                      style={{
                        borderRadius: "14px",
                        padding: "12px",
                      }}
                      onClick={() => handlePremiumClick(note)}
                    >
                      Buy Premium 🔒
                    </button>
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

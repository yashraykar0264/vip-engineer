import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import API from "../services/api";

export default function Dashboard() {
  const [notes, setNotes] = useState([]);

  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  const role = localStorage.getItem("role");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/");
      return;
    }

    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const response = await API.get("/notes");

      setNotes(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = () => {
    localStorage.clear();

    navigate("/");
  };

  // GROUP SUBJECTS

  const groupedNotes = notes.reduce((acc, note) => {
    const subject = note.subject || "Other";

    if (!acc[subject]) {
      acc[subject] = [];
    }

    acc[subject].push(note);

    return acc;
  }, {});

  const subjects = Object.keys(groupedNotes);

  // SEARCH SUBJECTS

  const filteredSubjects = subjects.filter((subject) =>
    subject.toLowerCase().includes(search.toLowerCase()),
  );

  // STATS

  const freeNotes = notes.filter((note) => note.price === 0).length;

  const premiumNotes = notes.filter((note) => note.price > 0).length;

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
        className="navbar navbar-expand-lg px-4 py-3"
        style={{
          background: "rgba(255,255,255,0.05)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <div className="container-fluid">
          <h2 className="fw-bold m-0">VIP Engineer 🚀</h2>

          <div className="d-flex gap-3 flex-wrap">
            {role === "admin" && (
              <>
                <button
                  className="btn btn-warning fw-bold"
                  onClick={() => navigate("/add-note")}
                >
                  Add Note ➕
                </button>

                <button
                  className="btn btn-info fw-bold"
                  onClick={() => navigate("/admin-requests")}
                >
                  Requests 💳
                </button>
              </>
            )}

            <button
              className="btn btn-light fw-bold"
              onClick={() => navigate("/my-purchases")}
            >
              My Purchases 📚
            </button>

            <button
              className="btn btn-light fw-bold"
              onClick={() => navigate("/profile")}
            >
              Profile 👤
            </button>

            <button className="btn btn-danger fw-bold" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="container py-5">
        {/* HERO */}

        <div className="text-center mb-5">
          <h1
            className="fw-bold"
            style={{
              fontSize: "70px",
            }}
          >
            VIP Engineer 📚
          </h1>

          <p
            className="mt-3"
            style={{
              color: "#cbd5e1",
              fontSize: "22px",
            }}
          >
            Premium Notes Marketplace For Engineers 🚀
          </p>
        </div>

        {/* STATS */}

        <div className="row g-4 mb-5">
          <div className="col-md-4">
            <div
              className="p-4"
              style={{
                background: "rgba(255,255,255,0.08)",
                borderRadius: "25px",
                textAlign: "center",
              }}
            >
              <h1>📚</h1>

              <h2 className="fw-bold">{notes.length}</h2>

              <p>Total Notes</p>
            </div>
          </div>

          <div className="col-md-4">
            <div
              className="p-4"
              style={{
                background: "rgba(255,255,255,0.08)",
                borderRadius: "25px",
                textAlign: "center",
              }}
            >
              <h1>🆓</h1>

              <h2 className="fw-bold text-success">{freeNotes}</h2>

              <p>Free Notes</p>
            </div>
          </div>

          <div className="col-md-4">
            <div
              className="p-4"
              style={{
                background: "rgba(255,255,255,0.08)",
                borderRadius: "25px",
                textAlign: "center",
              }}
            >
              <h1>🔥</h1>

              <h2 className="fw-bold text-warning">{premiumNotes}</h2>

              <p>Premium Notes</p>
            </div>
          </div>
        </div>

        {/* SEARCH */}

        <div className="mb-5">
          <input
            type="text"
            placeholder="🔍 Search Subjects..."
            className="form-control p-3"
            style={{
              borderRadius: "18px",
              fontSize: "18px",
            }}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* TRENDING */}

        <div className="mb-5">
          <h2 className="fw-bold mb-4">🔥 Trending Subjects</h2>

          <div className="d-flex flex-wrap gap-3">
            {subjects.slice(0, 5).map((subject) => (
              <button
                key={subject}
                className="btn btn-warning fw-bold"
                style={{
                  borderRadius: "14px",
                  padding: "10px 18px",
                }}
                onClick={() => navigate(`/subject/${subject}`)}
              >
                {subject}
              </button>
            ))}
          </div>
        </div>

        {/* SUBJECT FOLDERS */}

        <div className="row g-4">
          {filteredSubjects.map((subject) => (
            <div className="col-lg-4 col-md-6" key={subject}>
              <div
                onClick={() => navigate(`/subject/${subject}`)}
                style={{
                  cursor: "pointer",

                  background: "rgba(255,255,255,0.08)",

                  borderRadius: "30px",

                  padding: "35px",

                  border: "1px solid rgba(255,255,255,0.1)",

                  backdropFilter: "blur(10px)",

                  transition: "0.3s",

                  height: "100%",
                }}
              >
                <div
                  style={{
                    fontSize: "80px",
                  }}
                >
                  📂
                </div>

                <h1
                  className="fw-bold mt-3"
                  style={{
                    fontSize: "40px",
                  }}
                >
                  {subject}
                </h1>

                <p
                  style={{
                    color: "#cbd5e1",

                    marginTop: "15px",

                    fontSize: "18px",
                  }}
                >
                  {groupedNotes[subject].length} Notes Available
                </p>

                <div className="d-flex gap-2 mt-3">
                  <span className="badge bg-success">
                    {groupedNotes[subject].filter((n) => n.price === 0).length}{" "}
                    Free
                  </span>

                  <span className="badge bg-danger">
                    {groupedNotes[subject].filter((n) => n.price > 0).length}{" "}
                    Premium
                  </span>
                </div>

                <button
                  className="btn btn-light fw-bold mt-4"
                  style={{
                    borderRadius: "14px",
                    padding: "10px 20px",
                  }}
                >
                  Open Folder 🚀
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* EMPTY */}

        {filteredSubjects.length === 0 && (
          <div className="text-center mt-5">
            <h3
              style={{
                color: "#cbd5e1",
              }}
            >
              No Subjects Found 😔
            </h3>
          </div>
        )}
      </div>
    </div>
  );
}

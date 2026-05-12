import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import API from "../services/api";

export default function Dashboard() {
  const [notes, setNotes] = useState([]);

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

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0f172a, #1e293b, #312e81)",
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

      {/* HERO */}

      <div className="container py-5">
        <div className="text-center mb-5">
          <h1
            className="fw-bold"
            style={{
              fontSize: "65px",
            }}
          >
            Premium Engineering Notes 📚
          </h1>

          <p
            className="mt-3"
            style={{
              color: "#cbd5e1",
              fontSize: "20px",
            }}
          >
            Open Subject Folders & Explore Notes 🚀
          </p>
        </div>

        {/* SUBJECT FOLDERS */}

        <div className="row g-4">
          {subjects.map((subject) => (
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

        {subjects.length === 0 && (
          <div className="text-center mt-5">
            <h3
              style={{
                color: "#cbd5e1",
              }}
            >
              No Subjects Available 😔
            </h3>
          </div>
        )}
      </div>
    </div>
  );
}

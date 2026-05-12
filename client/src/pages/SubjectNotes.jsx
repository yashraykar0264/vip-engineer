import React, { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import API from "../services/api";

export default function SubjectNotes() {
  const { name } = useParams();

  const navigate = useNavigate();

  const [notes, setNotes] = useState([]);

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

        <button className="btn btn-light fw-bold" onClick={() => navigate("/")}>
          Back
        </button>
      </nav>

      {/* HEADER */}

      <div className="container py-5">
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
            Premium handwritten notes and PDFs 🚀
          </p>
        </div>

        {/* NOTES */}

        <div className="row g-4">
          {notes.map((note) => (
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
                      fontSize: "60px",
                    }}
                  >
                    📘
                  </div>

                  <h3 className="fw-bold mt-3">{note.title}</h3>

                  <p className="text-secondary mt-3">{note.description}</p>

                  <h4
                    className="fw-bold mt-4"
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
                    Buy Now 🚀
                  </button>
                </div>
              </div>
            </div>
          ))}
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

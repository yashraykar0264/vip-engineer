import React from "react";

import { Link, useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  const isLoggedIn = localStorage.getItem("token");

  const handlePremiumClick = () => {
    if (!isLoggedIn) {
      alert("Please Login To Access Premium Notes 🔒");

      navigate("/login");

      return;
    }

    navigate("/dashboard");
  };

  const freeNotes = [
    {
      title: "CN Quick Revision",
      desc: "Important CN viva and exam shortcuts PDF.",
      price: "FREE",
      emoji: "🌐",
    },

    {
      title: "DBMS Viva Notes",
      desc: "Most asked DBMS viva questions and answers.",
      price: "FREE",
      emoji: "🗂️",
    },

    {
      title: "Aptitude Cheatsheet",
      desc: "Placement aptitude tricks and formulas.",
      price: "FREE",
      emoji: "🧠",
    },
  ];

  const premiumNotes = [
    {
      title: "DSA Master Notes",
      desc: "Handwritten placement focused DSA notes.",
      price: "₹49",
      emoji: "🔥",
    },

    {
      title: "OOP Premium Notes",
      desc: "Easy OOP concepts with diagrams and examples.",
      price: "₹29",
      emoji: "💻",
    },

    {
      title: "AI/ML Crash Course",
      desc: "Short and smart AI/ML revision notes.",
      price: "₹59",
      emoji: "🤖",
    },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to right, #e2e8f0, #f8fafc)",
      }}
    >
      {/* NAVBAR */}

      <nav
        className="navbar navbar-expand-lg navbar-dark px-4 py-3"
        style={{
          background: "linear-gradient(to right, #020617, #0f172a)",
          boxShadow: "0 2px 15px rgba(0,0,0,0.2)",
        }}
      >
        <div className="container-fluid">
          <h2 className="text-white fw-bold m-0">VIP Engineer 🚀</h2>

          <div>
            <Link
              to="/login"
              className="btn btn-warning fw-bold me-2"
              style={{
                borderRadius: "12px",
              }}
            >
              Login
            </Link>

            <Link
              to="/signup"
              className="btn btn-primary fw-bold"
              style={{
                borderRadius: "12px",
              }}
            >
              Signup
            </Link>
          </div>
        </div>
      </nav>

      {/* HERO */}

      <div className="container text-center py-5">
        <h1
          className="fw-bold"
          style={{
            fontSize: "75px",
            color: "#020617",
            marginTop: "40px",
          }}
        >
          VIP Engineer
        </h1>

        <h2
          className="fw-bold"
          style={{
            fontSize: "50px",
            color: "#1e293b",
            marginTop: "10px",
          }}
        >
          Notes For Real Engineers 😎
        </h2>

        <div
          style={{
            fontSize: "90px",
            marginTop: "10px",
          }}
        >
          📚🚀💻
        </div>

        <p
          className="mx-auto mt-4"
          style={{
            maxWidth: "900px",
            fontSize: "24px",
            color: "#475569",
            lineHeight: "42px",
          }}
        >
          Placement focused notes, handwritten PDFs, viva preparation, DSA
          tricks and quick revision notes specially designed for engineering
          students 🔥
        </p>

        {/* TAGS */}

        {/* SUBJECT FOLDERS */}

        <div className="mt-5">
          <h1 className="fw-bold mb-4">Explore Subjects 📂</h1>

          <div className="row g-4 justify-content-center">
            {[
              {
                name: "DSA",
                emoji: "🔥",
                color: "#0f172a",
              },

              {
                name: "DBMS",
                emoji: "🗂️",
                color: "#2563eb",
              },

              {
                name: "CN",
                emoji: "🌐",
                color: "#16a34a",
              },

              {
                name: "OS",
                emoji: "💻",
                color: "#dc2626",
              },

              {
                name: "AI/ML",
                emoji: "🤖",
                color: "#7c3aed",
              },

              {
                name: "JAVA",
                emoji: "☕",
                color: "#ea580c",
              },
            ].map((subject, index) => (
              <div className="col-md-4 col-lg-3" key={index}>
                <div
                  onClick={() => {
                    if (!isLoggedIn) {
                      navigate("/login", {
                        state: {
                          message:
                            "Please login/signup first to access notes 🔒",
                        },
                      });

                      return;
                    }

                    navigate(`/subject/${subject.name}`);
                  }}
                  className="card border-0 shadow-lg h-100 text-white"
                  style={{
                    borderRadius: "24px",
                    cursor: "pointer",
                    background: subject.color,
                    transition: "0.3s",
                  }}
                >
                  <div className="card-body text-center p-5">
                    <div
                      style={{
                        fontSize: "65px",
                      }}
                    >
                      📂
                    </div>

                    <h2 className="fw-bold mt-3">{subject.name}</h2>

                    <div
                      style={{
                        fontSize: "30px",
                      }}
                    >
                      {subject.emoji}
                    </div>

                    <p className="mt-3">Open {subject.name} Notes</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}

        <div className="mt-5">
          <Link
            to="/signup"
            className="btn btn-primary btn-lg px-5 py-3 fw-bold me-3"
            style={{
              borderRadius: "16px",
            }}
          >
            Get Started 🚀
          </Link>

          <Link
            to="/login"
            className="btn btn-dark btn-lg px-5 py-3 fw-bold"
            style={{
              borderRadius: "16px",
            }}
          >
            Login
          </Link>
        </div>

        {/* STATS */}

        <div className="row mt-5 g-4">
          <div className="col-md-4">
            <div
              className="card border-0 shadow-lg p-4"
              style={{
                borderRadius: "20px",
              }}
            >
              <h1 className="fw-bold text-primary">500+</h1>

              <h5>Students</h5>
            </div>
          </div>

          <div className="col-md-4">
            <div
              className="card border-0 shadow-lg p-4"
              style={{
                borderRadius: "20px",
              }}
            >
              <h1 className="fw-bold text-success">100+</h1>

              <h5>Premium PDFs</h5>
            </div>
          </div>

          <div className="col-md-4">
            <div
              className="card border-0 shadow-lg p-4"
              style={{
                borderRadius: "20px",
              }}
            >
              <h1 className="fw-bold text-danger">24/7</h1>

              <h5>Exam Support</h5>
            </div>
          </div>
        </div>

        {/* FREE NOTES */}

        <div className="mt-5">
          <h1 className="fw-bold">Free Notes 📖</h1>

          <p className="text-secondary fs-5">
            Free sample notes for every student
          </p>

          <div className="row mt-4 g-4">
            {freeNotes.map((note, index) => (
              <div className="col-md-4" key={index}>
                <div
                  className="card border-0 shadow-lg h-100"
                  style={{
                    borderRadius: "22px",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      height: "10px",
                      background: "linear-gradient(to right, #22c55e, #16a34a)",
                    }}
                  ></div>

                  <div className="card-body p-4">
                    <div style={{ fontSize: "50px" }}>{note.emoji}</div>

                    <h3 className="fw-bold mt-3">{note.title}</h3>

                    <p className="text-secondary">{note.desc}</p>

                    <h4 className="fw-bold text-success">{note.price}</h4>

                    <button
                      className="btn btn-success w-100 fw-bold mt-3"
                      style={{
                        borderRadius: "14px",
                        padding: "12px",
                      }}
                    >
                      View Free 🚀
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* PREMIUM NOTES */}

        <div className="mt-5">
          <h1 className="fw-bold">Premium Notes 🔥</h1>

          <p className="text-secondary fs-5">
            High quality premium handwritten notes
          </p>

          <div className="row mt-4 g-4">
            {premiumNotes.map((note, index) => (
              <div className="col-md-4" key={index}>
                <div
                  className="card border-0 shadow-lg h-100"
                  style={{
                    borderRadius: "22px",
                    overflow: "hidden",
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      height: "10px",
                      background: "linear-gradient(to right, #2563eb, #7c3aed)",
                    }}
                  ></div>

                  <span
                    className="badge bg-warning text-dark"
                    style={{
                      position: "absolute",
                      top: "18px",
                      right: "18px",
                      padding: "10px",
                      fontSize: "14px",
                    }}
                  >
                    PREMIUM 🔒
                  </span>

                  <div className="card-body p-4">
                    <div
                      style={{
                        fontSize: "50px",
                        filter: "blur(1px)",
                      }}
                    >
                      {note.emoji}
                    </div>

                    <h3 className="fw-bold mt-3">{note.title}</h3>

                    <p className="text-secondary">{note.desc}</p>

                    <h4
                      className="fw-bold"
                      style={{
                        color: "#2563eb",
                      }}
                    >
                      {note.price}
                    </h4>

                    <button
                      onClick={handlePremiumClick}
                      className="btn btn-dark w-100 fw-bold mt-3"
                      style={{
                        borderRadius: "14px",
                        padding: "12px",
                      }}
                    >
                      View Premium 🔒
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* WHY VIP ENGINEER */}

        <div className="mt-5">
          <h1 className="fw-bold">Why VIP Engineer? 🚀</h1>

          <div className="row mt-4 g-4">
            <div className="col-md-4">
              <div
                className="card border-0 shadow-lg p-4 h-100"
                style={{
                  borderRadius: "20px",
                }}
              >
                <div style={{ fontSize: "60px" }}>📖</div>

                <h3 className="fw-bold mt-3">Handwritten Notes</h3>

                <p className="text-secondary">
                  Easy language handwritten notes for quick understanding.
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div
                className="card border-0 shadow-lg p-4 h-100"
                style={{
                  borderRadius: "20px",
                }}
              >
                <div style={{ fontSize: "60px" }}>⚡</div>

                <h3 className="fw-bold mt-3">Quick Revision</h3>

                <p className="text-secondary">
                  Last minute preparation PDFs and revision notes.
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div
                className="card border-0 shadow-lg p-4 h-100"
                style={{
                  borderRadius: "20px",
                }}
              >
                <div style={{ fontSize: "60px" }}>💻</div>

                <h3 className="fw-bold mt-3">Placement Focused</h3>

                <p className="text-secondary">
                  DSA, aptitude and interview focused study material.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* FOOTER */}

        <footer
          className="text-center text-white py-4 mt-5"
          style={{
            background: "linear-gradient(to right, #020617, #0f172a)",
            borderRadius: "20px",
          }}
        >
          <h5 className="fw-bold">VIP Engineer © 2026</h5>

          <p className="m-0 text-light">Built For Engineers ❤️</p>
        </footer>
      </div>
    </div>
  );
}

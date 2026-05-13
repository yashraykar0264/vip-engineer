import React, { useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import API from "../services/api";

export default function Home() {
  const navigate = useNavigate();

  const isLoggedIn = localStorage.getItem("token");

  const [subjects, setSubjects] = useState([]);

  // FETCH EXPLORE SUBJECTS

  useEffect(() => {
    fetchSubjects();
  }, []);

  const fetchSubjects = async () => {
    try {
      const response = await API.get("/explore-subjects");

      setSubjects(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  // PREMIUM CLICK

  const handlePremiumClick = () => {
    if (!isLoggedIn) {
      navigate("/login", {
        state: {
          message: "Please login/signup first 🔒",
        },
      });

      return;
    }

    navigate("/dashboard");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #020617 0%, #0f172a 45%, #1e1b4b 100%)",
        overflow: "hidden",
      }}
    >
      {/* BACKGROUND BLURS */}

      <div
        style={{
          position: "fixed",
          width: "350px",
          height: "350px",
          background: "#2563eb",
          borderRadius: "50%",
          top: "-120px",
          left: "-120px",
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
          bottom: "-120px",
          right: "-120px",
          filter: "blur(120px)",
          opacity: 0.25,
          zIndex: 0,
        }}
      ></div>

      {/* NAVBAR */}

      <nav
        className="navbar navbar-expand-lg navbar-dark px-4 py-3"
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
            className="fw-bold m-0"
            style={{
              color: "white",
              letterSpacing: "1px",
            }}
          >
            VIP Engineer 🚀
          </h2>

          <div className="d-flex gap-2">
            {!isLoggedIn ? (
              <>
                <Link
                  to="/login"
                  className="btn fw-bold"
                  style={{
                    background: "#facc15",
                    color: "#020617",
                    borderRadius: "14px",
                    padding: "10px 22px",
                    border: "none",
                  }}
                >
                  Login
                </Link>

                <Link
                  to="/signup"
                  className="btn fw-bold"
                  style={{
                    background: "linear-gradient(to right, #2563eb, #7c3aed)",
                    color: "white",
                    borderRadius: "14px",
                    padding: "10px 22px",
                    border: "none",
                  }}
                >
                  Signup
                </Link>
              </>
            ) : (
              <button
                className="btn fw-bold"
                style={{
                  background: "linear-gradient(to right, #2563eb, #7c3aed)",
                  color: "white",
                  borderRadius: "14px",
                  padding: "10px 22px",
                  border: "none",
                }}
                onClick={() => navigate("/dashboard")}
              >
                Dashboard 🚀
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* HERO */}

      <div
        className="container text-center"
        style={{
          paddingTop: "100px",
          paddingBottom: "80px",
          position: "relative",
          zIndex: 2,
        }}
      >
        <div
          style={{
            display: "inline-block",
            background: "rgba(255,255,255,0.08)",
            color: "#cbd5e1",
            padding: "10px 22px",
            borderRadius: "999px",
            marginBottom: "30px",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255,255,255,0.08)",
            fontWeight: "bold",
          }}
        >
          🚀 India's Smartest Engineering Notes Platform
        </div>

        <h1
          className="fw-bold"
          style={{
            fontSize: "90px",
            color: "white",
            lineHeight: "100px",
            letterSpacing: "2px",
          }}
        >
          VIP Engineer
        </h1>

        <h2
          className="fw-bold mt-3"
          style={{
            fontSize: "42px",
            color: "#cbd5e1",
          }}
        >
          Notes For Real Engineers 😎
        </h2>

        <p
          className="mx-auto mt-4"
          style={{
            maxWidth: "950px",
            fontSize: "22px",
            color: "#94a3b8",
            lineHeight: "42px",
          }}
        >
          Premium handwritten PDFs, placement focused DSA notes, viva
          preparation, quick revision cheatsheets and smart engineering content
          designed for students 🚀
        </p>

        {/* BUTTONS */}

        <div className="mt-5 d-flex justify-content-center gap-3 flex-wrap">
          <button
            onClick={() => navigate("/dashboard")}
            className="btn fw-bold"
            style={{
              background: "linear-gradient(to right, #2563eb, #7c3aed)",
              color: "white",
              borderRadius: "18px",
              padding: "16px 34px",
              border: "none",
              fontSize: "18px",
              boxShadow: "0 10px 30px rgba(37,99,235,0.35)",
            }}
          >
            Explore Dashboard 🚀
          </button>

          <button
            onClick={handlePremiumClick}
            className="btn fw-bold"
            style={{
              background: "rgba(255,255,255,0.08)",
              color: "white",
              borderRadius: "18px",
              padding: "16px 34px",
              border: "1px solid rgba(255,255,255,0.08)",
              fontSize: "18px",
              backdropFilter: "blur(10px)",
            }}
          >
            Premium Notes 🔥
          </button>
        </div>

        {/* STATS */}

        <div className="row mt-5 g-4">
          <div className="col-md-4">
            <div
              style={{
                background: "rgba(255,255,255,0.06)",
                borderRadius: "28px",
                padding: "35px",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <h1
                className="fw-bold"
                style={{
                  color: "#60a5fa",
                  fontSize: "55px",
                }}
              >
                500+
              </h1>

              <h5
                style={{
                  color: "#cbd5e1",
                }}
              >
                Students
              </h5>
            </div>
          </div>

          <div className="col-md-4">
            <div
              style={{
                background: "rgba(255,255,255,0.06)",
                borderRadius: "28px",
                padding: "35px",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <h1
                className="fw-bold"
                style={{
                  color: "#22c55e",
                  fontSize: "55px",
                }}
              >
                100+
              </h1>

              <h5
                style={{
                  color: "#cbd5e1",
                }}
              >
                Premium PDFs
              </h5>
            </div>
          </div>

          <div className="col-md-4">
            <div
              style={{
                background: "rgba(255,255,255,0.06)",
                borderRadius: "28px",
                padding: "35px",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <h1
                className="fw-bold"
                style={{
                  color: "#facc15",
                  fontSize: "55px",
                }}
              >
                24/7
              </h1>

              <h5
                style={{
                  color: "#cbd5e1",
                }}
              >
                Exam Support
              </h5>
            </div>
          </div>
        </div>

        {/* SUBJECTS */}

        <div className="mt-5 pt-5">
          <h1
            className="fw-bold mb-3"
            style={{
              fontSize: "60px",
              color: "white",
            }}
          >
            Explore Subjects 📂
          </h1>

          <p
            style={{
              color: "#94a3b8",
              fontSize: "20px",
            }}
          >
            Smart categories created by admin 🚀
          </p>

          <div className="row g-4 mt-4 justify-content-center">
            {subjects.map((subject) => (
              <div className="col-md-4 col-lg-3" key={subject._id}>
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

                    navigate(`/subject/${subject.title}`);
                  }}
                  className="h-100"
                  style={{
                    background: subject.color,
                    borderRadius: "32px",
                    padding: "40px 25px",
                    cursor: "pointer",
                    transition: "0.3s",
                    color: "white",
                    boxShadow: "0 20px 40px rgba(0,0,0,0.25)",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      width: "120px",
                      height: "120px",
                      background: "rgba(255,255,255,0.1)",
                      borderRadius: "50%",
                      top: "-30px",
                      right: "-30px",
                    }}
                  ></div>

                  <div
                    style={{
                      fontSize: "75px",
                    }}
                  >
                    {subject.emoji}
                  </div>

                  <h2 className="fw-bold mt-4">{subject.title}</h2>

                  <p
                    className="mt-3"
                    style={{
                      color: "rgba(255,255,255,0.85)",
                    }}
                  >
                    Open premium notes and study materials 🚀
                  </p>

                  <button
                    className="btn fw-bold mt-4"
                    style={{
                      background: "rgba(255,255,255,0.15)",
                      color: "white",
                      borderRadius: "14px",
                      border: "1px solid rgba(255,255,255,0.2)",
                      padding: "12px 22px",
                    }}
                  >
                    Explore →
                  </button>
                </div>
              </div>
            ))}
          </div>

          {subjects.length === 0 && (
            <div
              className="mt-5"
              style={{
                background: "rgba(255,255,255,0.06)",
                borderRadius: "30px",
                padding: "50px",
                color: "#cbd5e1",
              }}
            >
              <h2>No Subjects Added Yet 😔</h2>
            </div>
          )}
        </div>

        {/* FOOTER */}

        <footer
          className="mt-5"
          style={{
            paddingTop: "80px",
            color: "#94a3b8",
          }}
        >
          <h4 className="fw-bold text-white">VIP Engineer © 2026</h4>

          <p>Built For Engineers ❤️</p>
        </footer>
      </div>
    </div>
  );
}

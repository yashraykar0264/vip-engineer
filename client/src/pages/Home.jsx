import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import API from "../services/api";

export default function Home() {
  const navigate = useNavigate();

  const [folders, setFolders] = useState([]);

  useEffect(() => {
    fetchFolders();
  }, []);

  // FETCH HOME FOLDERS

  const fetchFolders = async () => {
    try {
      const response = await API.get("/home-folders");

      setFolders(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top left, #172554 0%, #020617 40%, #1e1b4b 100%)",
        color: "white",
        //overflowX: "hidden",
      }}
    >
      {/* NAVBAR */}

      <nav
        className="d-flex justify-content-between align-items-center px-3 px-md-5 py-1"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          zIndex: 9999,
          background: "rgba(15,23,42,0.85)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          boxShadow: "0 4px 20px rgba(0,0,0,0.25)",
        }}
      >
        <div
          style={{
            paddingTop: "80px",
          }}
        ></div>
        <h2
          className="fw-bold m-0"
          style={{
            fontSize: window.innerWidth < 768 ? "24px" : "32px",
          }}
        >
          VIP Engineer 🚀
        </h2>

        <div className="d-flex gap-2">
          <button
            className="btn fw-bold"
            style={{
              background: "#facc15",
              color: "#000",
              borderRadius: "14px",
              padding: "10px 22px",
              border: "none",
            }}
            onClick={() => navigate("/login")}
          >
            Login
          </button>

          <button
            className="btn fw-bold"
            style={{
              background: "linear-gradient(to right, #2563eb, #7c3aed)",
              color: "white",
              borderRadius: "14px",
              padding: "10px 22px",
              border: "none",
              width: "100%",
              boxShadow: "0 4px 20px rgba(0,0,0,0.25)",
            }}
            onClick={() => navigate("/signup")}
          >
            Signup
          </button>
        </div>
      </nav>

      {/* HERO */}

      <div className="container py-5">
        <div className="text-center">
          <div
            style={{
              display: "inline-block",
              padding: "10px 24px",
              borderRadius: "999px",
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.08)",
              fontSize: "14px",
              marginBottom: "30px",
            }}
          >
            🚀 India’s Smartest Engineering Notes Platform
          </div>

          <h1
            className="fw-bold"
            style={{
              fontSize: window.innerWidth < 768 ? "55px" : "110px",
              lineHeight: "1",
            }}
          >
            VIP Engineer
          </h1>

          <h2
            className="fw-bold mt-3"
            style={{
              color: "#cbd5e1",
              fontSize: window.innerWidth < 768 ? "28px" : "55px",
            }}
          >
            Notes For Real Engineers 😎
          </h2>

          <p
            className="mx-auto mt-4"
            style={{
              maxWidth: "850px",
              color: "#94a3b8",
              fontSize: window.innerWidth < 768 ? "16px" : "22px",
              lineHeight: "1.8",
            }}
          >
            Premium handwritten PDFs, placement focused DSA notes, viva
            preparation, quick revision cheatsheets and smart engineering
            content designed for students 🚀
          </p>

          <div className="d-flex justify-content-center flex-wrap gap-3 mt-5">
            <button
              className="btn fw-bold"
              style={{
                background: "linear-gradient(to right, #2563eb, #7c3aed)",
                color: "white",
                borderRadius: "18px",
                padding: "16px 34px",
                border: "none",
                fontSize: "18px",
                boxShadow: "0 0 25px rgba(99,102,241,0.5)",
              }}
              onClick={() => {
                document.getElementById("explore").scrollIntoView({
                  behavior: "smooth",
                });
              }}
            >
              Explore Subjects 🚀
            </button>

            <button
              className="btn fw-bold"
              style={{
                background: "rgba(255,255,255,0.08)",
                color: "white",
                borderRadius: "18px",
                padding: "16px 34px",
                border: "1px solid rgba(255,255,255,0.08)",
                fontSize: "18px",
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
              Premium Notes 🔥
            </button>
          </div>
        </div>

        {/* STATS */}

        <div className="row g-4 mt-5">
          {[
            {
              number: "500+",
              title: "Students",
              color: "#60a5fa",
            },

            {
              number: "100+",
              title: "Premium PDFs",
              color: "#22c55e",
            },

            {
              number: "24/7",
              title: "Exam Support",
              color: "#facc15",
            },
          ].map((item, index) => (
            <div className="col-lg-4 col-md-6" key={index}>
              <div
                className="h-100 text-center"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  backdropFilter: "blur(12px)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "28px",
                  padding: "45px 20px",
                  transition: "0.3s",
                }}
              >
                <h1
                  className="fw-bold"
                  style={{
                    fontSize: "60px",
                    color: item.color,
                  }}
                >
                  {item.number}
                </h1>

                <h4
                  className="fw-semibold mt-3"
                  style={{
                    color: "#cbd5e1",
                  }}
                >
                  {item.title}
                </h4>
              </div>
            </div>
          ))}
        </div>

        {/* SUBJECTS */}

        <div className="mt-5 pt-5" id="explore">
          <div className="text-center mb-5">
            <h1
              className="fw-bold"
              style={{
                fontSize: window.innerWidth < 768 ? "45px" : "75px",
              }}
            >
              Explore Subjects 📂
            </h1>

            <p
              style={{
                color: "#94a3b8",
                fontSize: "18px",
              }}
            >
              Smart categories created by admin 🚀
            </p>
          </div>

          <div className="row g-4 justify-content-center">
            {folders.map((folder) => (
              <div className="col-xl-3 col-lg-4 col-md-6" key={folder._id}>
                <div
                  onClick={() => navigate(`/home-subject/${folder.name}`)}
                  style={{
                    cursor: "pointer",
                    background: `linear-gradient(135deg, ${folder.color}, #111827)`,
                    borderRadius: "35px",
                    padding: "35px 25px",
                    height: "100%",
                    position: "relative",
                    overflow: "hidden",
                    transition: "0.3s",
                    border: "1px solid rgba(255,255,255,0.08)",
                    boxShadow: "0 0 30px rgba(0,0,0,0.25)",
                  }}
                >
                  {/* GLOW */}

                  <div
                    style={{
                      position: "absolute",
                      width: "120px",
                      height: "120px",
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
                    {folder.emoji}
                  </div>

                  <h2
                    className="fw-bold mt-4"
                    style={{
                      fontSize: "38px",
                    }}
                  >
                    {folder.name}
                  </h2>

                  <p
                    style={{
                      color: "#e2e8f0",
                      lineHeight: "1.7",
                      minHeight: "70px",
                    }}
                  >
                    Explore curated engineering notes, PDFs & premium resources
                    🚀
                  </p>

                  <button
                    className="btn w-100 fw-bold mt-3"
                    style={{
                      background: "rgba(255,255,255,0.12)",
                      color: "white",
                      borderRadius: "16px",
                      border: "1px solid rgba(255,255,255,0.08)",
                      padding: "14px",
                    }}
                  >
                    Explore →
                  </button>
                </div>
              </div>
            ))}
          </div>

          {folders.length === 0 && (
            <div
              className="text-center mt-5"
              style={{
                background: "rgba(255,255,255,0.06)",
                borderRadius: "30px",
                padding: "60px 20px",
              }}
            >
              <h2
                style={{
                  color: "#cbd5e1",
                }}
              >
                No Subjects Added Yet 😔
              </h2>
            </div>
          )}
        </div>

        {/* FOOTER */}

        <div className="text-center mt-5 pt-5 pb-4">
          <h4 className="fw-bold">VIP Engineer © 2026</h4>

          <p
            style={{
              color: "#94a3b8",
            }}
          >
            Built For Engineers ❤️
          </p>
        </div>
      </div>
    </div>
  );
}

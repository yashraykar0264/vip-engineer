import React from "react";

import {

  Link

} from "react-router-dom";

export default function Home() {

  return (

    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(to right, #e2e8f0, #f8fafc)",
      }}
    >


      {/* NAVBAR */}

      <nav
        className="navbar navbar-expand-lg navbar-dark px-4"
        style={{
          background:
            "linear-gradient(to right, #0f172a, #1e293b)",

          boxShadow:
            "0 2px 10px rgba(0,0,0,0.2)",
        }}
      >

        <div className="container-fluid">


          {/* LOGO */}

          <h2
            className="text-white fw-bold m-0"
            style={{
              letterSpacing: "1px",
            }}
          >
            VIP Engineer 🚀
          </h2>


          {/* BUTTONS */}

          <div>

            <Link
              to="/login"
              className="btn btn-warning fw-bold me-2"
            >
              Login
            </Link>


            <Link
              to="/signup"
              className="btn btn-primary fw-bold"
            >
              Signup
            </Link>

          </div>

        </div>

      </nav>


      {/* HERO SECTION */}

      <div className="container text-center py-5">


        <h1
          className="fw-bold"
          style={{
            fontSize: "80px",
            color: "#0f172a",
            marginTop: "60px",
          }}
        >
          VIP Engineer
        </h1>


        <h2
          className="fw-bold"
          style={{
            fontSize: "55px",
            color: "#1e293b",
            marginTop: "20px",
          }}
        >
          Notes For Real Engineers 😎
        </h2>


        <div
          style={{
            fontSize: "90px",
            marginTop: "20px",
          }}
        >
          📚🚀💻
        </div>


        <p
          className="mx-auto mt-4"
          style={{
            maxWidth: "850px",
            fontSize: "24px",
            color: "#475569",
            lineHeight: "45px",
          }}
        >
          Placement focused notes, viva PDFs,
          handwritten notes, short revision notes,
          DSA tricks and last night exam survival material 😎🔥
        </p>


        {/* TAGS */}

        <div className="mt-5">


          <span className="badge bg-dark p-3 fs-5 me-3">
            DSA
          </span>


          <span className="badge bg-primary p-3 fs-5 me-3">
            DBMS
          </span>


          <span className="badge bg-success p-3 fs-5 me-3">
            CN
          </span>


          <span className="badge bg-danger p-3 fs-5 me-3">
            OS
          </span>


          <span className="badge bg-warning text-dark p-3 fs-5">
            AI/ML
          </span>

        </div>


        {/* CTA BUTTONS */}

        <div className="mt-5">


          <Link
            to="/signup"
            className="btn btn-primary btn-lg px-5 py-3 fw-bold me-3"
            style={{
              borderRadius: "15px",
            }}
          >
            Get Started 🚀
          </Link>


          <Link
            to="/login"
            className="btn btn-dark btn-lg px-5 py-3 fw-bold"
            style={{
              borderRadius: "15px",
            }}
          >
            Login
          </Link>

        </div>


        {/* FEATURE CARDS */}

        <div className="row mt-5 g-4">


          <div className="col-md-4">

            <div
              className="card border-0 shadow-lg p-4 h-100"
              style={{
                borderRadius: "20px",
              }}
            >

              <div style={{ fontSize: "60px" }}>
                📖
              </div>

              <h3 className="fw-bold mt-3">
                Premium Notes
              </h3>

              <p className="text-secondary mt-2">
                Clean handwritten notes and
                placement preparation material.
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

              <div style={{ fontSize: "60px" }}>
                ⚡
              </div>

              <h3 className="fw-bold mt-3">
                Quick Revision
              </h3>

              <p className="text-secondary mt-2">
                Last minute exam preparation
                PDFs and short tricks.
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

              <div style={{ fontSize: "60px" }}>
                💻
              </div>

              <h3 className="fw-bold mt-3">
                Placement Focused
              </h3>

              <p className="text-secondary mt-2">
                DSA, aptitude, interview and
                viva focused content.
              </p>

            </div>

          </div>

        </div>

      </div>


      {/* FOOTER */}

      <footer
        className="text-center text-white py-4 mt-5"
        style={{
          background:
            "linear-gradient(to right, #0f172a, #1e293b)",
        }}
      >

        <h5 className="fw-bold">
          VIP Engineer © 2026
        </h5>

        <p className="m-0 text-light">
          Built For Engineers ❤️
        </p>

      </footer>

    </div>

  );

}
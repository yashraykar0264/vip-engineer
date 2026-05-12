import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import API from "../services/api";

export default function AddNote() {
  const [title, setTitle] = useState("");

  const [description, setDescription] = useState("");

  const [folder, setFolder] = useState("");

  const [folders, setFolders] = useState([]);

  const [price, setPrice] = useState("");

  const [pdf, setPdf] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem("role");

    fetchFolders();

    if (role !== "admin") {
      alert("Access Denied");

      navigate("/");
    }
  }, []);

  // FETCH FOLDERS

  const fetchFolders = async () => {
    try {
      const response = await API.get("/folders");

      setFolders(response.data);

      if (response.data.length > 0) {
        setFolder(response.data[0].name);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // ADD NOTE

  const handleAddNote = async () => {
    try {
      if (!title || !description || !folder || !pdf) {
        return alert("Please Fill All Fields");
      }

      const token = localStorage.getItem("token");

      const formData = new FormData();

      formData.append("title", title);

      formData.append("description", description);

      formData.append("folder", folder);

      formData.append("price", price || 0);

      formData.append("pdf", pdf);

      const response = await API.post("/add-note", formData, {
        headers: {
          Authorization: `Bearer ${token}`,

          "Content-Type": "multipart/form-data",
        },
      });

      alert(response.data.message);

      navigate("/dashboard");
    } catch (error) {
      console.log(error);

      alert("Failed To Add Note");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",

        background: "linear-gradient(135deg, #020617, #0f172a, #312e81)",

        padding: "40px 20px",
      }}
    >
      {/* NAVBAR */}

      <nav
        className="navbar navbar-dark px-4 py-3 mb-5"
        style={{
          background: "rgba(255,255,255,0.05)",

          backdropFilter: "blur(10px)",

          borderRadius: "20px",

          border: "1px solid rgba(255,255,255,0.1)",
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

      {/* FORM */}

      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-6">
            <div
              style={{
                background: "rgba(255,255,255,0.08)",

                borderRadius: "30px",

                padding: "40px",

                border: "1px solid rgba(255,255,255,0.1)",

                backdropFilter: "blur(12px)",

                boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
              }}
            >
              <div className="text-center mb-5">
                <h1
                  className="fw-bold text-white"
                  style={{
                    fontSize: "50px",
                  }}
                >
                  Upload Notes 📚
                </h1>

                <p
                  style={{
                    color: "#cbd5e1",

                    fontSize: "18px",
                  }}
                >
                  Upload Premium & Free PDFs 🚀
                </p>
              </div>

              {/* TITLE */}

              <input
                type="text"
                placeholder="Enter Note Title"
                className="form-control p-3 mb-4"
                style={{
                  borderRadius: "16px",

                  fontSize: "17px",
                }}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />

              {/* DESCRIPTION */}

              <textarea
                placeholder="Enter Description"
                className="form-control p-3 mb-4"
                rows="4"
                style={{
                  borderRadius: "16px",

                  fontSize: "17px",
                }}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />

              {/* FOLDER */}

              <select
                className="form-select p-3 mb-4"
                style={{
                  borderRadius: "16px",

                  fontSize: "17px",
                }}
                value={folder}
                onChange={(e) => setFolder(e.target.value)}
              >
                {folders.map((f) => (
                  <option key={f._id} value={f.name}>
                    📂 {f.name}
                  </option>
                ))}
              </select>

              {/* PRICE */}

              <input
                type="number"
                placeholder="Enter Price (0 = Free)"
                className="form-control p-3 mb-4"
                style={{
                  borderRadius: "16px",

                  fontSize: "17px",
                }}
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />

              {/* PDF */}

              <input
                type="file"
                className="form-control p-3 mb-4"
                accept=".pdf"
                style={{
                  borderRadius: "16px",
                }}
                onChange={(e) => setPdf(e.target.files[0])}
              />

              {/* BUTTON */}

              <button
                className="btn btn-light w-100 fw-bold"
                style={{
                  borderRadius: "16px",

                  padding: "14px",

                  fontSize: "18px",
                }}
                onClick={handleAddNote}
              >
                Upload Note 🚀
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

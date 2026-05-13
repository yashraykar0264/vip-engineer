import React, { useEffect, useState } from "react";

import API from "../services/api";

import { useNavigate } from "react-router-dom";

export default function AddHomeFolder() {
  const navigate = useNavigate();

  const [folders, setFolders] = useState([]);

  const [folderName, setFolderName] = useState("");

  const [emoji, setEmoji] = useState("📂");

  const [color, setColor] = useState("#2563eb");

  useEffect(() => {
    const role = localStorage.getItem("role");

    if (role !== "admin") {
      navigate("/");
    }

    fetchFolders();
  }, []);

  const fetchFolders = async () => {
    try {
      const res = await API.get("/home-folders");

      setFolders(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const createFolder = async () => {
    try {
      if (!folderName) {
        return alert("Enter Folder Name");
      }

      const token = localStorage.getItem("token");

      await API.post(
        "/create-home-folder",
        {
          name: folderName,
          emoji,
          color,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setFolderName("");

      fetchFolders();

      alert("Folder Created 🚀");
    } catch (error) {
      console.log(error);

      alert("Failed To Create Folder");
    }
  };

  const deleteFolder = async (id) => {
    try {
      const confirmDelete = window.confirm("Delete Folder & Notes?");

      if (!confirmDelete) return;

      const token = localStorage.getItem("token");

      await API.delete(`/delete-home-folder/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchFolders();

      alert("Folder Deleted 🗑️");
    } catch (error) {
      console.log(error);

      alert("Delete Failed");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg,#020617,#0f172a,#312e81)",
        color: "white",
        padding: "30px",
      }}
    >
      <div className="container">
        <div className="d-flex justify-content-between align-items-center mb-5">
          <div>
            <h1 className="fw-bold">📂 Add Home Folder</h1>

            <p
              style={{
                color: "#cbd5e1",
              }}
            >
              Manage Home Subjects
            </p>
          </div>

          <button
            className="btn btn-light fw-bold"
            onClick={() => navigate("/dashboard")}
          >
            Dashboard
          </button>
        </div>

        <div
          className="p-4 mb-5"
          style={{
            background: "rgba(255,255,255,0.08)",
            borderRadius: "30px",
            backdropFilter: "blur(10px)",
          }}
        >
          <input
            type="text"
            placeholder="Folder Name"
            className="form-control p-3 mb-3"
            value={folderName}
            onChange={(e) => setFolderName(e.target.value)}
          />

          <input
            type="text"
            placeholder="Emoji"
            className="form-control p-3 mb-3"
            value={emoji}
            onChange={(e) => setEmoji(e.target.value)}
          />

          <input
            type="color"
            className="form-control form-control-color mb-4"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />

          <button
            className="btn btn-success w-100 fw-bold"
            onClick={createFolder}
          >
            Create Folder 🚀
          </button>
        </div>

        <div className="row g-4">
          {folders.map((folder) => (
            <div className="col-md-4" key={folder._id}>
              <div
                className="p-4"
                style={{
                  background: folder.color,
                  borderRadius: "28px",
                }}
              >
                <div
                  style={{
                    fontSize: "60px",
                  }}
                >
                  {folder.emoji}
                </div>

                <h2 className="fw-bold mt-3">{folder.name}</h2>

                <button
                  className="btn btn-danger w-100 fw-bold mt-4"
                  onClick={() => deleteFolder(folder._id)}
                >
                  Delete 🗑️
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import API from "../services/api";

export default function Dashboard() {
  const [notes, setNotes] = useState([]);

  const [folders, setFolders] = useState([]);

  const [newFolder, setNewFolder] = useState("");

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

    fetchFolders();
  }, []);

  // FETCH NOTES

  const fetchNotes = async () => {
    try {
      const response = await API.get("/notes");

      setNotes(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  // FETCH FOLDERS

  const fetchFolders = async () => {
    try {
      const response = await API.get("/folders");

      setFolders(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  // CREATE FOLDER

  const handleCreateFolder = async () => {
    try {
      if (!newFolder) {
        return alert("Enter Folder Name");
      }

      const token = localStorage.getItem("token");

      const response = await API.post(
        "/create-folder",
        {
          name: newFolder,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      alert(response.data.message);

      setNewFolder("");

      fetchFolders();
    } catch (error) {
      console.log(error);

      alert(error.response?.data?.message || "Failed To Create Folder");
    }
  };

  // DELETE FOLDER

  const handleDeleteFolder = async (id) => {
    try {
      const token = localStorage.getItem("token");

      const response = await API.delete(`/delete-folder/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert(response.data.message);

      fetchFolders();
    } catch (error) {
      console.log(error);

      alert("Failed To Delete Folder");
    }
  };

  // LOGOUT

  const handleLogout = () => {
    localStorage.clear();

    navigate("/");
  };

  // FILTERED FOLDERS

  const filteredFolders = folders.filter((folder) =>
    folder.name.toLowerCase().includes(search.toLowerCase()),
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
              className="p-4 text-center"
              style={{
                background: "rgba(255,255,255,0.08)",
                borderRadius: "25px",
              }}
            >
              <h1>📚</h1>

              <h2 className="fw-bold">{notes.length}</h2>

              <p>Total Notes</p>
            </div>
          </div>

          <div className="col-md-4">
            <div
              className="p-4 text-center"
              style={{
                background: "rgba(255,255,255,0.08)",
                borderRadius: "25px",
              }}
            >
              <h1>🆓</h1>

              <h2 className="fw-bold text-success">{freeNotes}</h2>

              <p>Free Notes</p>
            </div>
          </div>

          <div className="col-md-4">
            <div
              className="p-4 text-center"
              style={{
                background: "rgba(255,255,255,0.08)",
                borderRadius: "25px",
              }}
            >
              <h1>🔥</h1>

              <h2 className="fw-bold text-warning">{premiumNotes}</h2>

              <p>Premium Notes</p>
            </div>
          </div>
        </div>

        {/* ADMIN FOLDER PANEL */}

        {role === "admin" && (
          <div
            className="p-4 mb-5"
            style={{
              background: "rgba(255,255,255,0.08)",
              borderRadius: "25px",
            }}
          >
            <h2 className="fw-bold mb-4">📂 Folder Management</h2>

            <div className="d-flex gap-3">
              <input
                type="text"
                placeholder="Enter New Folder Name"
                className="form-control"
                value={newFolder}
                onChange={(e) => setNewFolder(e.target.value)}
              />

              <button
                className="btn btn-success fw-bold"
                onClick={handleCreateFolder}
              >
                Create 🚀
              </button>
            </div>
          </div>
        )}

        {/* SEARCH */}

        <div className="mb-5">
          <input
            type="text"
            placeholder="🔍 Search Folders..."
            className="form-control p-3"
            style={{
              borderRadius: "18px",
              fontSize: "18px",
            }}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* FOLDERS */}

        <div className="row g-4">
          {filteredFolders.map((folder) => (
            <div className="col-lg-4 col-md-6" key={folder._id}>
              <div
                style={{
                  background: "rgba(255,255,255,0.08)",

                  borderRadius: "30px",

                  padding: "35px",

                  border: "1px solid rgba(255,255,255,0.1)",

                  backdropFilter: "blur(10px)",

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
                  {folder.name}
                </h1>

                <button
                  className="btn btn-light fw-bold mt-4 w-100"
                  style={{
                    borderRadius: "14px",
                  }}
                  onClick={() => navigate(`/subject/${folder.name}`)}
                >
                  Open Folder 🚀
                </button>

                {role === "admin" && (
                  <button
                    className="btn btn-danger fw-bold mt-3 w-100"
                    style={{
                      borderRadius: "14px",
                    }}
                    onClick={() => handleDeleteFolder(folder._id)}
                  >
                    Delete Folder 🗑️
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* EMPTY */}

        {filteredFolders.length === 0 && (
          <div className="text-center mt-5">
            <h3
              style={{
                color: "#cbd5e1",
              }}
            >
              No Folders Found 😔
            </h3>
          </div>
        )}
      </div>
    </div>
  );
}

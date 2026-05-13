import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../services/api";

export default function Dashboard() {
  const [notes, setNotes] = useState([]);

  const [folders, setFolders] = useState([]);

  const [purchases, setPurchases] = useState([]);

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

    fetchPurchases();
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

  // FETCH PURCHASES

  const fetchPurchases = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await API.get("/my-purchases", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setPurchases(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  // CHECK PURCHASED

  const isPurchased = (noteId) => {
    return purchases.some(
      (purchase) =>
        purchase.noteId?._id === noteId &&
        purchase.paymentStatus === "approved",
    );
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

      toast.success(response.data.message);

      setNewFolder("");

      fetchFolders();
    } catch (error) {
      console.log(error);

      toast.error(error.response?.data?.message || "Failed");
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

      toast.success(response.data.message);

      fetchFolders();

      fetchNotes();
    } catch (error) {
      console.log(error);

      toast.error("Delete Failed ❌");
    }
  };

  // LOGOUT

  const handleLogout = () => {
    localStorage.clear();

    navigate("/");
  };

  // FILTERED

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
        background:
          "radial-gradient(circle at top left,#172554 0%,#020617 45%,#1e1b4b 100%)",
        color: "white",
        overflowX: "hidden",
      }}
    >
      {/* NAVBAR */}

      <nav
        className="px-3 px-md-5 py-3 d-flex justify-content-between align-items-center flex-wrap gap-3"
        style={{
          background: "rgba(255,255,255,0.05)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          position: "sticky",
          top: 0,
          zIndex: 1000,
        }}
      >
        <h2
          className="fw-bold m-0"
          style={{
            fontSize: window.innerWidth < 768 ? "28px" : "38px",
          }}
        >
          VIP Engineer 🚀
        </h2>

        <div className="d-flex gap-2 flex-wrap">
          {role === "admin" && (
            <div className="dropdown">
              <button
                className="btn fw-bold dropdown-toggle"
                data-bs-toggle="dropdown"
                style={{
                  background: "linear-gradient(to right,#2563eb,#7c3aed)",
                  color: "white",
                  border: "none",
                  borderRadius: "14px",
                  padding: "12px 20px",
                }}
              >
                ⚙️ Admin
              </button>

              <ul
                className="dropdown-menu dropdown-menu-end border-0 shadow-lg"
                style={{
                  borderRadius: "20px",
                  padding: "12px",
                  minWidth: "230px",
                }}
              >
                <li>
                  <button
                    className="dropdown-item fw-bold py-3 rounded"
                    onClick={() => navigate("/add-note")}
                  >
                    ➕ Add Note
                  </button>
                </li>

                <li>
                  <button
                    className="dropdown-item fw-bold py-3 rounded"
                    onClick={() => navigate("/admin-requests")}
                  >
                    💳 Payment Requests
                  </button>
                </li>

                <li>
                  <button
                    className="dropdown-item fw-bold py-3 rounded"
                    onClick={() => navigate("/add-home-folder")}
                  >
                    📂 Add Home Folder
                  </button>
                </li>

                <li>
                  <button
                    className="dropdown-item fw-bold py-3 rounded"
                    onClick={() => navigate("/add-home-files")}
                  >
                    📚 Add Home Files
                  </button>
                </li>
              </ul>
            </div>
          )}

          <button
            className="btn btn-light fw-bold"
            style={{
              borderRadius: "14px",
              padding: "10px 18px",
            }}
            onClick={() => navigate("/my-purchases")}
          >
            Purchases 📚
          </button>

          <button
            className="btn btn-light fw-bold"
            style={{
              borderRadius: "14px",
              padding: "10px 18px",
            }}
            onClick={() => navigate("/profile")}
          >
            Profile 👤
          </button>

          <button
            className="btn btn-danger fw-bold"
            style={{
              borderRadius: "14px",
              padding: "10px 18px",
            }}
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </nav>

      <div className="container py-5">
        {/* HERO */}

        <div className="text-center mb-5">
          <div
            style={{
              display: "inline-block",
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "999px",
              padding: "10px 24px",
              marginBottom: "25px",
              color: "#cbd5e1",
              fontSize: "14px",
            }}
          >
            🚀 Premium Engineering Marketplace
          </div>

          <h1
            className="fw-bold"
            style={{
              fontSize: window.innerWidth < 768 ? "50px" : "90px",
              lineHeight: "1",
            }}
          >
            Dashboard 📚
          </h1>

          <p
            className="mx-auto mt-4"
            style={{
              maxWidth: "750px",
              color: "#94a3b8",
              fontSize: window.innerWidth < 768 ? "16px" : "22px",
              lineHeight: "1.8",
            }}
          >
            Access premium handwritten notes, placements PDFs, quick revision
            sheets and curated engineering resources 😎
          </p>
        </div>

        {/* STATS */}

        <div className="row g-4 mb-5">
          {[
            {
              icon: "📚",
              title: "Total Notes",
              value: notes.length,
              color: "#60a5fa",
            },

            {
              icon: "🆓",
              title: "Free Notes",
              value: freeNotes,
              color: "#22c55e",
            },

            {
              icon: "🔥",
              title: "Premium",
              value: premiumNotes,
              color: "#facc15",
            },
          ].map((item, index) => (
            <div className="col-lg-4 col-md-6" key={index}>
              <div
                className="h-100 text-center"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  backdropFilter: "blur(12px)",
                  borderRadius: "28px",
                  padding: "35px 20px",
                }}
              >
                <div
                  style={{
                    fontSize: "50px",
                  }}
                >
                  {item.icon}
                </div>

                <h1
                  className="fw-bold mt-3"
                  style={{
                    color: item.color,
                    fontSize: "50px",
                  }}
                >
                  {item.value}
                </h1>

                <p
                  style={{
                    color: "#cbd5e1",
                    fontSize: "18px",
                  }}
                >
                  {item.title}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* ADMIN PANEL */}

        {role === "admin" && (
          <div
            className="mb-5"
            style={{
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.08)",
              backdropFilter: "blur(12px)",
              borderRadius: "30px",
              padding: "30px",
            }}
          >
            <h2 className="fw-bold mb-4">📂 Folder Management</h2>

            <div className="row g-3">
              <div className="col-lg-9">
                <input
                  type="text"
                  placeholder="Enter Folder Name"
                  className="form-control p-3"
                  style={{
                    borderRadius: "16px",
                    background: "rgba(255,255,255,0.08)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    color: "white",
                  }}
                  value={newFolder}
                  onChange={(e) => setNewFolder(e.target.value)}
                />
              </div>

              <div className="col-lg-3">
                <button
                  className="btn btn-success fw-bold w-100"
                  style={{
                    borderRadius: "16px",
                    padding: "15px",
                  }}
                  onClick={handleCreateFolder}
                >
                  Create 🚀
                </button>
              </div>
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
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.08)",
              color: "white",
              fontSize: "17px",
            }}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* FOLDERS */}

        <div className="row g-4">
          {filteredFolders.map((folder) => {
            const folderNotes = notes.filter(
              (note) => note.folder === folder.name,
            );

            const purchasedCount = folderNotes.filter((note) =>
              isPurchased(note._id),
            ).length;

            return (
              <div className="col-xl-3 col-lg-4 col-md-6" key={folder._id}>
                <div
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: "30px",
                    padding: "28px",
                    backdropFilter: "blur(12px)",
                    height: "100%",
                    transition: "0.3s",
                  }}
                >
                  <div
                    style={{
                      fontSize: "70px",
                    }}
                  >
                    📂
                  </div>

                  <h2
                    className="fw-bold mt-3"
                    style={{
                      fontSize: "34px",
                    }}
                  >
                    {folder.name}
                  </h2>

                  <div className="d-flex gap-2 flex-wrap mt-3">
                    <span className="badge bg-primary px-3 py-2">
                      {folderNotes.length} Notes
                    </span>

                    <span className="badge bg-success px-3 py-2">
                      {purchasedCount} Purchased
                    </span>
                  </div>

                  <button
                    className="btn fw-bold w-100 mt-4"
                    style={{
                      background: "linear-gradient(to right,#2563eb,#7c3aed)",
                      border: "none",
                      color: "white",
                      borderRadius: "16px",
                      padding: "14px",
                    }}
                    onClick={() => navigate(`/subject/${folder.name}`)}
                  >
                    Open Folder 🚀
                  </button>

                  {role === "admin" && (
                    <button
                      className="btn btn-danger fw-bold w-100 mt-3"
                      style={{
                        borderRadius: "16px",
                        padding: "14px",
                      }}
                      onClick={() => handleDeleteFolder(folder._id)}
                    >
                      Delete 🗑️
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* EMPTY */}

        {filteredFolders.length === 0 && (
          <div className="text-center mt-5">
            <h2
              style={{
                color: "#cbd5e1",
              }}
            >
              No Folders Found 😔
            </h2>
          </div>
        )}
      </div>
    </div>
  );
}

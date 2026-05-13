import React, { useEffect, useState } from "react";

import API from "../services/api";

import { useNavigate } from "react-router-dom";

export default function ManageHomeNotes() {
  const navigate = useNavigate();

  const [folders, setFolders] = useState([]);

  const [notes, setNotes] = useState([]);

  const [folderName, setFolderName] = useState("");

  const [emoji, setEmoji] = useState("📂");

  const [color, setColor] = useState("#2563eb");

  const [title, setTitle] = useState("");

  const [description, setDescription] = useState("");

  const [folder, setFolder] = useState("");

  const [type, setType] = useState("free");

  const [pdf, setPdf] = useState(null);

  useEffect(() => {
    const role = localStorage.getItem("role");

    if (role !== "admin") {
      navigate("/");
    }

    fetchFolders();

    fetchNotes();
  }, []);

  // FETCH FOLDERS

  const fetchFolders = async () => {
    try {
      const res = await API.get("/home-folders");

      setFolders(res.data);

      if (res.data.length > 0) {
        setFolder(res.data[0].name);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // FETCH NOTES

  const fetchNotes = async () => {
    try {
      const res = await API.get("/home-notes");

      setNotes(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // CREATE FOLDER

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

  // ADD NOTE

  const addNote = async () => {
    try {
      if (!title || !description || (type === "free" && !pdf)) {
        return alert("Fill All Fields");
      }

      const token = localStorage.getItem("token");

      const formData = new FormData();

      formData.append("title", title);

      formData.append("description", description);

      formData.append("folder", folder);

      formData.append("type", type);

      formData.append("pdf", pdf);

      await API.post("/add-home-note", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setTitle("");

      setDescription("");

      setPdf(null);

      fetchNotes();

      alert("Home Note Added 🚀");
    } catch (error) {
      console.log(error);

      alert("Failed To Add Note");
    }
  };

  // DELETE NOTE

  const deleteNote = async (id) => {
    try {
      const confirmDelete = window.confirm("Delete This Note?");

      if (!confirmDelete) return;

      const token = localStorage.getItem("token");

      await API.delete(`/delete-home-note/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchNotes();

      alert("Deleted Successfully 🗑️");
    } catch (error) {
      console.log(error);

      alert("Delete Failed");
    }
  };

  // DELETE FOLDER

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

      fetchNotes();

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
        {/* HEADER */}

        <div className="d-flex justify-content-between align-items-center mb-5 flex-wrap gap-3">
          <div>
            <h1 className="fw-bold">🏠 Home Marketplace</h1>

            <p
              style={{
                color: "#cbd5e1",
              }}
            >
              Manage homepage folders & notes
            </p>
          </div>

          <button
            className="btn btn-light fw-bold"
            style={{
              borderRadius: "14px",
              padding: "12px 22px",
            }}
            onClick={() => navigate("/dashboard")}
          >
            Dashboard 🚀
          </button>
        </div>

        {/* TOP SECTION */}

        <div className="row g-4">
          {/* CREATE FOLDER */}

          <div className="col-lg-5">
            <div
              className="p-4 h-100"
              style={{
                background: "rgba(255,255,255,0.08)",
                borderRadius: "25px",
                backdropFilter: "blur(10px)",
              }}
            >
              <h3 className="fw-bold mb-4">Create Home Folder 📂</h3>

              <input
                type="text"
                placeholder="Folder Name"
                className="form-control p-3 mb-3"
                value={folderName}
                onChange={(e) => setFolderName(e.target.value)}
              />

              <input
                type="text"
                placeholder="Emoji 🔥"
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
                style={{
                  borderRadius: "14px",
                  padding: "12px",
                }}
                onClick={createFolder}
              >
                Create Folder 🚀
              </button>

              {/* FOLDERS */}

              <div className="mt-5">
                <h4 className="fw-bold mb-3">Existing Folders</h4>

                {folders.map((f) => (
                  <div
                    key={f._id}
                    className="d-flex justify-content-between align-items-center mb-3 p-3"
                    style={{
                      background: f.color,
                      borderRadius: "16px",
                    }}
                  >
                    <div>
                      <span
                        style={{
                          fontSize: "22px",
                        }}
                      >
                        {f.emoji}
                      </span>

                      <span className="fw-bold ms-2">{f.name}</span>
                    </div>

                    <button
                      className="btn btn-danger btn-sm fw-bold"
                      onClick={() => deleteFolder(f._id)}
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ADD NOTE */}

          <div className="col-lg-7">
            <div
              className="p-4"
              style={{
                background: "rgba(255,255,255,0.08)",
                borderRadius: "25px",
                backdropFilter: "blur(10px)",
              }}
            >
              <h3 className="fw-bold mb-4">Add Home Note 📚</h3>

              <input
                type="text"
                placeholder="Title"
                className="form-control p-3 mb-3"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />

              <textarea
                placeholder="Description"
                className="form-control p-3 mb-3"
                rows="3"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />

              <select
                className="form-select p-3 mb-3"
                value={folder}
                onChange={(e) => setFolder(e.target.value)}
              >
                {folders.map((f) => (
                  <option key={f._id} value={f.name}>
                    {f.name}
                  </option>
                ))}
              </select>

              <select
                className="form-select p-3 mb-3"
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <option value="free">🆓 Free Note</option>

                <option value="premium">🔒 Premium Preview</option>
              </select>

              {type === "free" && (
                <input
                  type="file"
                  className="form-control p-3 mb-4"
                  accept=".pdf"
                  onChange={(e) => setPdf(e.target.files[0])}
                />
              )}

              <button
                className="btn btn-primary w-100 fw-bold"
                style={{
                  borderRadius: "14px",
                  padding: "12px",
                }}
                onClick={addNote}
              >
                Upload Note 🚀
              </button>
            </div>
          </div>
        </div>

        {/* NOTES */}

        <div className="mt-5">
          <h2 className="fw-bold mb-4">Uploaded Notes 📚</h2>

          <div className="row g-4">
            {notes.map((note) => (
              <div className="col-lg-4 col-md-6" key={note._id}>
                <div
                  className="card border-0 h-100"
                  style={{
                    background: "rgba(255,255,255,0.08)",
                    borderRadius: "28px",
                    overflow: "hidden",
                    backdropFilter: "blur(10px)",
                    color: "white",
                  }}
                >
                  <div
                    style={{
                      height: "8px",
                      background:
                        note.type === "free"
                          ? "linear-gradient(to right,#16a34a,#22c55e)"
                          : "linear-gradient(to right,#2563eb,#7c3aed)",
                    }}
                  ></div>

                  <div className="card-body p-4">
                    <div
                      style={{
                        fontSize: "60px",
                      }}
                    >
                      {note.type === "free" ? "📖" : "🔒"}
                    </div>

                    <h3 className="fw-bold mt-3">{note.title}</h3>

                    <p
                      style={{
                        color: "#cbd5e1",
                      }}
                    >
                      {note.description}
                    </p>

                    <span
                      className={`badge ${
                        note.type === "free" ? "bg-success" : "bg-danger"
                      }`}
                    >
                      {note.type}
                    </span>

                    <button
                      className="btn btn-danger w-100 fw-bold mt-4"
                      style={{
                        borderRadius: "14px",
                        padding: "12px",
                      }}
                      onClick={() => deleteNote(note._id)}
                    >
                      Delete 🗑️
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {notes.length === 0 && (
            <div className="text-center mt-5">
              <h3>No Home Notes Yet 😔</h3>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

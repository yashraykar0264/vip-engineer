import React, { useEffect, useState } from "react";

import API from "../services/api";

import { useNavigate } from "react-router-dom";

export default function AddHomeFiles() {
  const navigate = useNavigate();

  const [folders, setFolders] = useState([]);

  const [notes, setNotes] = useState([]);

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

  const fetchFolders = async () => {
    const res = await API.get("/home-folders");

    setFolders(res.data);

    if (res.data.length > 0) {
      setFolder(res.data[0].name);
    }
  };

  const fetchNotes = async () => {
    const res = await API.get("/home-notes");

    setNotes(res.data);
  };

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

      if (pdf) {
        formData.append("pdf", pdf);
      }

      await API.post("/add-home-note", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Home File Added 🚀");

      setTitle("");

      setDescription("");

      setPdf(null);

      fetchNotes();
    } catch (error) {
      console.log(error);

      alert("Failed To Add");
    }
  };

  const deleteNote = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await API.delete(`/delete-home-note/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchNotes();

      alert("Deleted 🗑️");
    } catch (error) {
      console.log(error);
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
            <h1 className="fw-bold">📚 Add Home Files</h1>

            <p
              style={{
                color: "#cbd5e1",
              }}
            >
              Manage Home Notes & Preview Cards
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
            <option value="free">🆓 Free PDF</option>

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

          <button className="btn btn-primary w-100 fw-bold" onClick={addNote}>
            Upload 🚀
          </button>
        </div>

        <div className="row g-4">
          {notes.map((note) => (
            <div className="col-md-4" key={note._id}>
              <div
                className="p-4 h-100"
                style={{
                  background:
                    note.type === "free"
                      ? "linear-gradient(135deg,#16a34a,#166534)"
                      : "linear-gradient(135deg,#2563eb,#7c3aed)",
                  borderRadius: "28px",
                }}
              >
                <div
                  style={{
                    fontSize: "60px",
                  }}
                >
                  {note.type === "free" ? "📖" : "🔒"}
                </div>

                <h2 className="fw-bold mt-3">{note.title}</h2>

                <p>{note.description}</p>

                <button
                  className="btn btn-danger w-100 fw-bold mt-4"
                  onClick={() => deleteNote(note._id)}
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

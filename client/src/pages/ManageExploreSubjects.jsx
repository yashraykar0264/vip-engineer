import React, { useEffect, useState } from "react";

import API from "../services/api";

import { useNavigate } from "react-router-dom";

export default function ManageExploreSubjects() {
  const [subjects, setSubjects] = useState([]);

  const [title, setTitle] = useState("");

  const [emoji, setEmoji] = useState("");

  const [color, setColor] = useState("#2563eb");

  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem("role");

    if (role !== "admin") {
      navigate("/");
    }

    fetchSubjects();
  }, []);

  // FETCH

  const fetchSubjects = async () => {
    try {
      const response = await API.get("/explore-subjects");

      setSubjects(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  // CREATE

  const handleCreate = async () => {
    try {
      if (!title || !emoji || !color) {
        return alert("Fill All Fields");
      }

      const token = localStorage.getItem("token");

      await API.post(
        "/create-explore-subject",
        {
          title,
          emoji,
          color,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setTitle("");

      setEmoji("");

      setColor("#2563eb");

      fetchSubjects();

      alert("Subject Added 🚀");
    } catch (error) {
      console.log(error);

      alert("Failed");
    }
  };

  // DELETE

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await API.delete(`/delete-explore-subject/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchSubjects();

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
        padding: "30px",
        color: "white",
      }}
    >
      <div className="container">
        <div className="d-flex justify-content-between align-items-center mb-5">
          <h1 className="fw-bold">Explore Subjects 🚀</h1>

          <button
            className="btn btn-light fw-bold"
            onClick={() => navigate("/dashboard")}
          >
            Dashboard
          </button>
        </div>

        {/* FORM */}

        <div
          className="p-4 mb-5"
          style={{
            background: "rgba(255,255,255,0.08)",
            borderRadius: "25px",
          }}
        >
          <h3 className="mb-4 fw-bold">Add Subject 📂</h3>

          <div className="row g-3">
            <div className="col-md-4">
              <input
                type="text"
                placeholder="Subject Name"
                className="form-control p-3"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="col-md-3">
              <input
                type="text"
                placeholder="Emoji 🔥"
                className="form-control p-3"
                value={emoji}
                onChange={(e) => setEmoji(e.target.value)}
              />
            </div>

            <div className="col-md-3">
              <input
                type="color"
                className="form-control form-control-color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
              />
            </div>

            <div className="col-md-2">
              <button
                className="btn btn-success w-100 h-100 fw-bold"
                onClick={handleCreate}
              >
                Add 🚀
              </button>
            </div>
          </div>
        </div>

        {/* SUBJECTS */}

        <div className="row g-4">
          {subjects.map((subject) => (
            <div className="col-md-4" key={subject._id}>
              <div
                style={{
                  background: subject.color,
                  borderRadius: "25px",
                  padding: "35px",
                }}
              >
                <div style={{ fontSize: "70px" }}>{subject.emoji}</div>

                <h2 className="fw-bold mt-3">{subject.title}</h2>

                <button
                  className="btn btn-danger fw-bold mt-4 w-100"
                  onClick={() => handleDelete(subject._id)}
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

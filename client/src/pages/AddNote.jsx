import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import API from "../services/api";

export default function AddNote() {
  const [title, setTitle] = useState("");

  const [description, setDescription] = useState("");

  const [price, setPrice] = useState("");

  const [pdf, setPdf] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem("role");

    // ADMIN CHECK

    if (role !== "admin") {
      alert("Access Denied");

      navigate("/");
    }
  }, []);

  const handleAddNote = async () => {
    try {
      const token = localStorage.getItem("token");

      // FORM DATA

      const formData = new FormData();

      formData.append(
        "title",

        title,
      );

      formData.append(
        "description",

        description,
      );

      formData.append(
        "price",

        price,
      );

      formData.append(
        "pdf",

        pdf,
      );

      // API REQUEST

      const response = await API.post(
        "/add-note",

        formData,

        {
          headers: {
            Authorization: `Bearer ${token}`,

            "Content-Type": "multipart/form-data",
          },
        },
      );

      console.log(response.data);

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

        background: "linear-gradient(to right, #f1f5f9, #e2e8f0)",
      }}
    >
      {/* NAVBAR */}

      <nav
        className="navbar navbar-dark px-4"
        style={{
          background: "linear-gradient(to right, #0f172a, #1e293b)",
        }}
      >
        <h2 className="text-white fw-bold">VIP Engineer 🚀</h2>
      </nav>

      {/* FORM */}

      <div className="container py-5">
        <div
          className="col-md-5 mx-auto card p-4 border-0"
          style={{
            borderRadius: "20px",

            boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
          }}
        >
          <h2 className="text-center fw-bold mb-4">Add Premium Note 📚</h2>

          <input
            type="text"
            placeholder="Enter note title"
            className="form-control mb-3"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            placeholder="Enter description"
            className="form-control mb-3"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <input
            type="number"
            placeholder="Enter price"
            className="form-control mb-3"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />

          {/* PDF INPUT */}

          <input
            type="file"
            className="form-control mb-4"
            accept=".pdf"
            onChange={(e) => setPdf(e.target.files[0])}
          />

          <button
            className="btn btn-dark w-100 fw-bold"
            onClick={handleAddNote}
          >
            Add Note 🚀
          </button>
        </div>
      </div>
    </div>
  );
}

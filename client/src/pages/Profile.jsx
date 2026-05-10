import React, { useEffect, useState } from "react";

import API from "../services/api";

import { useNavigate } from "react-router-dom";

export default function Profile() {
  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [gender, setGender] = useState("");

  const [city, setCity] = useState("");

  const [college, setCollege] = useState("");

  const [branch, setBranch] = useState("");

  const [year, setYear] = useState("");

  const [mobile, setMobile] = useState("");

  const [bio, setBio] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/");
      return;
    }

    fetchProfile();
  }, []);

  // FETCH PROFILE

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await API.get("/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const user = response.data;

      setName(user.name || "");

      setEmail(user.email || "");

      setGender(user.gender || "");

      setCity(user.city || "");

      setCollege(user.college || "");

      setBranch(user.branch || "");

      setYear(user.year || "");

      setMobile(user.mobile || "");

      setBio(user.bio || "");
    } catch (error) {
      console.log(error);
    }
  };

  // UPDATE PROFILE

  const updateProfile = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      await API.put(
        "/profile",

        {
          name,
          email,
          password,
          gender,
          city,
          college,
          branch,
          year,
          mobile,
          bio,
        },

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      alert("Profile Updated Successfully ✅");

      setPassword("");
    } catch (error) {
      console.log(error);

      alert("Profile Update Failed ❌");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",

        background: "linear-gradient(135deg, #0f172a, #1e293b, #312e81)",

        padding: "40px 20px",
      }}
    >
      <div className="container">
        {/* TOP SECTION */}

        <div
          className="p-4 mb-5"
          style={{
            background: "rgba(255,255,255,0.08)",

            borderRadius: "30px",

            backdropFilter: "blur(10px)",

            border: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
            <div>
              <h1
                className="fw-bold text-white"
                style={{
                  fontSize: "55px",
                }}
              >
                My Profile 👤
              </h1>

              <p
                style={{
                  color: "#cbd5e1",

                  fontSize: "18px",
                }}
              >
                Manage your VIP Engineer account
              </p>
            </div>

            <button
              className="btn btn-light fw-bold"
              style={{
                padding: "14px 24px",

                borderRadius: "16px",
              }}
              onClick={() => navigate("/dashboard")}
            >
              Dashboard 📚
            </button>
          </div>
        </div>

        {/* PROFILE CARD */}

        <div
          className="p-5"
          style={{
            background: "rgba(255,255,255,0.08)",

            borderRadius: "30px",

            backdropFilter: "blur(10px)",

            border: "1px solid rgba(255,255,255,0.1)",

            boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
          }}
        >
          {/* AVATAR */}

          <div className="text-center mb-5">
            <div
              style={{
                width: "120px",

                height: "120px",

                borderRadius: "50%",

                background: "linear-gradient(to right, #3b82f6, #8b5cf6)",

                display: "flex",

                alignItems: "center",

                justifyContent: "center",

                margin: "auto",

                fontSize: "55px",

                color: "white",

                fontWeight: "bold",
              }}
            >
              {name?.charAt(0)?.toUpperCase()}
            </div>

            <h2 className="text-white fw-bold mt-4">{name}</h2>

            <p
              style={{
                color: "#cbd5e1",
              }}
            >
              VIP Engineer User 🚀
            </p>
          </div>

          {/* FORM */}

          <form onSubmit={updateProfile}>
            <div className="row">
              {/* NAME */}

              <div className="col-md-6 mb-4">
                <label className="text-white fw-bold mb-2">Full Name</label>

                <input
                  type="text"
                  className="form-control"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  style={{
                    padding: "14px",

                    borderRadius: "14px",

                    border: "none",

                    background: "rgba(255,255,255,0.1)",

                    color: "white",
                  }}
                />
              </div>

              {/* EMAIL */}

              <div className="col-md-6 mb-4">
                <label className="text-white fw-bold mb-2">Email Address</label>

                <input
                  type="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={{
                    padding: "14px",

                    borderRadius: "14px",

                    border: "none",

                    background: "rgba(255,255,255,0.1)",

                    color: "white",
                  }}
                />
              </div>

              {/* GENDER */}

              <div className="col-md-6 mb-4">
                <label className="text-white fw-bold mb-2">Gender</label>

                <select
                  className="form-control"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  style={{
                    padding: "14px",

                    borderRadius: "14px",

                    border: "none",

                    background: "rgba(255,255,255,0.1)",

                    color: "white",
                  }}
                >
                  <option value="">Select Gender</option>

                  <option value="Male">Male</option>

                  <option value="Female">Female</option>

                  <option value="Other">Other</option>
                </select>
              </div>

              {/* CITY */}

              <div className="col-md-6 mb-4">
                <label className="text-white fw-bold mb-2">City</label>

                <input
                  type="text"
                  className="form-control"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  style={{
                    padding: "14px",

                    borderRadius: "14px",

                    border: "none",

                    background: "rgba(255,255,255,0.1)",

                    color: "white",
                  }}
                />
              </div>

              {/* COLLEGE */}

              <div className="col-md-6 mb-4">
                <label className="text-white fw-bold mb-2">College</label>

                <input
                  type="text"
                  className="form-control"
                  value={college}
                  onChange={(e) => setCollege(e.target.value)}
                  style={{
                    padding: "14px",

                    borderRadius: "14px",

                    border: "none",

                    background: "rgba(255,255,255,0.1)",

                    color: "white",
                  }}
                />
              </div>

              {/* BRANCH */}

              <div className="col-md-6 mb-4">
                <label className="text-white fw-bold mb-2">Branch</label>

                <input
                  type="text"
                  className="form-control"
                  value={branch}
                  onChange={(e) => setBranch(e.target.value)}
                  style={{
                    padding: "14px",

                    borderRadius: "14px",

                    border: "none",

                    background: "rgba(255,255,255,0.1)",

                    color: "white",
                  }}
                />
              </div>

              {/* YEAR */}

              <div className="col-md-6 mb-4">
                <label className="text-white fw-bold mb-2">Year</label>

                <input
                  type="text"
                  className="form-control"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  style={{
                    padding: "14px",

                    borderRadius: "14px",

                    border: "none",

                    background: "rgba(255,255,255,0.1)",

                    color: "white",
                  }}
                />
              </div>

              {/* MOBILE */}

              <div className="col-md-6 mb-4">
                <label className="text-white fw-bold mb-2">Mobile Number</label>

                <input
                  type="text"
                  className="form-control"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  style={{
                    padding: "14px",

                    borderRadius: "14px",

                    border: "none",

                    background: "rgba(255,255,255,0.1)",

                    color: "white",
                  }}
                />
              </div>

              {/* PASSWORD */}

              <div className="col-md-6 mb-4">
                <label className="text-white fw-bold mb-2">New Password</label>

                <input
                  type="password"
                  className="form-control"
                  placeholder="Leave blank if no change"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{
                    padding: "14px",

                    borderRadius: "14px",

                    border: "none",

                    background: "rgba(255,255,255,0.1)",

                    color: "white",
                  }}
                />
              </div>

              {/* BIO */}

              <div className="col-12 mb-4">
                <label className="text-white fw-bold mb-2">Bio</label>

                <textarea
                  className="form-control"
                  rows="4"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  style={{
                    padding: "14px",

                    borderRadius: "14px",

                    border: "none",

                    background: "rgba(255,255,255,0.1)",

                    color: "white",
                  }}
                ></textarea>
              </div>
            </div>

            {/* BUTTON */}

            <button
              type="submit"
              className="btn fw-bold w-100 mt-3"
              style={{
                background: "linear-gradient(to right, #3b82f6, #8b5cf6)",

                color: "white",

                padding: "16px",

                borderRadius: "18px",

                border: "none",

                fontSize: "18px",
              }}
            >
              Update Profile 🚀
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

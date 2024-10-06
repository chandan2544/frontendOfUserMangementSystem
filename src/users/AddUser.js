
import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function AddUser() {
  let navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    username: "",
    email: "",
  });

  const [errors, setErrors] = useState({});

  const { name, username, email } = user;

  // Function to handle input changes
  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // Email validation regex
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Validation before form submission
  const validate = () => {
    let formErrors = {};

    if (!name) {
      formErrors.name = "Name is required";
    }

    if (!username) {
      formErrors.username = "Username is required";
    }

    if (!email) {
      formErrors.email = "Email is required";
    } else if (!validateEmail(email)) {
      formErrors.email = "Invalid email format";
    }

    return formErrors;
  };

  // Handle form submission
  const onSubmit = async (e) => {
    e.preventDefault();

    // Check for errors
    const formErrors = validate();
    setErrors(formErrors);

    // If no errors, proceed with API call
    if (Object.keys(formErrors).length === 0) {
      await axios.post("http://localhost:8080/user", user);
      navigate("/");
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Register User</h2>

          <form onSubmit={(e) => onSubmit(e)}>
            {/* Name Field */}
            <div className="mb-3">
              <label htmlFor="Name" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your name"
                name="name"
                value={name}
                onChange={(e) => onInputChange(e)}
              />
              {errors.name && <div className="text-danger">{errors.name}</div>}
            </div>

            {/* Username Field */}
            <div className="mb-3">
              <label htmlFor="Username" className="form-label">
                Username
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your username"
                name="username"
                value={username}
                onChange={(e) => onInputChange(e)}
              />
              {errors.username && (
                <div className="text-danger">{errors.username}</div>
              )}
            </div>

            {/* Email Field */}
            <div className="mb-3">
              <label htmlFor="Email" className="form-label">
                E-mail
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your e-mail address"
                name="email"
                value={email}
                onChange={(e) => onInputChange(e)}
              />
              {errors.email && (
                <div className="text-danger">{errors.email}</div>
              )}
            </div>

            <button type="submit" className="btn btn-outline-primary">
              Submit
            </button>
            <Link className="btn btn-outline-danger mx-2" to="/">
              Cancel
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}

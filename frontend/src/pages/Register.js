import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RegisterModal = ({ onClose = () => {} }) => {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleClose = () => {
    onClose(); // Close modal if needed
    navigate("/"); // Redirect to /home
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!form.username.trim() || !form.email.trim() || !form.password.trim()) {
      setError("All fields are required.");
      return;
    }

    setLoading(true); // Start loading

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        { username: form.username, email: form.email, password: form.password },
        { headers: { "Content-Type": "application/json" } } // Ensure correct headers
      );

      if (response.status === 201) {
        // Check for success
        alert("Registration successful! Redirecting...");
        onClose(); // Close modal after registration
        navigate("/login"); // Redirect to login page
      } else {
        setError("Unexpected response. Try again.");
      }
    } catch (err) {
      console.error("Registration error:", err);
      setError(err.response?.data?.error || "Registration failed. Try again.");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <button
          style={styles.closeButton}
          onClick={() => {
            onClose(); // Close the modal
            navigate("/"); // Navigate to home
          }}
        >
          &times;
        </button>
        <h2>Register</h2>
        {error && <p style={styles.errorMessage}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            required
            style={styles.input}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            style={styles.input}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            style={styles.input}
          />
          <button
            type="submit"
            style={styles.registerButton}
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
        <p style={styles.loginText}>
          Already have an account?{" "}
          <span style={styles.loginLink} onClick={() => navigate("/login")}>
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0, 0, 0, 0.3)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },

  modal: {
    background: "white",
    padding: "20px",
    borderRadius: "8px",
    width: "350px",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
    textAlign: "center",
    position: "relative",
  },

  closeButton: {
    position: "absolute",
    top: "10px",
    right: "15px",
    border: "none",
    background: "none",
    fontSize: "24px",
    cursor: "pointer",
  },

  input: {
    width: "100%",
    padding: "10px",
    margin: "10px 0",
    border: "1px solid #ccc",
    borderRadius: "5px",
    fontSize: "16px",
  },

  registerButton: {
    width: "100%",
    padding: "10px",
    backgroundColor: "#28a745",
    color: "white",
    border: "none",
    cursor: "pointer",
    borderRadius: "5px",
    fontSize: "16px",
  },

  errorMessage: {
    color: "red",
    fontSize: "14px",
  },

  loginText: {
    marginTop: "10px",
    fontSize: "14px",
  },

  loginLink: {
    color: "#007BFF",
    cursor: "pointer",
    textDecoration: "underline",
  },
};

export default RegisterModal;

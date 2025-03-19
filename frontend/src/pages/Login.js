import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginModal = ({ onClose = () => {} }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // New state for loading

  const navigate = useNavigate();

  

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email.trim() || !password.trim()) {
      setError("Please enter both email and password.");
      return;
    }

    setLoading(true); // Show loading state

    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userId", response.data.userId);

        onClose(); // Close modal after successful login
        navigate("/dashboard"); // Navigate to a dashboard or home page
      }
    } catch (err) {
      console.error("Login error:", err);
      setError(err.response?.data?.error || "Login failed. Please try again.");
    } finally {
      setLoading(false); // Hide loading state
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
        <h2 style={styles.title}>Login</h2>
        {error && <p style={styles.errorMessage}>{error}</p>}
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles.input}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={styles.input}
          />
          <button type="submit" style={styles.loginButton} disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <p style={styles.registerText}>
          Don't have an account?{" "}
          <span style={styles.registerLink} onClick={() => navigate("/register")}>
            Register
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
    background: "rgba(0, 0, 0, 0.4)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },

  modal: {
    background: "#fff",
    padding: "30px",
    borderRadius: "10px",
    width: "400px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
    textAlign: "center",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  title: {
    marginBottom: "20px",
    fontSize: "22px",
    fontWeight: "bold",
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

  form: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  input: {
    width: "90%",
    padding: "12px",
    margin: "10px 0",
    border: "1px solid #ccc",
    borderRadius: "5px",
    fontSize: "16px",
  },

  loginButton: {
    width: "95%",
    padding: "12px",
    backgroundColor: "#007BFF",
    color: "white",
    border: "none",
    cursor: "pointer",
    borderRadius: "5px",
    fontSize: "16px",
    marginTop: "10px",
  },

  errorMessage: {
    color: "red",
    fontSize: "14px",
    marginBottom: "10px",
  },

  registerText: {
    marginTop: "15px",
    fontSize: "14px",
  },

  registerLink: {
    color: "#007BFF",
    cursor: "pointer",
    textDecoration: "underline",
  },
};

export default LoginModal;

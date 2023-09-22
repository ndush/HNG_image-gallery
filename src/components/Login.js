// Login.js
import React, { useState } from "react";
import { auth } from "./firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "../index.css"; 

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      if (email && password) {
        await signInWithEmailAndPassword(auth, email, password);
      
        navigate("/gallery");
      } else {
        setError("Please provide both email and password.");
      }
    } catch (error) {
      setError("Login failed. Please check your credentials.");
      console.error("Login error:", error);
    }
  };

  return (
    <div className="login-register-background login-register-container">
      {" "}
   
      <div>
        <h2>Login</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
};

export default Login;

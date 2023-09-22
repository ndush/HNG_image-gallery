// Registration.js
import React, { useState } from "react";
import { auth } from "./firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "../index.css"; 

const Registration = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleRegistration = async () => {
    try {
      if (email && password) {
        await createUserWithEmailAndPassword(auth, email, password);
       
        navigate("/gallery");
      } else {
        setError("Please provide both email and password.");
      }
    } catch (error) {
      setError("Registration failed. Please check your credentials.");
      console.error("Registration error:", error);
    }
  };

  return (
    <div className="login-register-background login-register-container">
      {" "}
    
      <div>
        <h2>Register</h2>
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
        <button onClick={handleRegistration}>Register</button>
      </div>
    </div>
  );
};

export default Registration;

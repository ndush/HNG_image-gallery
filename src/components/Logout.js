
import React from "react";
import { useNavigate } from "react-router-dom"; 
import { auth } from "./firebase";
import { signOut } from "firebase/auth";

const Logout = () => {
  const navigate = useNavigate(); 

  const handleLogout = async () => {
    try {
      await signOut(auth);
      
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div>
      <h2>Logout</h2>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Logout;

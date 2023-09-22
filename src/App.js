
import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  Navigate,
} from "react-router-dom";

import { auth } from "./components/firebase";
import Login from "./components/Login";
import ImageGallery from "./components/ImageGallery";
import Registration from "./components/Registration";
import Logout from "./components/Logout";

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <Router>
      <div className="App">
        <nav>
          <ul>
            <li>
              {user ? (
                <Link to="/gallery">Gallery</Link>
              ) : (
                <Link to="/login">Login</Link>
              )}
            </li>
            <li>
              {user ? (
                <Link to="/logout">Logout</Link>
              ) : (
                <Link to="/register">Register</Link>
              )}
            </li>
          </ul>
        </nav>

        <Routes>
          <Route
            path="/login"
            element={user ? <Navigate to="/gallery" /> : <Login />}
          />
          <Route
  path="/logout"
  element={<Logout />}
/>
          <Route
            path="/register"
            element={user ? <Navigate to="/gallery" /> : <Registration />}
          />
          <Route
            path="/gallery"
            element={
              user ? <ImageGallery user={user} /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/logout"
            element={<Logout />} 
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

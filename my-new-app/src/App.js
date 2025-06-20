import "./App.css";
import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Layout from "./layout/Layout"; // ✅ Capitalized
import Dashboard from "./pages/Dashboard";

function App() {
  const [userDetails, setUserDetails] = useState(null);

  const updateUserDetails = (updateUserDetails) => {
    setUserDetails(updateUserDetails);
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          userDetails ? (
            <Navigate to="/dashboard" />
          ) : (
            <Layout>
              <Home />
            </Layout>
          )
        }
      />
      <Route
        path="/login"
        element={
          userDetails ? (
            <Navigate to="/dashboard" />
          ) : (
            <Layout>
              <Login updateUserDetails={updateUserDetails} />
            </Layout>
          )
        }
      />
      <Route
        path="/dashboard"
        element={userDetails ? <Dashboard /> : <Navigate to="/login" />}
      />
    </Routes>
  );
}

export default App;

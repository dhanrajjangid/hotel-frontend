import React, { useState, useEffect } from "react";
import axios from "axios";
import { TextField, Button, Typography, Tabs, Tab, Box } from "@mui/material";
import { BACKEND_URL } from "../const";
import { useNavigate } from "react-router-dom";

const AuthPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0); // 0 for Sign In, 1 for Sign Up
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setIsAuthenticated(true);
      const storedUser = JSON.parse(localStorage.getItem("user"));
    }
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint =
      activeTab === 0
        ? `${BACKEND_URL}/auth/signin`
        : `${BACKEND_URL}/auth/signup`;

    try {
      const response = await axios.post(endpoint, formData, {
        headers: { "Content-Type": "application/json" },
      });

      if (activeTab === 0) {
        alert("Sign In Successful");
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(formData));
        setIsAuthenticated(true);
      } else {
        alert("Sign Up Successful");
        setActiveTab(0);
        setFormData({ email: "", password: "" });
      }
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  if (isAuthenticated) {
    navigate("/");
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        maxWidth: "400px",
        margin: "0 auto",
      }}
    >
      <Tabs
        value={activeTab}
        onChange={(e, newValue) => setActiveTab(newValue)}
        variant="fullWidth"
      >
        <Tab label="Sign In" />
        <Tab label="Sign Up" />
      </Tabs>

      <Box mt={2} style={{ width: "100%" }}>
        <Typography variant="h4" component="h1" align="center">
          {activeTab === 0 ? "Sign In" : "Sign Up"}
        </Typography>
        <form
          style={{ width: "100%", marginTop: "1rem" }}
          onSubmit={handleSubmit}
        >
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            margin="normal"
            required
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            type="submit"
            style={{ marginTop: "1rem" }}
          >
            {activeTab === 0 ? "Sign In" : "Sign Up"}
          </Button>
        </form>
      </Box>
    </div>
  );
};

export default AuthPage;

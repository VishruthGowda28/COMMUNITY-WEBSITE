import { TextField, Button, Card, Typography } from "@mui/material";
import { useState, useContext } from "react";
import api from "../api";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [error,setError] = useState("");

  const handleLogin = async ()=>{
    try {
      const { data } = await api.post("/auth/login", { email, password });

      // Save user + token
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.user.role);

      login(data);

      // Show message
      if(data.user.role === "admin") {
        alert("Login Successful — Logged in as ADMIN");
      } else {
        alert("Login Successful — Logged in as MEMBER");
      }

      navigate("/");
    } 
    catch (err) {
      setError("Invalid Email or Password. If you are a new user, please register.");
      console.log(err);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <Card className="p-10 w-96 shadow-xl">

        <Typography variant="h5" className="mb-5 text-center">
          Login
        </Typography>

        {/* ERROR MESSAGE WITH REGISTER BUTTON */}
        {error && (
          <div className="text-center mb-3">
            <p className="text-red-600">{error}</p>

            <Button 
              variant="outlined"
              color="primary"
              href="/register"
              className="mt-2"
            >
              Go to Register
            </Button>
          </div>
        )}

        <TextField
          label="Email"
          fullWidth
          className="mb-4"
          value={email}
          onChange={e=>setEmail(e.target.value)}
        />

        <TextField
          type="password"
          label="Password"
          fullWidth
          className="mb-4"
          value={password}
          onChange={e=>setPassword(e.target.value)}
        />

        {/* 🔹 Forgot Password Link */}
        <p
          className="text-blue-600 cursor-pointer text-sm mb-4"
          onClick={()=>navigate("/forgot")}
        >
          Forgot Password?
        </p>

        <Button 
          fullWidth 
          variant="contained" 
          color="primary" 
          onClick={handleLogin}
        >
          Login
        </Button>

      </Card>
    </div>
  );
}

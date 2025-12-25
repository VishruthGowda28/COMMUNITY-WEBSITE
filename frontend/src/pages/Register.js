import { TextField, Button, Card, Typography } from "@mui/material";
import { useState } from "react";
import api from "../api";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {

  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await api.post("/auth/register",{
        name,
        email,
        password
      });

      alert("Registration Successful");
      navigate("/login");   // safer redirect for Render + SPA
    } 
    catch (err) {
      alert("Registration Failed. Try again.");
      console.log(err);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <Card className="p-10 w-96 shadow-xl">
        
        <Typography variant="h5" className="mb-5 text-center">
          Register
        </Typography>

        <TextField 
          label="Name"
          fullWidth
          className="mb-4"
          value={name}
          onChange={e=>setName(e.target.value)}
        />

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

        <Button 
          fullWidth 
          variant="contained" 
          color="primary"
          onClick={handleRegister}
        >
          Register
        </Button>

        <p className="text-center mt-3 text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 font-semibold">
            Login
          </Link>
        </p>

      </Card>
    </div>
  );
}

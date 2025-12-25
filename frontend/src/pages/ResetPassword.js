import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Card, TextField, Button, Typography } from "@mui/material";
import api from "../api";

export default function ResetPassword(){

  const { token } = useParams();
  const navigate = useNavigate();
  const [password,setPassword] = useState("");

  const submit = async ()=>{
    await api.post(`/auth/reset-password/${token}`,{password});
    alert("Password Reset Successfully");
    navigate("/login");
  };

  return(
    <div className="flex justify-center items-center h-screen">
      <Card className="p-10 w-96">
        <Typography variant="h5" className="mb-4">
          Reset Password
        </Typography>

        <TextField
          type="password"
          label="New Password"
          fullWidth
          className="mb-4"
          value={password}
          onChange={e=>setPassword(e.target.value)}
        />

        <Button fullWidth variant="contained" onClick={submit}>
          Reset
        </Button>
      </Card>
    </div>
  );
}

import { useState } from "react";
import { Card, TextField, Button, Typography } from "@mui/material";
import api from "../api";

export default function ForgotPassword(){

  const [email,setEmail] = useState("");
  const [link,setLink] = useState("");

const submit = async(status)=>{
  await api.post("/posts",
  {title,content,status},
  { headers:{ Authorization:`Bearer ${localStorage.getItem("token")}` } });

  alert(status==="draft" ? "Draft Saved" : "Submitted For Approval");
  window.location="/";
};

  return(
    <div className="flex justify-center items-center h-screen">
      <Card className="p-10 w-96">
        <Typography variant="h5" className="mb-4">
          Forgot Password
        </Typography>

        <TextField
          label="Email"
          fullWidth
          className="mb-4"
          value={email}
          onChange={e=>setEmail(e.target.value)}
        />

        <Button fullWidth variant="contained" onClick={submit}>
          Get Reset Link
        </Button>

        {link && (
          <p className="mt-4 text-sm">
            Copy Reset Link: <br/>
            <a href={link} className="text-blue-600">{link}</a>
          </p>
        )}
        <Button className="mt-4 mr-3" variant="outlined" onClick={()=>submit("draft")}>
 Save Draft
</Button>

<Button className="mt-4" variant="contained" onClick={()=>submit("pending")}>
 Submit For Approval
</Button>

      </Card>
    </div>
  );
}

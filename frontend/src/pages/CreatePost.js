import { TextField, Button, Card } from "@mui/material";
import { useState } from "react";
import api from "../api";

export default function CreatePost(){

  const [title,setTitle]=useState("");
  const [content,setContent]=useState("");

  const submit = async(status)=>{

    await api.post("/posts",
      { title, content, status },
      {
        headers:{ 
          Authorization:`Bearer ${localStorage.getItem("token")}` 
        }
      }
    );

    if(status === "draft")
      alert("Draft Saved Successfully");
    else
      alert("Post Submitted — Waiting for Admin Approval");

    window.location="/";
  };


  return (
    <div className="flex justify-center p-10">
      <Card className="p-10 w-[600px]">

        <TextField 
          label="Title" 
          fullWidth 
          className="mb-4"
          value={title} 
          onChange={e=>setTitle(e.target.value)}
        />

        <TextField 
          label="Content" 
          multiline 
          rows={6} 
          fullWidth
          value={content} 
          onChange={e=>setContent(e.target.value)}
        />

        {/* BUTTONS */}
        <div className="mt-4 flex gap-4">

          <Button 
            variant="outlined"
            onClick={()=>submit("draft")}
          >
            Save Draft
          </Button>

          <Button 
            variant="contained"
            onClick={()=>submit("pending")}
          >
            Submit For Approval
          </Button>

        </div>

      </Card>
    </div>
  );
}

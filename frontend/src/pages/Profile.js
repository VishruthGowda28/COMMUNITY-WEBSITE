import { useEffect, useState } from "react";
import api from "../api";
import { Card, Typography, Button, TextField } from "@mui/material";

export default function Profile(){

 const [user,setUser] = useState({});
 const [bio,setBio] = useState("");

 const token = localStorage.getItem("token");

 useEffect(()=>{
  api.get("/users/me",{
    headers:{ Authorization:`Bearer ${token}` }
  }).then(res=>{
    setUser(res.data);
    setBio(res.data.bio || "");
  });
 },[token]);

 const updateBio = async()=>{
  const {data} = await api.put("/profile/bio",
    { bio },
    { headers:{ Authorization:`Bearer ${token}` } }
  );
  setUser(data);
  alert("Bio Updated");
 };

 const uploadPic = async(e)=>{
  const form = new FormData();
  form.append("avatar", e.target.files[0]);

  const {data} = await api.post("/profile/avatar",
    form,
    { headers:{ Authorization:`Bearer ${token}` } }
  );
  setUser(data);
  alert("Profile Picture Updated");
 };

 return(
  <div className="flex justify-center p-10">
    <Card className="p-10 w-[500px] shadow-xl">

      <Typography variant="h4">My Profile</Typography>

      {user.profilePic && (
        <img
          src={`https://community-web-backend.onrender.com/uploads/${user.profilePic}`}
          className="w-32 h-32 rounded-full mt-4"
          alt="profile"
        />
      )}

      <input type="file" className="mt-3" onChange={uploadPic}/>

      <p className="mt-4"><b>Name:</b> {user.name}</p>
      <p><b>Email:</b> {user.email}</p>

      <TextField
        label="Bio"
        fullWidth
        className="mt-4"
        value={bio}
        onChange={e=>setBio(e.target.value)}
      />
      <Button className="mt-4" variant="contained" onClick={updateBio}>
        Update Bio
      </Button>

      <p className="mt-4"><b>Visibility:</b> {user.visibility}</p>

<Button
  className="mt-2"
  variant="outlined"
  onClick={async()=>{
    const {data} = await api.put("/profile/visibility",
      { visibility:user.visibility==="public"?"private":"public" },
      { headers:{ Authorization:`Bearer ${token}` } }
    );
    setUser(data);
    alert("Visibility Updated");
  }}
>
  Toggle Visibility
</Button>


    </Card>
  </div>
 );
}

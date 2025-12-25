import { useEffect,useState } from "react";
import api from "../api";
import { Card, Avatar, Typography } from "@mui/material";

export default function Members(){
 const [members,setMembers] = useState([]);

 useEffect(()=>{
   api.get("/users/members",{
     headers:{ Authorization: `Bearer ${localStorage.getItem("token")}` }
   }).then(res=>setMembers(res.data))
 },[]);

 return (
  <div className="p-8 grid grid-cols-3 gap-6">
    {members.map(m=>(
      <Card key={m._id} className="p-6 flex items-center gap-4 shadow-lg">
        <Avatar src={m.profilePic}/>
        <div>
          <Typography variant="h6">{m.name}</Typography>
          <p className="text-gray-500">{m.email}</p>
        </div>
      </Card>
    ))}
  </div>
 );
}

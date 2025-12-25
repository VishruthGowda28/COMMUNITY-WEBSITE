import { useEffect, useState } from "react";
import api from "../api";
import { Card, Typography, Button } from "@mui/material";

export default function AdminDashboard(){

 const [stats,setStats]=useState({});
 const [users,setUsers]=useState([]);
 const [posts,setPosts]=useState([]);
 const [pending,setPending]=useState([]);

 const token = localStorage.getItem("token");

 useEffect(()=>{

  if(!token) return;

  // Dashboard Stats
  api.get("/admin/stats",{ headers:{Authorization:`Bearer ${token}`} })
    .then(res=>setStats(res.data));

  // Users
  api.get("/users/members",{ headers:{Authorization:`Bearer ${token}`} })
    .then(res=>setUsers(res.data));

  // Published Posts
  api.get("/posts")
    .then(res=>setPosts(res.data));

  // Pending Posts
  api.get("/admin/pending-posts",{ headers:{Authorization:`Bearer ${token}`} })
    .then(res=>setPending(res.data));

 },[token]);


 // DELETE USER
 const deleteUser = async(id)=>{
  await api.delete(`/admin/user/${id}`,{
    headers:{Authorization:`Bearer ${token}`}
  });
  alert("User Deleted");
  window.location.reload();
 };


 // DELETE POST
 const deletePost = async(id)=>{
  await api.delete(`/admin/post/${id}`,{
    headers:{Authorization:`Bearer ${token}`}
  });
  alert("Post Deleted");
  window.location.reload();
 };


 // APPROVE POST
 const approve = async(id)=>{
  await api.put(`/admin/post/${id}/approve`,{},{
    headers:{Authorization:`Bearer ${token}`}
  });
  alert("Approved");
  window.location.reload();
 };


 // REJECT POST
 const reject = async(id)=>{
  await api.put(`/admin/post/${id}/reject`,{},{
    headers:{Authorization:`Bearer ${token}`}
  });
  alert("Rejected");
  window.location.reload();
 };


 return(
  <div className="p-10">

    <Typography variant="h4">Admin Dashboard</Typography>

    {/* STATS */}
    <Card className="p-6 mt-4">
      <p>Users: {stats.users}</p>
      <p>Posts: {stats.posts}</p>
    </Card>


    {/* USERS */}
    <Typography variant="h5" className="mt-6">Users</Typography>

    {users.map(u=>(
      <Card key={u._id} className="p-4 mt-2 flex justify-between">
        <p>{u.name} - {u.email}</p>

        <Button
          color="error"
          onClick={()=>deleteUser(u._id)}
        >
          Delete
        </Button>
      </Card>
    ))}


    {/* APPROVED POSTS */}
    <Typography variant="h5" className="mt-6">Published Posts</Typography>

    {posts.map(p=>(
      <Card key={p._id} className="p-4 mt-2 flex justify-between">
        <p>{p.title}</p>

        <Button
          color="error"
          onClick={()=>deletePost(p._id)}
        >
          Delete
        </Button>
      </Card>
    ))}


    {/* PENDING POSTS */}
    <Typography variant="h5" className="mt-6">Pending Posts</Typography>

    {pending.length === 0 && <p>No pending posts</p>}

    {pending.map(p=>(
      <Card key={p._id} className="p-4 mt-2 flex justify-between">
        <p>{p.title} — {p.author?.name}</p>

        <div>
          <Button color="success" onClick={()=>approve(p._id)}>
            Approve
          </Button>

          <Button color="error" onClick={()=>reject(p._id)}>
            Reject
          </Button>
        </div>
      </Card>
    ))}

  </div>
 );
}

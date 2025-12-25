import { useEffect, useState } from "react";
import api from "../api";
import { Card, Typography, TextField, Button } from "@mui/material";

export default function Blogs() {

  const [posts,setPosts] = useState([]);

  // ⭐ IMPORTANT CHANGE — separate comment state for each post
  const [comment,setComment] = useState({});

  const token = localStorage.getItem("token");

  useEffect(()=>{
  api.get("/posts")
    .then(res => setPosts(res.data))
    .catch(err => {
      console.log("POST FETCH ERROR:", err);
    });
},[]);

  // ⭐ LIKE FUNCTION
  const like = async(id)=>{
    if(!token){
      alert("Login to Like");
      return;
    }

    await api.post(`/posts/${id}/like`,{},{
      headers:{ Authorization:`Bearer ${token}` }
    });

    const {data} = await api.get("/posts");
    setPosts(data);
  };

  // ⭐ COMMENT FUNCTION (works per post)
  const addComment = async(postId)=>{
    if(!token){
      alert("Login to comment");
      return;
    }

    await api.post(`/posts/${postId}/comment`,
      { text: comment[postId] },
      { headers:{ Authorization:`Bearer ${token}` } }
    );

    // clear only that comment box
    setComment(prev => ({ ...prev, [postId]: "" }));

    const {data} = await api.get("/posts");
    setPosts(data);
  };

  return (
    <div className="p-10 space-y-6">

      <Typography variant="h4" className="mb-4">
        Community Blogs
      </Typography>

      {Array.isArray(posts) && posts.map(post => (
        <Card key={post._id} className="p-6 shadow-lg">

          <Typography variant="h5">
            {post.title}
          </Typography>

          <p className="text-gray-600 mt-2">
            {post.content}
          </p>

          <p className="text-sm text-gray-400 mt-2">
            Author: {post.author?.name || "User"}
          </p>

          {/* Comments Section */}
          <div className="mt-4">
            <Typography variant="subtitle1">Comments</Typography>

            {post.comments?.length > 0 ? (
              post.comments.map((c,i)=>(
                <p key={i} className="text-sm text-gray-700">
                  • {c.text}
                </p>
              ))
            ) : (
              <p className="text-gray-400 text-sm">No comments yet</p>
            )}
          </div>

          {/* Actions */}
          <div className="mt-4 flex gap-3">

            {/* LIKE BUTTON */}
            <Button onClick={()=>like(post._id)}>
              👍 {post.likes?.length || 0}
            </Button>

            {/* COMMENT INPUT — per post */}
            <TextField
              size="small"
              placeholder="Add a comment..."
              value={comment[post._id] || ""}
              onChange={e =>
                setComment({
                  ...comment,
                  [post._id]: e.target.value
                })
              }
              className="w-full"
            />

            <Button
              variant="contained"
              onClick={()=>addComment(post._id)}
            >
              Post
            </Button>

          </div>

        </Card>
      ))}
    </div>
  );
}

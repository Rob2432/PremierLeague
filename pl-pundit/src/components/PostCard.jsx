import React from "react";
import "./PostCard.css";

export default function PostCard({ post, onClick }) {
  return (
    <div className="post-card" onClick={() => onClick(post.id)}>
      <h3>{post.title}</h3>
      <div className="post-info">
        <span>{new Date(post.createdAt).toLocaleString()}</span>
        <span>Upvotes: {post.upvotes || 0}</span>
      </div>
    </div>
  );
}

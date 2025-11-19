import React from "react";

export default function PostCard({ post, onClick }) {
  return (
    <div
      className="post-card"
      onClick={() => onClick(post.id)}
      style={{
        border: "2px solid #37003c",
        borderRadius: "10px",
        padding: "16px",
        marginBottom: "12px",
        cursor: "pointer",
        background: "#ffffff",
        transition: "transform 0.1s ease",
      }}
    >
      <h3 style={{ color: "#37003c" }}>{post.title}</h3>
      <p style={{ fontSize: "14px", color: "#1a1a1a" }}>
        Created: {new Date(post.createdAt).toLocaleString()}
      </p>
      <p style={{ fontWeight: "bold", color: "#00ff87" }}>Upvotes: {post.upvotes || 0}</p>
    </div>
  );
}

import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function PostPage({ posts, onUpvote, onEdit, onDelete }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const post = posts.find((p) => p.id === Number(id));

  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(post?.title || "");
  const [editContent, setEditContent] = useState(post?.content || "");
  const [editImageUrl, setEditImageUrl] = useState(post?.imageUrl || "");
  const [commentText, setCommentText] = useState("");

  if (!post) return <p>Post not found!</p>;

  // Add comment to post
  const handleAddComment = () => {
    if (!commentText.trim()) return;

    const newComment = {
      id: Date.now(),
      text: commentText,
      createdAt: new Date().toISOString(),
    };

    if (!post.comments) post.comments = [];
    post.comments.unshift(newComment);

    setCommentText("");
  };

  // Save edited post
  const handleSaveEdit = () => {
    onEdit(post.id, {
      title: editTitle,
      content: editContent,
      imageUrl: editImageUrl,
    });
    setIsEditing(false);
  };

  // Delete post and navigate back to home
  const handleDelete = () => {
    onDelete(post.id);
    navigate("/");
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
      <button
        onClick={() => navigate(-1)}
        style={{ marginBottom: "20px", padding: "6px 12px", borderRadius: "6px" }}
      >
        ← Back
      </button>

      {isEditing ? (
        <div>
          <input
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
          />
          <textarea
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
          />
          <input
            value={editImageUrl}
            onChange={(e) => setEditImageUrl(e.target.value)}
            style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
          />
          <button
            onClick={handleSaveEdit}
            style={{
              padding: "10px 20px",
              marginRight: "10px",
              background: "#37003c",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            Save
          </button>
          <button
            onClick={() => setIsEditing(false)}
            style={{
              padding: "10px 20px",
              background: "#999",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            Cancel
          </button>
        </div>
      ) : (
        <div>
          <h1 style={{ color: "#37003c" }}>{post.title}</h1>
          {post.content && <p>{post.content}</p>}
          {post.imageUrl && (
            <img
              src={post.imageUrl}
              alt="Post"
              style={{ maxWidth: "100%", borderRadius: "8px", marginTop: "10px" }}
            />
          )}
          <p style={{ color: "#1a1a1a", marginTop: "10px" }}>
            Created: {new Date(post.createdAt).toLocaleString()}
          </p>
          <p style={{ color: "#00ff87", fontWeight: "bold" }}>Upvotes: {post.upvotes}</p>

          <button
            onClick={() => onUpvote(post.id)}
            style={{
              marginTop: "10px",
              padding: "10px 20px",
              background: "#37003c",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            Upvote
          </button>

          <div style={{ marginTop: "20px" }}>
            <button
              onClick={() => setIsEditing(true)}
              style={{
                padding: "8px 16px",
                marginRight: "10px",
                background: "#00ff87",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              Edit Post
            </button>
            <button
              onClick={handleDelete}
              style={{
                padding: "8px 16px",
                background: "#ff4d4d",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                color: "white",
              }}
            >
              Delete Post
            </button>
          </div>
        </div>
      )}

      {/* Comments Section */}
      <div style={{ marginTop: "30px" }}>
        <h2 style={{ color: "#37003c" }}>Comments</h2>

        <textarea
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="Add a comment..."
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "6px",
            border: "2px solid #37003c",
            marginBottom: "10px",
          }}
        />

        <button
          onClick={handleAddComment}
          style={{
            padding: "8px 16px",
            background: "#37003c",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Post Comment
        </button>

        {post.comments && post.comments.length > 0 && (
          <div style={{ marginTop: "20px" }}>
            {post.comments.map((comment) => (
              <div
                key={comment.id}
                style={{
                  borderBottom: "1px solid #ccc",
                  padding: "10px 0",
                }}
              >
                <p>{comment.text}</p>
                <small style={{ color: "#1a1a1a" }}>
                  {new Date(comment.createdAt).toLocaleString()}
                </small>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

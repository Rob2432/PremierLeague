import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./PostPage.css";

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

  const handleSaveEdit = () => {
    onEdit(post.id, {
      title: editTitle,
      content: editContent,
      imageUrl: editImageUrl,
    });
    setIsEditing(false);
  };

  const handleDelete = () => {
    onDelete(post.id);
    navigate("/");
  };

  return (
    <div className="post-page-container">
      <button className="back-button" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <div className="post-card-container">
        {isEditing ? (
          <div>
            <input
              className="edit-input"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
            />
            <textarea
              className="edit-textarea"
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
            />
            <input
              className="edit-input"
              value={editImageUrl}
              onChange={(e) => setEditImageUrl(e.target.value)}
            />
            <button className="save-button" onClick={handleSaveEdit}>
              Save
            </button>
            <button
              className="cancel-button"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </button>
          </div>
        ) : (
          <div>
            <h1 className="post-title">{post.title}</h1>
            {post.content && <p className="post-content">{post.content}</p>}
            {post.imageUrl && (
              <img src={post.imageUrl} alt="Post" className="post-image" />
            )}
            <p className="post-meta">
              Created: {new Date(post.createdAt).toLocaleString()}
            </p>
            <p className="upvotes">Upvotes: {post.upvotes}</p>

            <button
              className="upvote-button"
              onClick={() => onUpvote(post.id)}
            >
              Upvote
            </button>

            <div style={{ marginTop: "20px" }}>
              <button
                className="edit-button"
                onClick={() => setIsEditing(true)}
              >
                Edit Post
              </button>
              <button className="delete-button" onClick={handleDelete}>
                Delete Post
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="comment-section">
        <h2>Comments</h2>
        <textarea
          className="comment-input"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="Add a comment..."
        />
        <button className="comment-button" onClick={handleAddComment}>
          Post Comment
        </button>

        {post.comments && post.comments.length > 0 && (
          <div style={{ marginTop: "20px" }}>
            {post.comments.map((comment) => (
              <div key={comment.id} className="comment-item">
                <p>{comment.text}</p>
                <small>{new Date(comment.createdAt).toLocaleString()}</small>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

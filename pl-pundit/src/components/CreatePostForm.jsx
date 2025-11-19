import { useState } from "react";

export default function CreatePostForm({ onCreatePost }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) {
      alert("Post title is required.");
      return;
    }

    const newPost = {
      id: Date.now(),
      title,
      content,
      imageUrl,
      createdAt: new Date().toISOString(),
    };

    onCreatePost(newPost);

    // Reset form
    setTitle("");
    setContent("");
    setImageUrl("");
  };

  return (
    <form onSubmit={handleSubmit} className="create-post-form">
      <h2>Create a New Post</h2>

      <label>Post Title (required)</label>
      <input 
        type="text" 
        value={title} 
        onChange={(e) => setTitle(e.target.value)} 
        placeholder="Enter post title..."
      />

      <label>Additional Text</label>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write your analysis, thoughts, or bet reasoning..."
      />

      <label>Image URL</label>
      <input
        type="text"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
        placeholder="https://example.com/player.jpg"
      />

      <button type="submit">Create Post</button>
    </form>
  );
}

import { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import CreatePostForm from "./components/CreatePostForm";
import PostCard from "./components/PostCard";
import PostPage from "./pages/PostPage";

function Home({ posts, addPost }) {
  const navigate = useNavigate();

  const handlePostClick = (postId) => {
    navigate(`/post/${postId}`);
  };

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <h1 style={{ textAlign: "center", color: "#37003c" }}>PL Pundits</h1>

      {/* Home Feed first */}
      <h2 style={{ color: "#37003c", marginTop: "30px" }}>Home Feed</h2>
      {posts.length === 0 ? (
        <p>No posts yet.</p>
      ) : (
        posts.map((post) => (
          <PostCard key={post.id} post={post} onClick={handlePostClick} />
        ))
      )}

      {/* Divider */}
      <hr
        style={{
          border: "none",
          borderTop: "2px solid #e5e7eb",
          margin: "40px 0",
          borderRadius: "4px",
        }}
      />

      {/* Create Post Form below the feed */}
      <CreatePostForm onCreatePost={addPost} />
    </div>
  );
}

function App() {
  const [posts, setPosts] = useState([]);

  // Add a new post
  const addPost = (newPost) => {
    setPosts([{ ...newPost, upvotes: 0 }, ...posts]);
  };

  // Upvote a post by ID
  const upvotePost = (postId) => {
    setPosts(
      posts.map((post) =>
        post.id === postId ? { ...post, upvotes: post.upvotes + 1 } : post
      )
    );
  };

  // Edit a post by ID
  const editPost = (postId, updatedPost) => {
    setPosts(
      posts.map((post) =>
        post.id === postId ? { ...post, ...updatedPost } : post
      )
    );
  };

  // Delete a post by ID
  const deletePost = (postId) => {
    setPosts(posts.filter((post) => post.id !== postId));
  };

  return (
    <Routes>
      <Route path="/" element={<Home posts={posts} addPost={addPost} />} />
      <Route
        path="/post/:id"
        element={
          <PostPage
            posts={posts}
            onUpvote={upvotePost}
            onEdit={editPost}
            onDelete={deletePost}
          />
        }
      />
    </Routes>
  );
}

export default App;

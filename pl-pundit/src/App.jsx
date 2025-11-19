import { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import CreatePostForm from "./components/CreatePostForm";
import PostCard from "./components/PostCard";
import PostPage from "./pages/PostPage";

function Home({ posts, addPost }) {
  const navigate = useNavigate();
  const [sortBy, setSortBy] = useState("creation"); // "creation" or "upvotes"
  const [searchTerm, setSearchTerm] = useState("");

  const handlePostClick = (postId) => {
    navigate(`/post/${postId}`);
  };

  // Filter posts by search term
  let filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort posts
  filteredPosts.sort((a, b) => {
    if (sortBy === "creation") {
      return new Date(b.createdAt) - new Date(a.createdAt); // newest first
    } else if (sortBy === "upvotes") {
      return b.upvotes - a.upvotes; // highest upvotes first
    }
    return 0;
  });

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <h1 style={{ textAlign: "center", color: "#37003c" }}>PL Pundits</h1>

      <CreatePostForm onCreatePost={addPost} />

      {/* Search and Sort */}
      <div style={{ marginTop: "20px", display: "flex", justifyContent: "space-between" }}>
        <input
          type="text"
          placeholder="Search posts by title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: "8px",
            borderRadius: "6px",
            border: "2px solid #37003c",
            flex: 1,
            marginRight: "10px",
          }}
        />
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          style={{ padding: "8px", borderRadius: "6px", border: "2px solid #37003c" }}
        >
          <option value="creation">Sort by: Creation Time</option>
          <option value="upvotes">Sort by: Upvotes</option>
        </select>
      </div>

      <h2 style={{ color: "#37003c", marginTop: "30px" }}>Home Feed</h2>
      {filteredPosts.length === 0 ? (
        <p>No posts found.</p>
      ) : (
        filteredPosts.map((post) => (
          <PostCard key={post.id} post={post} onClick={handlePostClick} />
        ))
      )}
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

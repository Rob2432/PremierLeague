import { useState } from "react";
import CreatePostForm from "./components/CreatePostForm";
import PostCard from "./components/PostCard";

function App() {
  const [posts, setPosts] = useState([]);

  const addPost = (newPost) => {
    // Add upvotes property by default
    setPosts([{ ...newPost, upvotes: 0 }, ...posts]);
  };

  const handlePostClick = (postId) => {
    alert(`Post clicked! ID: ${postId}`);
    // Later: navigate to PostPage using React Router
  };

  return (
    <div className="App" style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <h1 style={{ textAlign: "center", color: "#37003c" }}>PL Pundits</h1>

      <CreatePostForm onCreatePost={addPost} />

      <h2 style={{ color: "#37003c", marginTop: "30px" }}>Home Feed</h2>
      {posts.length === 0 ? (
        <p>No posts yet.</p>
      ) : (
        posts.map((post) => (
          <PostCard key={post.id} post={post} onClick={handlePostClick} />
        ))
      )}
    </div>
  );
}

export default App;

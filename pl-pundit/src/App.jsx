import { useState } from "react";
import CreatePostForm from "./components/CreatePostForm";

function App() {
  const [posts, setPosts] = useState([]);

  const addPost = (newPost) => {
    setPosts([newPost, ...posts]); // add newest post to top
  };

  return (
    <div className="App">
      <h1>PL Pundits</h1>

      <CreatePostForm onCreatePost={addPost} />

      <h2>Posts</h2>
      {posts.length === 0 ? (
        <p>No posts yet.</p>
      ) : (
        posts.map((post) => (
          <div
            key={post.id}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              marginBottom: "10px",
            }}
          >
            <h3>{post.title}</h3>
            <p>Created: {new Date(post.createdAt).toLocaleString()}</p>
            <p>Upvotes: {post.upvotes}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default App;


import React, { useState, useEffect } from "react";

const CommentsContainer = () => {
  const [comments, setComments] = useState([]);

  
  useEffect(() => {
    const storedComments = JSON.parse(localStorage.getItem("comments")) || [];
    setComments(storedComments);
  }, []);

 
  useEffect(() => {
    localStorage.setItem("comments", JSON.stringify(comments));
    console.log("LocalStorage Current Comments:", comments);
  }, [comments]);

  const handleAddComment = (newComment) => {
    if (newComment.trim()) {
      setComments([...comments, newComment.trim()]);
    }
  };

  return (
    <div className="m-5 p-2">
      <h1 className="text-2xl font-bold">Comments:</h1>
      <div>
        {comments.length > 0 ? (
          <ul>
            {comments.map((comment, index) => (
              <li key={index}>{comment}</li>
            ))}
          </ul>
        ) : (
          <p>No comments yet.</p>
        )}
      </div>
      <input
        type="text"
        placeholder="Add a comment"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleAddComment(e.target.value);
            e.target.value = ""; 
          }
        }}
        className="border p-1 mt-2 w-full"
      />
    </div>
  );
};

export default CommentsContainer;

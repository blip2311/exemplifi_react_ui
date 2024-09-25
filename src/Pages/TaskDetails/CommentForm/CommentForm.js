import React, { useState } from 'react';
import './CommentForm.scss';
const CommentForm = () => {
  // State for form inputs
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]); // State to store all comments

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Save comment if both name and comment are not empty
    if (name && comment) {
      const newComment = { name, comment };
      
      // Log the new comment in the console
      console.log(newComment);
      
      // Add the new comment to the list
      setComments([...comments, newComment]);

      // Clear name and comment fields
      setName('');
      setComment('');
    }
  };

  return (
    <>
      <form className="comment-form" onSubmit={handleSubmit}>
        <div className="col-12 col-md-4 mb-3">
          <input
            type="text"
            className="form-control"
            id="name"
            aria-describedby="emailHelp"
            value={name}
            onChange={(e) => setName(e.target.value)} // Update name state
            placeholder="Name"
          />
        </div>

        <div className="col-12 col-md-4 mb-4">
          <textarea
            className="form-control"
            name="comment-text"
            id="text-area"
            placeholder="Please add a comment"
            rows="3"
            value={comment}
            onChange={(e) => setComment(e.target.value)} // Update comment state
          ></textarea>
        </div>

        <button type="submit" className="btn btn-secondary px-4">
          Submit
        </button>
      </form>

      {/* Display the list of comments */}
      <ul className="comment-list mt-4">
        {comments.map((commentItem, index) => (
          <li key={index}>
            <span>{commentItem.name}</span> {commentItem.comment}
          </li>
        ))}
      </ul>
    </>
  );
};

export default CommentForm;

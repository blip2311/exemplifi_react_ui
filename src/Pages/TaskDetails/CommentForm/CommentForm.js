import React, { useState } from "react";
import "./CommentForm.scss";
import { useEffect } from "react";
import { getRouteAsync } from "../../../Utils/routeHelper";
import { getToken } from "../../../Utils/cookieHelper";
const CommentForm = ({ id }) => {
  // State for form inputs
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]); // State to store all comments
  const [token, setToken] = useState("");

  useEffect(() => {
    const getComments = async () => {
      try {
        const routeObject = await getRouteAsync("tasks.comments.index");
        if (routeObject && routeObject.url) {
          const url = routeObject.url.replace("{task}", id);
          // fetch comments
          const response = await fetch(url, { method: routeObject.methods[0] });
          if (!response.ok) {
            //Throw error when the response is not ok
            throw new Error("Network response was not ok");
          }
          const jsonData = await response.json();
          setComments(jsonData.data);
        } else {
          //Throw error when url is returned
          throw new Error("No Url returned");
        }
      } catch (error) {
        console.error("Error fetching task data:", error);
      }
    };
    getComments();
  }, [id]);

  useEffect(() => {
    const fetchToken = async () => {
      setToken(await getToken());
    };
    fetchToken();
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Save comment if both name and comment are not empty
    if (name && comment) {
      const requestBody = { author_name: name, content: comment };
      let newComment = { name, comment };

      try {
        const routeObject = await getRouteAsync("tasks.comments.store");
        if (!routeObject || !routeObject.url) {
          throw new Error("No url returned");
        }
        const url = routeObject.url.replace("{task}", id);
        const response = await fetch(url, {
          method: routeObject.methods[0],
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "X-XSRF-TOKEN": token,
          },

          body: JSON.stringify(requestBody),
        });
        if (!response.ok) {
          throw new Error("Error saving comment");
        }
        newComment = await response.json();
      } catch (error) {
        console.error("Error saving Comment: ", error);
      }

      // Log the new comment in the console
      console.log(newComment);

      // Add the new comment to the list
      setComments([...comments, newComment]);

      // Clear name and comment fields
      setName("");
      setComment("");
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

        <button type="submit" className="btn btn-secondary px-4 mt-2 mb-4">
          Submit
        </button>
      </form>
      <hr></hr>
      {/* Display the list of comments */}
      <h4>Comments</h4>
      <ul className="comment-list mt-4">
        {comments.map((commentItem, index) => (
          <li key={index}>
            <span>{commentItem.author_name}</span> {commentItem.content}
          </li>
        ))}
        {/* <li>
          <span>Vivek</span> Contrary to popular belief, Lorem Ipsum is not
          simply random text. It has roots in a piece of classical Latin
        </li>
        <li>
          <span>Vivek</span> Contrary to popular belief, Lorem Ipsum is not
          simply random text. It has roots in a piece of classical Latin
        </li> */}
      </ul>
    </>
  );
};

export default CommentForm;

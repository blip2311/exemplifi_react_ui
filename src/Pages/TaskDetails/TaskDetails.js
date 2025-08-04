import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FaRegClock, FaStarHalfAlt } from "react-icons/fa";
import "./TaskDetails.scss";
import CommentForm from "./CommentForm/CommentForm";
// Import getRouteAsync if it's exported from a utility file
import { getRouteAsync } from "../../Utils/routeHelper";

const CardDetails = () => {
  const { id } = useParams();

  // State to hold task details
  const [taskDetails, setTaskDetails] = useState({
    title: "",
    due_date: "",
    status: "",
    description: "",
  });

  useEffect(() => {
    const fetchTaskDetails = async () => {
      try {
        getRouteAsync("tasks.index").then(async (routeObject) => {
          const url = routeObject.url;
          const response = await fetch(url, { method: routeObject.methods[0] });
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const jsonData = await response.json();
          // const response = await fetch("/Data.json");
          // const data = await response.json();
          const task = jsonData.data.find((task) => task.id === parseInt(id));
          console.log(task);
          setTaskDetails(task || {});
        });
      } catch (error) {
        console.error("Error fetching task data:", error);
      }
    };

    fetchTaskDetails();
  }, [id]);

  return (
    <main className="content-wrapper">
      <div className="container">
        <div className="row">
          <div className="col-12 task-details-wrap">
            <h1 className="heading">{taskDetails.title}</h1>

            <table>
              <tbody>
                <tr>
                  <th>
                    <FaRegClock /> Created At
                  </th>
                  <td>{taskDetails.due_date}</td>
                </tr>
                <tr>
                  <th>
                    <FaStarHalfAlt /> Status
                  </th>
                  <td>
                    <span className="status">{taskDetails.status}</span>
                  </td>
                </tr>
              </tbody>
            </table>

            <h4 className="mt-4">Description</h4>
            <p>{taskDetails.description}</p>

            <h6 className="mt-4">Add Comment</h6>

            <CommentForm id={id} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default CardDetails;

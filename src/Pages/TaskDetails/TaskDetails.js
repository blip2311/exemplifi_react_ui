import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FaRegClock, FaStarHalfAlt} from "react-icons/fa";
import { taskData } from "../../Data";
import "./TaskDetails.scss";
import CommentForm from "./CommentForm/CommentForm";
const CardDetails = () => {
  const { id } = useParams(); 

  // State to hold task details
  const [taskDetails, setTaskDetails] = useState({
    title: "",
    date: "",
    status: "",
  });
  useEffect(() => {
    const fetchTaskDetails = async (id) => {
    
        setTaskDetails(taskData[id] || {});
    
    };
    fetchTaskDetails(id);
  }, [id]);

  return (
    <main className="content-wrapper">
      <div className="container">
        <div className="row">
          <div className="col-12 task-details-wrap">
            <h1 className="heading">{taskDetails.title}</h1>

            <table>
                <tr>
                  <th>
                    <FaRegClock /> Created At
                  </th>
                  <td>{taskDetails.date}</td>
                </tr>
                <tr>
                  <th>
                    <FaStarHalfAlt /> Status
                  </th>
                  <td>
                    <span className="status">{taskDetails.status}</span>
                  </td>
                </tr>
            </table>

            <h4 className="mt-4">Description</h4>
            <p>{taskDetails.description}</p>

            <h6 className="mt-4">Add Comment</h6>
            
            <CommentForm />
            
          </div>
        </div>
      </div>
    </main>
  );
};

export default CardDetails;

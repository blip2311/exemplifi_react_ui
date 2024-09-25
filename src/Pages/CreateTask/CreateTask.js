import React, { useState } from "react";
import "./CreateTask.scss";
import TopHeader from "../../Layout/Header/TopHeader";
import { addTaskData } from "../../Data"; // Import the function from Data.js

export const CreateTask = () => {
  const [formData, setFormData] = useState({
    title: "",
    status: "",
    dueDate: "",
    description: ""
  });
  const [popupVisible, setPopupVisible] = useState(false); // State for popup visibility
  // Handler for form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handler for form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit form data to Data.js
    addTaskData({
      title: formData.title,
      status: formData.status,
      date: formData.dueDate,
      description: formData.description
    });
    console.log("Form Submitted:", formData);
    setFormData({
      title: '',
      status: '',
      dueDate: '',
      description: ''
    });
    // Show the popup
    setPopupVisible(true);
    
    // Hide the popup after 3 seconds
    setTimeout(() => {
      setPopupVisible(false);
    }, 3000);
  };

  return (
    <main className="content-wrapper">
      <TopHeader />
      {popupVisible && (
        <div className="alert alert-success mt-3" role="alert">
          Task Submitted Successfully!
        </div>
      )}
      <form className="create-task-form" onSubmit={handleSubmit}>
        <h4 className="mb-4 form-heading">Create Task</h4>
        <div className="row">
          <div className="col-12 col-md-6 mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-12 col-md-6 mb-3">
            <label htmlFor="filter-with-status" className="form-label">
              Select Status
            </label>
            <select
              className="form-select"
              name="status"
              id="filter-with-status"
              value={formData.status}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                Select status
              </option>
              <option value="In Progress">In Progress</option>
              <option value="Todo">Todo</option>
              <option value="Completed">Completed</option>
              <option value="Pending">Pending</option>
              <option value="Under Review">Under Review</option>
            </select>
          </div>
          <div className="col-12 col-md-6 mb-3">
            <label htmlFor="dueDate" className="form-label">
              Due Date
            </label>
            <input
              type="date"
              id="dueDate"
              name="dueDate"
              className="form-control"
              value={formData.dueDate}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-12 mb-4">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <textarea
              className="form-control"
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Please add a description"
              rows="3"
            ></textarea>
          </div>
        </div>

        <button type="submit" className="btn btn-secondary px-4">
          Submit
        </button>
      </form>
      
    </main>
  );
};

export default CreateTask;

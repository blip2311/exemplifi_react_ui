import React, { useEffect, useState } from "react";
import "./CreateTask.scss";
import TopHeader from "../../Layout/Header/TopHeader";
import { getRouteAsync } from "../../Utils/routeHelper";
import { getToken } from "../../Utils/cookieHelper";

export const CreateTask = () => {
  const [formData, setFormData] = useState({
    title: "",
    status: "",
    dueDate: "",
    description: "",
  });
  const [popupVisible, setPopupVisible] = useState(false); // State for popup visibility
  const [popupError, setPopupError] = useState(""); // State for error popup
  const [token, setToken] = useState("");

  useEffect(() => {
    const fetchToken = async () => {
      setToken(await getToken());
    };
    fetchToken();
  }, []);

  // Load tasks from local storage on component mount
  const loadTasks = () => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  };

  // Handler for form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handler for form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Get current tasks from local storage
    const tasks = loadTasks();

    // Add the new task
    let newTask = {
      title: formData.title,
      status: formData.status,
      date: formData.dueDate,
      description: formData.description,
    };
    const body = JSON.stringify({
      title: formData.title,
      description: formData.description,
      status: formData.status,
      due_date: formData.dueDate,
    });

    try {
      //Get the saving Url
      const routeObject = await getRouteAsync("tasks.store");
      if (!routeObject || !routeObject.url) {
        throw new Error("Could not retrieve the route");
      }

      //Post the data to API to save to Database
      const response = await fetch(routeObject.url, {
        method: routeObject.methods[0],
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "X-XSRF-TOKEN": token,
        },
        credentials: "include",
        body: body,
      });

      if (response.status === 422) {
        // Show error messages in popup
        console.log("Error 422");
        let errorMsg = "Error: Payment Required.";
        try {
          const errorData = await response.json();
          if (errorData && errorData.message) {
            errorMsg = errorData.message;
            console.log("Error: " + errorMsg);
          }
        } catch (error) {
          console.error("error retrieveing error");
        }
        setPopupError(errorMsg);
        setPopupVisible(true);
        setTimeout(() => {
          setPopupVisible(false);
          setPopupError("");
        }, 3000);
        return;
      }

      if (!response.ok) {
        throw new Error("Could not save the task");
      }

      newTask = await response.json();
    } catch (error) {
      console.error("Error saving Task: ", error);
    }
    // Save the updated tasks back to local storage
    tasks.push(newTask);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    // Log the tasks in JSON format
    console.log("Tasks in JSON format:", JSON.stringify(tasks, null, 2)); // Pretty print with 2 spaces

    // Reset form data
    setFormData({
      title: "",
      status: "",
      dueDate: "",
      description: "",
    });

    // Show the popup
    setPopupVisible(true);
    setTimeout(() => {
      setPopupVisible(false);
      setPopupError("");
    }, 3000);
  };

  return (
    <main className="content-wrapper">
      <TopHeader />
      {popupVisible && (
        <div
          className={`alert mt-3 ${
            popupError ? "alert-danger" : "alert-success"
          }`}
          role="alert"
        >
          {popupError ? popupError : "Task Submitted Successfully!"}
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
              <option value="in-progress">In Progress</option>
              {/* <option value="Todo">Todo</option> */}
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
              {/* <option value="Under Review">Under Review</option> */}
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

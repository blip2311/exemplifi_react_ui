import React, { useState, useEffect } from "react";

export const FilterForm = () => {
  // State for the selected date and status
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');

  // State to store fetched data
  const [taskData, setTaskData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data from Data.json on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/Data.json");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setTaskData(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Get unique dates and statuses from taskData
  const uniqueDates = [...new Set(taskData.map(card => card.date))];
  const uniqueStatuses = [...new Set(taskData.map(card => card.status))];

  // Handlers for select changes
  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const handleStatusChange = (e) => {
    setSelectedStatus(e.target.value);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <form className="filter-form">
      <h6>Filter By</h6>
      
      <div className="input-group">
        <label htmlFor="filter-with-date" className="select-label">
          Due Date
        </label>
        <select
          className="form-select"
          aria-label="date select"
          id="filter-with-date"
          value={selectedDate}
          onChange={handleDateChange}
        >
          <option value="" disabled>Select Date</option>
          {uniqueDates.map((date, index) => (
            <option key={index} value={date}>{date}</option>
          ))}
        </select>
      </div>
      
      <div className="input-group">
        <label htmlFor="filter-with-status" className="select-label">
          Status
        </label>
        <select
          className="form-select"
          aria-label="status select"
          id="filter-with-status"
          value={selectedStatus}
          onChange={handleStatusChange}
        >
          <option value="" disabled>Select Status</option>
          {uniqueStatuses.map((status, index) => (
            <option key={index} value={status}>{status}</option>
          ))}
        </select>
      </div>
    </form>
  );
};

export default FilterForm;

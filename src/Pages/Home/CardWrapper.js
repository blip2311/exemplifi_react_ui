import React, { useEffect, useState } from "react";
import CardComponent from "./TaskCard";

export const CardWrapper = () => {
  const [taskData, setTaskData] = useState([]);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/Data.json'); // Fetching from the local JSON file
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const jsonData = await response.json();
        setTaskData(jsonData);
      } catch (err) {
        setError(err);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <div className="col-12 card-wrapper">
        {taskData.map((card) => (
          <CardComponent 
            key={card.id} 
            id={card.id}
            status={card.status} 
            title={card.title} 
            date={card.date} 
          />
        ))}
      </div>
    </>
  );
};

export default CardWrapper;


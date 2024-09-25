import React from "react";
import CardComponent from "./TaskCard";
import { taskData } from "../../Data";
export const CardWrapper = () => {
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
}
export default CardWrapper;

import React from 'react';
import { useNavigate } from 'react-router-dom';
import CardIcon from '../../Paper.png';

const CardComponent = ({ id, status, title, date }) => {
  const navigate = useNavigate();

  // Function to handle card click
  const handleCardClick = () => {
    navigate(`/card-details/${id}`); // Navigate to the card details page with the id
  };

  return (
    <div className="card p-24" id={`card-${id}`} onClick={handleCardClick}>
      <span className="status-heading">{status}</span>
      <h5 className="heading-title">
        <img src={CardIcon} alt="Card Icon" /> {title}
      </h5>
      <span className="date-data">{date}</span>
    </div>
  );
};

export default CardComponent;

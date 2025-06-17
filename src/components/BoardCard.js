import React from 'react';
import './BoardCard.css';

const BoardCard = ({ board }) => {
  return (
    <div className="board-card">
      <div className="board-image-container">
        <img
          src={board.image}
          alt={board.title}
          className="board-image"
        />
      </div>
      <div className="board-content">
        <h3 className="board-title">{board.title}</h3>
        <div className="board-actions">
          <button className="view-btn">View</button>
          <button className="delete-btn">Delete</button>
        </div>
      </div>
    </div>
  );
};

export default BoardCard;

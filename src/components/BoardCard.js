import React from 'react';
import { Link } from 'react-router-dom';
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
          <Link to={`/board/${board.id}`} className="view-btn">View</Link>
          <button className="delete-btn">Delete</button>
        </div>
      </div>
    </div>
  );
};

export default BoardCard;

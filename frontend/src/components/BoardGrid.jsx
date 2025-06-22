import React from 'react';
import './BoardGrid.css';
import BoardCard from './BoardCard';

const BoardGrid = ({ boards, onDeleteBoard }) => {
  return (
    <div className="board-grid-container">
      <h2 className="section-title">Browse Boards</h2>

      {boards.length === 0 ? (
        <div className="no-boards-message">
          <p>No boards found. Create your first board!</p>
        </div>
      ) : (
        <div className="board-grid">
          {boards.map(board => (
            <BoardCard
              key={board.id}
              board={board}
              onDelete={() => onDeleteBoard(board.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default BoardGrid;

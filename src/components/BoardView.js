import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './BoardView.css';

const BoardView = ({ boards }) => {
  const { id } = useParams();
  const [newCard, setNewCard] = useState({ content: '', author: '' });


  const board = boards.find(board => board.id === id);


  if (!board) {
    return (
      <div className="board-view-container">
        <div className="board-not-found">
          <h2>Board not found</h2>
          <p>The board you're looking for doesn't exist.</p>
          <Link to="/">Back to Home</Link>
        </div>
      </div>
    );
  }


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCard({
      ...newCard,
      [name]: value
    });
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('New card:', newCard);
    setNewCard({ content: '', author: '' });
  };

  return (
    <div className="board-view-container">
      <div className="board-header">
        <Link to="/" className="back-link">Back to Boards</Link>
        <h1>{board.title}</h1>
        <p>{board.description}</p>
      </div>

      <div className="board-cards">
        <h2>Cards</h2>

        {board.cards && board.cards.length > 0 ? (
          <div className="card-list">
            {board.cards.map(card => (
              <div key={card.id} className="card">
                <p className="card-content">{card.content}</p>
                <p className="card-author">- {card.author}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-cards">No cards yet. Be the first to add one!</p>
        )}
      </div>


      <div className="add-card-section">
        <h2>Add a New Card</h2>
        <form onSubmit={handleSubmit} className="card-form">
          <div className="form-group">
            <label htmlFor="content">Message:</label>
            <textarea
              id="content"
              name="content"
              value={newCard.content}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="author">Your Name:</label>
            <input
              type="text"
              id="author"
              name="author"
              value={newCard.author}
              onChange={handleInputChange}
              required
            />
          </div>

          <button type="submit" className="submit-btn">Add Card</button>
        </form>
      </div>
    </div>
  );
};

export default BoardView;

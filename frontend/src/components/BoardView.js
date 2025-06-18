import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './BoardView.css';

const BoardView = ({ boards, setBoards }) => {
  const { id } = useParams();
  const [newCard, setNewCard] = useState({
    content: '',
    author: '',
    gifUrl: 'https://via.placeholder.com/150?text=GIF'
  });

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

  // Function to add a new card to a board
  const addCard = (boardId, newCard) => {
    setBoards(boards.map(board => {
      if (board.id === boardId) {
        return {
          ...board,
          cards: [
            ...board.cards,
            {
              ...newCard,
              id: Date.now().toString(),
              createdAt: new Date().toISOString(),
              upvotes: 0
            }
          ]
        };
      }
      return board;
    }));
  };

  // Function to delete a card from a board
  const deleteCard = (boardId, cardId) => {
    setBoards(boards.map(board => {
      if (board.id === boardId) {
        return {
          ...board,
          cards: board.cards.filter(card => card.id !== cardId)
        };
      }
      return board;
    }));
  };

  // Function to upvote a card
  const upvoteCard = (boardId, cardId) => {
    setBoards(boards.map(board => {
      if (board.id === boardId) {
        return {
          ...board,
          cards: board.cards.map(card => {
            if (card.id === cardId) {
              return {
                ...card,
                upvotes: (card.upvotes || 0) + 1
              };
            }
            return card;
          })
        };
      }
      return board;
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addCard(board.id, newCard);
    setNewCard({
      content: '',
      author: '',
      gifUrl: 'https://via.placeholder.com/150?text=GIF'
    });
  };

  const handleDeleteCard = (cardId) => {
    if (window.confirm('Are you sure you want to delete this card?')) {
      deleteCard(board.id, cardId);
    }
  };

  const handleUpvote = (cardId) => {
    upvoteCard(board.id, cardId);
  };

  return (
    <div className="board-view-container">
      <div className="board-header">
        <Link to="/" className="back-link">Back to Boards</Link>
        <h1>{board.title}</h1>
        <p>{board.description}</p>
      </div>

      <div className="board-cards-section">
        <h2>Cards</h2>

        {board.cards && board.cards.length > 0 ? (
          <div className="card-grid">
            {board.cards.map(card => (
              <div key={card.id} className="card">
                <div className="card-gif">
                  <img
                    src={card.gifUrl || 'https://via.placeholder.com/150?text=GIF'}
                    alt="Card GIF"
                  />
                </div>
                <div className="card-content">
                  <p>{card.content}</p>
                  <p className="card-author">- {card.author}</p>
                </div>
                <div className="card-actions">
                  <div className="upvotes">
                    <button
                      className="upvote-btn"
                      onClick={() => handleUpvote(card.id)}
                    >
                      👍
                    </button>
                    <span>{card.upvotes || 0}</span>
                  </div>
                  <button
                    className="delete-btn"
                    onClick={() => handleDeleteCard(card.id)}
                  >
                    Delete
                  </button>
                </div>
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

          <div className="form-group">
            <label htmlFor="gifUrl">GIF URL (optional):</label>
            <input
              type="text"
              id="gifUrl"
              name="gifUrl"
              value={newCard.gifUrl}
              onChange={handleInputChange}
              placeholder="https://example.com/gif.gif"
            />
          </div>

          <button type="submit" className="submit-btn">Add Card</button>
        </form>
      </div>
    </div>
  );
};

export default BoardView;

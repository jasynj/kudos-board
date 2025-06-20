import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './BoardView.css';
import { boardAPI, cardAPI } from '../services/api';
import { giphyAPI } from '../services/giphyApi';
import ThemeToggle from './ThemeToggle';

const BoardView = ({ boards, setBoards }) => {
  const { id } = useParams();
  const [board, setBoard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newCard, setNewCard] = useState({
    title: '',
    description: '',
    gifUrl: 'https://via.placeholder.com/150?text=GIF'
  });
  const [gifSearch, setGifSearch] = useState('');
  const [gifResults, setGifResults] = useState([]);
  const [showGifResults, setShowGifResults] = useState(false);
  const [searchingGifs, setSearchingGifs] = useState(false);

  // Fetch board data from backend
  useEffect(() => {
    const fetchBoard = async () => {
      try {
        setLoading(true);
        const fetchedBoard = await boardAPI.getBoardById(id);
        setBoard(fetchedBoard);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch board:', err);
        setError('Failed to load board. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchBoard();
  }, [id]);

  if (loading) {
    return (
      <div className="board-view-container">
        <div className="loading">Loading board...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="board-view-container">
        <div className="error">
          <h2>Error</h2>
          <p>{error}</p>
          <Link to="/">Back to Home</Link>
        </div>
      </div>
    );
  }

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

  // Function to search for GIFs
  const searchGifs = async (query) => {
    if (!query.trim()) return;

    try {
      setSearchingGifs(true);
      const results = await giphyAPI.searchGifs(query);
      setGifResults(results);
      setShowGifResults(true);
    } catch (error) {
      console.error('Failed to search GIFs:', error);
      alert('Failed to search GIFs. Please try again.');
    } finally {
      setSearchingGifs(false);
    }
  };

  // Handle GIF search input
  const handleGifSearchChange = (e) => {
    setGifSearch(e.target.value);
  };

  // Handle Enter key press for GIF search
  const handleGifSearchKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      searchGifs(gifSearch);
    }
  };

  // Handle GIF selection
  const handleGifSelect = (gif) => {
    setNewCard({
      ...newCard,
      gifUrl: gif.url
    });
    setShowGifResults(false);
    setGifSearch('');
    setGifResults([]);
  };

  // Function to add a new card to a board
  const addCard = async (boardId, newCard) => {
    try {
      const cardData = {
        ...newCard,
        boardId: parseInt(boardId)
      };
      const createdCard = await cardAPI.createCard(cardData);

      // Update local board state with the new card
      setBoard(prevBoard => ({
        ...prevBoard,
        cards: [...(prevBoard.cards || []), createdCard]
      }));

      // Also update the boards array if needed
      setBoards(prevBoards => prevBoards.map(board => {
        if (board.id === parseInt(boardId)) {
          return {
            ...board,
            cards: [...(board.cards || []), createdCard]
          };
        }
        return board;
      }));
    } catch (error) {
      console.error('Failed to create card:', error);
      alert('Failed to create card. Please try again.');
    }
  };

  // Function to delete a card from a board
  const deleteCard = async (boardId, cardId) => {
    try {
      await cardAPI.deleteCard(cardId);

      // Update local board state
      setBoard(prevBoard => ({
        ...prevBoard,
        cards: prevBoard.cards.filter(card => card.id !== cardId)
      }));

      // Update boards array
      setBoards(prevBoards => prevBoards.map(board => {
        if (board.id === parseInt(boardId)) {
          return {
            ...board,
            cards: board.cards.filter(card => card.id !== cardId)
          };
        }
        return board;
      }));
    } catch (error) {
      console.error('Failed to delete card:', error);
      alert('Failed to delete card. Please try again.');
    }
  };

  // Function to upvote a card
  const upvoteCard = async (boardId, cardId) => {
    try {
      const updatedCard = await cardAPI.upvoteCard(cardId);

      // Update local board state
      setBoard(prevBoard => ({
        ...prevBoard,
        cards: prevBoard.cards.map(card => {
          if (card.id === cardId) {
            return updatedCard;
          }
          return card;
        })
      }));

      // Update boards array
      setBoards(prevBoards => prevBoards.map(board => {
        if (board.id === parseInt(boardId)) {
          return {
            ...board,
            cards: board.cards.map(card => {
              if (card.id === cardId) {
                return updatedCard;
              }
              return card;
            })
          };
        }
        return board;
      }));
    } catch (error) {
      console.error('Failed to upvote card:', error);
      alert('Failed to upvote card. Please try again.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addCard(board.id, newCard);
    setNewCard({
      title: '',
      description: '',
      gifUrl: 'https://via.placeholder.com/150?text=GIF'
    });
    // Reset GIF search state
    setGifSearch('');
    setGifResults([]);
    setShowGifResults(false);
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
        <div className="board-header-top">
          <Link to="/" className="back-link">Back to Boards</Link>
          <ThemeToggle />
        </div>
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
                  <h3>{card.title}</h3>
                  <p>{card.description}</p>
                </div>
                <div className="card-actions">
                  <div className="upvotes">
                    <button
                      className="upvote-btn"
                      onClick={() => handleUpvote(card.id)}
                    >
                      👍
                    </button>
                    <span>{card.upvote || 0}</span>
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
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              name="title"
              value={newCard.title}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Message:</label>
            <textarea
              id="description"
              name="description"
              value={newCard.description}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="gifSearch">Search for GIF:</label>
            <input
              type="text"
              id="gifSearch"
              name="gifSearch"
              value={gifSearch}
              onChange={handleGifSearchChange}
              onKeyDown={handleGifSearchKeyDown}
              placeholder="Type to search for GIFs and press Enter"
            />
            {searchingGifs && <p className="searching-text">Searching for GIFs...</p>}
          </div>

          {showGifResults && (
            <div className="gif-results">
              <h4>Select a GIF:</h4>
              <div className="gif-grid">
                {gifResults.map(gif => (
                  <div
                    key={gif.id}
                    className="gif-option"
                    onClick={() => handleGifSelect(gif)}
                  >
                    <img src={gif.preview} alt={gif.title} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {newCard.gifUrl && newCard.gifUrl !== 'https://via.placeholder.com/150?text=GIF' && (
            <div className="selected-gif">
              <h4>Selected GIF:</h4>
              <img src={newCard.gifUrl} alt="Selected GIF" style={{ maxWidth: '200px', maxHeight: '150px' }} />
            </div>
          )}

          <button type="submit" className="submit-btn">Add Card</button>
        </form>
      </div>
    </div>
  );
};

export default BoardView;

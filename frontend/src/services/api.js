const API_BASE_URL = 'http://localhost:3000/api';

// Board API functions
export const boardAPI = {
  // Get all boards
  getAllBoards: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/board/all`);
      if (!response.ok) {
        throw new Error('Failed to fetch boards');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching boards:', error);
      throw error;
    }
  },

  // Get a specific board by ID
  getBoardById: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/board/view?id=${parseInt(id)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch board');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching board:', error);
      throw error;
    }
  },

  // Create a new board
  createBoard: async (boardData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/board/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(boardData),
      });
      if (!response.ok) {
        throw new Error('Failed to create board');
      }
      return await response.json();
    } catch (error) {
      console.error('Error creating board:', error);
      throw error;
    }
  },

  // Delete a board
  deleteBoard: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/board/delete`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: parseInt(id) }),
      });
      if (!response.ok) {
        throw new Error('Failed to delete board');
      }
      return await response.json();
    } catch (error) {
      console.error('Error deleting board:', error);
      throw error;
    }
  },
};

// Card API functions
export const cardAPI = {
  // Create a new card
  createCard: async (cardData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/board/card/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cardData),
      });
      if (!response.ok) {
        throw new Error('Failed to create card');
      }
      return await response.json();
    } catch (error) {
      console.error('Error creating card:', error);
      throw error;
    }
  },

  // Delete a card
  deleteCard: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/board/card/delete`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: parseInt(id) }),
      });
      if (!response.ok) {
        throw new Error('Failed to delete card');
      }
      return await response.json();
    } catch (error) {
      console.error('Error deleting card:', error);
      throw error;
    }
  },

  // Upvote a card
  upvoteCard: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/board/card/upvote`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: parseInt(id) }),
      });
      if (!response.ok) {
        throw new Error('Failed to upvote card');
      }
      return await response.json();
    } catch (error) {
      console.error('Error upvoting card:', error);
      throw error;
    }
  },
};

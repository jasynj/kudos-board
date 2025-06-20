import React, { useState, useMemo } from 'react';
import SearchBar from './SearchBar';
import NavBar from './NavBar';
import BoardForm from './BoardForm';
import BoardGrid from './BoardGrid';

const HomePage = ({ boards, setBoards, showForm, setShowForm }) => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const addBoard = (newBoard) => {
    const boardToAdd = {
      ...newBoard,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      cards: []
    };

    setBoards([...boards, boardToAdd]);
    setShowForm(false);
  };

  const deleteBoard = (boardId) => {
    setBoards(boards.filter(board => board.id !== boardId));
  };

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const filteredBoards = useMemo(() => {
    // First filter by search query if it exists
    let filtered = boards;
    if (searchQuery.trim() !== '') {
      filtered = boards.filter(board =>
        board.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Then filter by category
    if (activeCategory === 'all') {
      return filtered;
    } else if (activeCategory === 'recent') {
      // Sort by creation date (newest first) and take the first 6
      return [...filtered]
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 6);
    } else {
      // Filter by specific category
      return filtered.filter(board => board.category === activeCategory);
    }
  }, [boards, activeCategory, searchQuery]);

  return (
    <>
      <main className="main-content">
        <SearchBar onSearch={handleSearch} />
        <NavBar
          activeCategory={activeCategory}
          onCategoryChange={handleCategoryChange}
        />
        {showForm && <BoardForm onSubmit={addBoard} />}
        <BoardGrid
          boards={filteredBoards}
          onDeleteBoard={deleteBoard}
        />
      </main>
    </>
  );
};

export default HomePage;

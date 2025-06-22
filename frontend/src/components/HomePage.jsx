import React, { useState, useMemo } from 'react';
import SearchBar from './SearchBar';
import NavBar from './NavBar';
import BoardForm from './BoardForm';
import BoardGrid from './BoardGrid';
import ThemeToggle from './ThemeToggle';
import { boardAPI } from '../services/api';
import './HomePage.css';

const HomePage = ({ boards, setBoards, showForm, setShowForm }) => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const addBoard = async (newBoard) => {
    try {
      const createdBoard = await boardAPI.createBoard(newBoard);
      setBoards([...boards, createdBoard]);
      setShowForm(false);
    } catch (error) {
      console.error('Failed to create board:', error);
      alert('Failed to create board. Please try again.');
    }
  };

  const deleteBoard = async (boardId) => {
    try {
      await boardAPI.deleteBoard(boardId);
      setBoards(boards.filter(board => board.id !== parseInt(boardId)));
    } catch (error) {
      console.error('Failed to delete board:', error);
      alert('Failed to delete board. Please try again.');
    }
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
      return [...filtered]
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 6);
    } else {
      return filtered.filter(board => board.category === activeCategory);
    }
  }, [boards, activeCategory, searchQuery]);

  return (
    <>
      <main className="main-content">
        <div className="page-header">
          <ThemeToggle />
        </div>
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

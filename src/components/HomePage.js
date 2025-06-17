import React from 'react';
import Banner from './Banner';
import SearchBar from './SearchBar';
import NavBar from './NavBar';
import BoardForm from './BoardForm';
import BoardGrid from './BoardGrid';

const HomePage = ({ boards, setBoards, showForm, setShowForm }) => {
  const addBoard = (newBoard) => {
    const boardToAdd = {
      ...newBoard,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      cards: [],
      image: `https://via.placeholder.com/300x200?text=${encodeURIComponent(newBoard.title)}`
    };

    setBoards([...boards, boardToAdd]);
    setShowForm(false);
  };

  const deleteBoard = (boardId) => {
    setBoards(boards.filter(board => board.id !== boardId));
  };

  return (
    <>
      <Banner />
      <main className="main-content">
        <SearchBar />
        <NavBar />
        {showForm && <BoardForm onSubmit={addBoard} />}
        <BoardGrid
          boards={boards}
          onDeleteBoard={deleteBoard}
        />
      </main>
    </>
  );
};

export default HomePage;

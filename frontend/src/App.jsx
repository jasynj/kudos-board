import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import BoardView from './components/BoardView';
import HomePage from './components/HomePage';
import { boardAPI } from './services/api';
import { ThemeProvider } from './contexts/ThemeContext';

function App() {
  const [boards, setBoards] = useState([]);
  const [showForm, setShowForm] = useState(false);

  // Fetch boards from backend on component mount
  useEffect(() => {
    const fetchBoards = async () => {
      try {
        const fetchedBoards = await boardAPI.getAllBoards();
        setBoards(fetchedBoards);
      } catch (err) {
        console.error('Failed to fetch boards:', err);
      }
    };

    fetchBoards();
  }, []);

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  return (
    <ThemeProvider>
      <Router>
        <div className="App">
          <Header onToggleForm={toggleForm} showForm={showForm} />
          <Routes>
            <Route path="/" element={
              <HomePage
                boards={boards}
                setBoards={setBoards}
                showForm={showForm}
                setShowForm={setShowForm}
              />
            } />
            <Route path="/board/:id" element={
              <BoardView
                boards={boards}
                setBoards={setBoards}
              />
            } />
          </Routes>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;

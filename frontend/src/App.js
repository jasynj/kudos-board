import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import BoardView from './components/BoardView';
import HomePage from './components/HomePage';

// Sample data for boards
const initialBoards = [
  {
    id: '1',
    title: 'Welcome to Kudos Board',
    image: '/img/placeholder1.png',
    category: 'welcome',
    description: 'A place to share appreciation and celebrate achievements',
    author: 'Admin',
    createdAt: new Date().toISOString(),
    cards: [
      {
        id: '101',
        content: 'Thank you for creating this amazing platform!',
        author: 'John Doe',
        createdAt: new Date().toISOString(),
        gifUrl: 'https://via.placeholder.com/150?text=Thank+You',
        upvotes: 5
      },
      {
        id: '102',
        content: 'Excited to use this for our team recognition!',
        author: 'Jane Smith',
        createdAt: new Date().toISOString(),
        gifUrl: 'https://via.placeholder.com/150?text=Excited',
        upvotes: 3
      }
    ]
  },
  {
    id: '2',
    title: 'Team Celebration',
    image: './img/placeholder1.png',
    category: 'celebration',
    description: 'Celebrate our team accomplishments',
    author: 'Team Lead',
    createdAt: new Date().toISOString(),
    cards: [
      {
        id: '201',
        content: 'Congratulations on shipping the new feature!',
        author: 'Manager',
        createdAt: new Date().toISOString(),
        gifUrl: 'https://via.placeholder.com/150?text=Congrats',
        upvotes: 8
      }
    ]
  },
  {
    id: '3',
    title: 'Thank You Notes',
    image: './img/placeholder1.png',
    category: 'thank you',
    description: 'Express gratitude to your colleagues',
    author: 'HR Department',
    createdAt: new Date().toISOString(),
    cards: []
  },
  {
    id: '4',
    title: 'Inspiration Wall',
    image: './img/placeholder1.png',
    category: 'inspiration',
    description: 'Share inspiring quotes and stories',
    author: 'Creative Team',
    createdAt: new Date().toISOString(),
    cards: [
      {
        id: '401',
        content: '"The best way to predict the future is to create it." - Abraham Lincoln',
        author: 'Motivational Speaker',
        createdAt: new Date().toISOString(),
        gifUrl: 'https://via.placeholder.com/150?text=Inspiration',
        upvotes: 12
      }
    ]
  }
];

function App() {
  const [boards, setBoards] = useState(initialBoards);
  const [showForm, setShowForm] = useState(false);

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  return (
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
  );
}

export default App;

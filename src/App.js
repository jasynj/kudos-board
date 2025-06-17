import React from 'react';
import './App.css';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import BoardGrid from './components/BoardGrid';
import Footer from './components/Footer';

// fake data for boards
const sampleBoards = [
  {
    id: '1',
    title: 'Welcome to Kudos Board',
    image: 'https://via.placeholder.com/300x200?text=Welcome',
    category: 'welcome',
    description: 'A place to share appreciation and celebrate achievements',
    author: 'Admin',
    createdAt: new Date().toISOString()
  },
  {
    id: '2',
    title: 'Team Celebration',
    image: 'https://via.placeholder.com/300x200?text=Celebration',
    category: 'celebration',
    description: 'Celebrate our team accomplishments',
    author: 'Team Lead',
    createdAt: new Date().toISOString()
  },
  {
    id: '3',
    title: 'Thank You Notes',
    image: 'https://via.placeholder.com/300x200?text=Thank+You',
    category: 'thank you',
    description: 'Express gratitude to your colleagues',
    author: 'HR Department',
    createdAt: new Date().toISOString()
  },
  {
    id: '4',
    title: 'Inspiration Wall',
    image: 'https://via.placeholder.com/300x200?text=Inspiration',
    category: 'inspiration',
    description: 'Share inspiring quotes and stories',
    author: 'Creative Team',
    createdAt: new Date().toISOString()
  }
];

function App() {
  return (
    <div className="App">
      <Header />
      <main className="main-content">
        <SearchBar />
        <BoardGrid boards={sampleBoards} />
      </main>
      <Footer />
    </div>
  );
}

export default App;

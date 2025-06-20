import React from 'react';
import './NavBar.css';

const NavBar = ({ activeCategory, onCategoryChange }) => {
  return (
    <div className="NavBar">
      <div className='navbar-container'>
        <button
          className={`navbar-btn --home ${activeCategory === 'all' ? 'active' : ''}`}
          onClick={() => onCategoryChange('all')}
        >
          All
        </button>
        <button
          className={`navbar-btn --recent ${activeCategory === 'recent' ? 'active' : ''}`}
          onClick={() => onCategoryChange('recent')}
        >
          Recent
        </button>
        <button
          className={`navbar-btn --celebration ${activeCategory === 'celebration' ? 'active' : ''}`}
          onClick={() => onCategoryChange('celebration')}
        >
          Celebration
        </button>
        <button
          className={`navbar-btn --thanks ${activeCategory === 'thank you' ? 'active' : ''}`}
          onClick={() => onCategoryChange('thank you')}
        >
          Thank you
        </button>
        <button
          className={`navbar-btn --inspiration ${activeCategory === 'inspiration' ? 'active' : ''}`}
          onClick={() => onCategoryChange('inspiration')}
        >
          Inspiration
        </button>
      </div>
    </div>
  );
};

export default NavBar;

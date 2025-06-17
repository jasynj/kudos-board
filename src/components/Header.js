import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="container header-container">
        <div className="logo">
          <h1>Kudos Board</h1>
        </div>
        <nav className="nav">
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>
        <div className="user-actions">
          <button className="btn btn-primary">Create Board</button>
          <button className="btn btn-secondary">Login</button>
        </div>
      </div>
    </header>
  );
};

export default Header;

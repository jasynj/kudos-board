import './NavBar.css';

const NavBar = () => {
  return (
    <div className="NavBar">
      <div className = 'navbar-container'>
        <button className='navbar-btn --home'>Home</button>
        <button className='navbar-btn --recent'>Recent</button>
        <button className='navbar-btn --celebration'>Celebration</button>
        <button className='navbar-btn --thanks'>Thank you</button>
        <button className='navbar-btn --inspiration'>Inspiration</button>
      </div>
    </div>
  );
};

export default NavBar;

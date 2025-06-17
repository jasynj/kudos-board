import './Banner.css';

const Banner = () => {
  return (
    <div className="banner">
      <div className="container banner-container">
        <div className="banner-content">
          <h2>Share Appreciation and Celebrate Achievements</h2>
          <p>Create and share kudos boards to recognize your colleagues and celebrate team accomplishments</p>
          <button className="banner-btn">Get Started</button>
        </div>
        <div className="banner-image">
          <img src="./img/placeholder1.png" alt="Kudos Board Illustration" />
        </div>
      </div>
    </div>
  );
};

export default Banner;

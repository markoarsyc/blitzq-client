import React from "react";
import "./Styles/Score.css";
import Navbar from "./Navbar";

//slike
import userImage from "./Media/User-avatar.png";
import opponentImage from "./Media/Opponent-avatar.png";

const Score = () => {
  return (
    <div className="score-main-wrapper">
      <Navbar username="Korisničko ime" route="score" />
      <div className="image-wrapper">
        <div className="user-image">
          <img src={userImage} alt="userImage" />
          <h2>Korisničko ime</h2>
        </div>
        <div className="user-image">
          <img src={opponentImage} alt="opponentImage" />
          <h2>Protivnik</h2>
        </div>
      </div>
      <div className="score">
        
      </div>
    </div>
  );
};

export default Score;

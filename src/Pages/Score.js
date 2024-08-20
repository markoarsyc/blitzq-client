import React, { useContext } from "react";
import "../Styles/Score.css";
import Navbar from "../Navbar";
import { LoginContext } from "../Contexts/LoginContext";

//slike
import userImage from "../Media/User-avatar.png";
import opponentImage from "../Media/Opponent-avatar.png";

const Score = () => {
  //ucitavamo ulogovanog igraca
  const { loggedInPlayer } = useContext(LoginContext);
  return (
    <div className="score-main-wrapper">
      <Navbar />
      <div className="image-wrapper">
        <div className="user-image">
          <img src={userImage} alt="userImage" />
          <h2>{loggedInPlayer.username}</h2>
        </div>
        <div className="user-image">
          <img src={opponentImage} alt="opponentImage" />
          <h2>Protivnik</h2>
        </div>
      </div>
      <div className="score"></div>
    </div>
  );
};

export default Score;

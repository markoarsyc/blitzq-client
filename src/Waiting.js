import React from "react";
import "./Styles/Waiting.css";
import Navbar from "./Navbar";

//slike
import opponentAvatar from "./Media/Opponent-avatar.png";
import avatar from "./Media/User-avatar.png";

const Waiting = () => {
  return (
    <div className="waiting-wrapper">
      <Navbar username="Korisničko ime" route="/profile"/>
      <div className="waiting-images">
        <div className="waiting-image">
          <img src={avatar} alt="avatar" />
          <h2> Korisničko ime </h2>
        </div>
        <div className="waiting-image">
          <img src={opponentAvatar} alt="opponentAvatar" />
          <h2> Čeka se protivnik </h2>
        </div>
      </div>
    </div>
  );
};

export default Waiting;

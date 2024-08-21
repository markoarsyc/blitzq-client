import React, { useContext, useEffect } from "react";
import "../Styles/Score.css";
import Navbar from "../Navbar";
import { LoginContext } from "../Contexts/LoginContext";

//slike
import userImage from "../Media/User-avatar.png";
import opponentImage from "../Media/Opponent-avatar.png";
import { useSocket } from "../Contexts/SocketContext";

const Score = () => {
  //ucitavamo ulogovanog igraca
  const { loggedInPlayer } = useContext(LoginContext);

  const socket = useSocket();

  useEffect(()=>{
    socket.emit("score");
    socket.on("score",(game)=>{
      console.log("Score received");
      console.log(game);
    })
  },[socket]);


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
      <div className="score">
        <div className="my-points">
          
        </div>
        <div className="opponent-points">

        </div>
      </div>
    </div>
  );
};

export default Score;

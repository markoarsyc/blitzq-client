import React, { useContext, useEffect, useState } from "react";
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

  const [gameScore, setGameScore] = useState({});

  useEffect(() => {
    socket.emit("score");
    socket.on("score", (game) => {
      console.log("Score received");
      console.log(game);
      setGameScore(game);
    });
  }, [socket]);

  useEffect(() => {
    if (gameScore.player1Score && gameScore.player2Score) {
      console.log(gameScore.player1Score, typeof gameScore.player1Score);
      console.log(gameScore.player2Score, typeof gameScore.player2Score);
    }
  }, [gameScore]);

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
          <h2>
            {loggedInPlayer.username === gameScore.player1
              ? gameScore.player2
              : gameScore.player1}
          </h2>
        </div>
      </div>
      <div className="score">
        <div className="score-text"> Rezultat partije </div>
        <div className="my-points">
          {loggedInPlayer.username === gameScore.player1 ? (
            <p className="score-array">{gameScore.player1Score} </p>
          ) : (
            <p className="score-array">{gameScore.player2Score} </p>
          )}
        </div>
        <div className="score-params">
          <p>Runda 1</p>
          <p>Runda 2</p>
          <p>Runda 3</p>
        </div>
        <div className="opponent-points">
          {loggedInPlayer.username === gameScore.player1 ? (
            <p className="score-array">{gameScore.player2Score} </p>
          ) : (
            <p className="score-array">{gameScore.player1Score} </p>
          )}
        </div>
        {gameScore.winner &&
        <div className="winner">
          {gameScore.winner === "Nerešeno"
            ? "Nema pobednika"
            : `Pobednik je ${gameScore.winner}`}
        </div>}
      </div>
    </div>
  );
};

export default Score;

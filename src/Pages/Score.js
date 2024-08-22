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

  //parametri partije
  const [player1, setPlayer1] = useState("");
  const [player2, setPlayer2] = useState("");
  const [player1Score, setPlayer1Score] = useState([]);
  const [player2Score, setPlayer2Score] = useState([]);
  const [winner, setWinner] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    socket.emit("score");
    socket.on("score", (game) => {
      console.log("Score received");
      console.log(game);
      setPlayer1(game.player1);
      setPlayer2(game.player2);
      setPlayer1Score(game.player1Score);
      setPlayer2Score(game.player2Score);
      setWinner(game.winner);
      setCategories(game.categories);
    });
  }, [socket]);

  useEffect(() => {
    if (player1 && player2 && player1Score && player2Score && winner) {
      console.log(player1);
      console.log(player2);
      console.log(player1Score);
      console.log(player2Score);
      console.log(winner);
    }
  }, [player1, player2, player1Score, player2Score, winner]);

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
          <h2>{loggedInPlayer.username === player1 ? player2 : player1}</h2>
        </div>
      </div>
      <div className="score">
        <h3 className="score-text"> Rezultat partije </h3>
        <div className="my-points">
          {loggedInPlayer.username === player1
            ? player1Score.map((round, index) => {
                return <p key={index}> {round} </p>;
              })
            : player2Score.map((round, index) => {
                return <p key={index}> {round} </p>;
              })}
        </div>
        <div className="score-params">
          {categories.map((category, index) => {
            return <p key={index}> {category.title} </p>;
          })}
        </div>
        <div className="opponent-points">
        {loggedInPlayer.username === player1
            ? player2Score.map((round, index) => {
                return <p key={index}> {round} </p>;
              })
            : player1Score.map((round, index) => {
                return <p key={index}> {round} </p>;
              })}
        </div>
        {winner &&
        <div className="winner">
          {winner === "Nerešeno"
            ? "Nema pobednika"
            : `Pobednik je ${winner}`}
        </div>}
      </div>
    </div>
  );
};

export default Score;

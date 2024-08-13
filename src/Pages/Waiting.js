import React, { useEffect } from "react";
import "../Styles/Waiting.css";
import Navbar from "../Navbar";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../Contexts/SocketContext";

//slike
import opponentAvatar from "../Media/Opponent-avatar.png";
import avatar from "../Media/User-avatar.png";

const Waiting = () => {
  const navigate = useNavigate();
  const socket = useSocket();
  useEffect(()=>{
    //Igrac salje zahtev za igru
    socket.emit("waiting-game");
    //Osluskuje se dogadjaj koji predstavlja pocetak igre
    socket.on("game-started",()=>{
      //igra ce krenuti za sekund
      setTimeout(()=>{
        navigate("/game");
      },1000);
    })

  },[socket,navigate])
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

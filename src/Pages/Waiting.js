import React, { useContext, useEffect, useState } from "react";
import "../Styles/Waiting.css";
import Navbar from "../Navbar";
import { useNavigate,useLocation } from "react-router-dom";
import { useSocket } from "../Contexts/SocketContext";
import { LoginContext } from "../Contexts/LoginContext";

//slike
import opponentAvatar from "../Media/Opponent-avatar.png";
import avatar from "../Media/User-avatar.png";

const Waiting = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const socket = useSocket();
  //ucitavamo korisnicko ime ulogovanog korisnika
  const { loggedInPlayer } = useContext(LoginContext);

  //protivnik
  const [opponentUsername, setOpponentUsername] = useState("Čeka se protivnik");

  useEffect(() => {
    //Igrac salje zahtev za igru
    socket.emit("waiting-game");

    //Osluskujemo dogadjaj u kom se salje username protivnika
    socket.on("opponent-username", (opponent) => {
      setOpponentUsername(opponent);
    });

    //Osluskuje se dogadjaj koji predstavlja pocetak igre
    socket.on("start-game", () => {
      //igra ce krenuti za nekoliko sekundi
      setTimeout(() => {
        location.pathname = '/game';
        navigate("/game");
      }, 5000);
    });

    return () => {
      if (location.pathname !== "/game") {
        socket.emit("left-game");
      }
      socket.off("opponent-username");
      socket.off("start-game");
    };
  }, [socket, navigate,location.pathname,location]);

  const leaveGame = () => {
    navigate("/homepage");
  };

  return (
    <div className="waiting-wrapper">
      <Navbar />
      <div className="waiting-images">
        <div className="waiting-image">
          <img src={avatar} alt="avatar" />
          <h2> {loggedInPlayer.username} </h2>
        </div>
        <div className="waiting-image">
          <img src={opponentAvatar} alt="opponentAvatar" />
          <h2> {opponentUsername} </h2>
        </div>
        <button className="leave-game" onClick={leaveGame}>
          {" "}
          Napusti igru{" "}
        </button>
      </div>
    </div>
  );
};

export default Waiting;

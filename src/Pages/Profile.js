import React, { useContext, useEffect, useState } from "react";
import "../Styles/Profile.css"
import Navbar from "../Navbar";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../Contexts/LoginContext";
import { useSocket } from "../Contexts/SocketContext";

const Profile = () => {

  const socket = useSocket();

  //ucitavamo ulogovanog igraca
  const {loggedInPlayer, setLoggedInPlayer}  = useContext(LoginContext);

  //navigacija
  const navigate = useNavigate();

  //statistika
  const [games,setGames] = useState(0);
  const [win,setWin] = useState(0);
  const [draw,setDraw] = useState(0);
  const [defeat,setDefeat] = useState(0);

  //ucitaj statistiku igraca
  useEffect(()=>{
    socket.emit("get-games-by-username",loggedInPlayer.username);
    socket.on("games-list-by-username",(games)=>{
      setGames(games.length);
      let winTemp = 0;
      let drawTemp = 0;
      let defeatTemp = 0;
      games.forEach(game => {
        if (loggedInPlayer.username === game.winner) {
          winTemp++;
        } else if(game.winner === "Nerešeno") {
          drawTemp++;
        } else {
          defeatTemp++;
        }
      });
      setWin(winTemp);
      setDraw(drawTemp);
      setDefeat(defeatTemp);
    })
  },[])

  //log out
  const logOut = ()=> {
    socket.emit("logout",loggedInPlayer);
    setLoggedInPlayer({});
    navigate("/");
  }

  return (
  <div className="profile-main-wrapper">
    <Navbar/>
    <div className="profile-wrapper">
      <h1>{loggedInPlayer.username}</h1>
      <div className="properties">
        <div className="property">
          <p>Ime</p>
          <p className="field">{loggedInPlayer.firstName}</p>
        </div>
        <div className="property">
          <p>Prezime</p>
          <p className="field">{loggedInPlayer.lastName}</p>
        </div>
        <div className="property">
          <p>Mejl</p>
          <p className="field">{loggedInPlayer.mail}</p>
        </div>
        <div className="property">
          <p>Broj partija</p>
          <p className="field">{games}</p>
        </div>
        <div className="property">
          <p>Pobede</p>
          <p className="field">{win}</p>
        </div>
        <div className="property">
          <p>Nerešeno</p>
          <p className="field">{draw}</p>
        </div>
        <div className="property">
          <p>Porazi</p>
          <p className="field">{defeat}</p>
        </div>
      </div>
      <button onClick={logOut}>Odjavi se</button>
    </div>
  </div>
  )
};

export default Profile;

import React, { useContext } from "react";
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
          <p className="field">{loggedInPlayer.games}</p>
        </div>
        <div className="property">
          <p>Pobede</p>
          <p className="field">{loggedInPlayer.win}</p>
        </div>
        <div className="property">
          <p>Porazi</p>
          <p className="field">{loggedInPlayer.defeat}</p>
        </div>
      </div>
      <button onClick={logOut}>Odjavi se</button>
    </div>
  </div>
  )
};

export default Profile;

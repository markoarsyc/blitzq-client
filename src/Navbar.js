import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "./Contexts/LoginContext";

//slike
import logo from "./Media/logo.png";
import avatar from "./Media/User-avatar.png";


const Navbar = () => {
  //navigacija
  const navigate = useNavigate();

  //ucitavanje prijavljenog korisnika
  const {loggedInPlayer} = useContext(LoginContext);
  
  return (
    <nav>
      <div className="our-logo" onClick={()=>{
        navigate("/homepage");
      }}>
        <img src={logo} alt="blitzqlogo" />
        <h2> BlitzQ</h2>
      </div>
      <div className="login" onClick={()=>{
        navigate("/profile");
      }}>
        <h2> {loggedInPlayer.username ? loggedInPlayer.username : "Prijavi se"} </h2>
        <img src={avatar} alt="avatarlogo" />
      </div>
    </nav>
  );
};

export default Navbar;

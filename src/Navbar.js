import React from "react";
import { useNavigate } from "react-router-dom";

//slike
import logo from "./Media/logo.png";
import avatar from "./Media/User-avatar.png";

const Navbar = () => {
  //navigacija do stranice za prijavu
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/");
  };

  return (
    <nav>
      <div className="our-logo">
        <img src={logo} alt="blitzqlogo" />
        <h2> BlitzQ</h2>
      </div>
      <div className="login" onClick={handleNavigate}>
        <h2> Prijavi se </h2>
        <img src={avatar} alt="avatarlogo" />
      </div>
    </nav>
  );
};

export default Navbar;

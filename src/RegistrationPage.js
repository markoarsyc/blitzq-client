import React from "react";
import "./Styles/RegistrationPage.css";
import { useNavigate } from "react-router-dom";

//slike
import logo from "./Media/logo.png";
import avatar from "./Media/User-avatar.png";

const RegistrationPage = () => {


    //navigacija do stranice za prijavu
    const navigate = useNavigate();
    const handleNavigate = ()=> {
        navigate("/");
    }

    //form submission
    const handleSubmit = (e)=> {
        e.preventDefault();
    }

    return (
    <div className="reg-page-wrapper">
      <nav>
        <div className="our-logo">
          <img src={logo} alt='blitzqlogo'/>
          <h2> BlitzQ</h2>
        </div>
        <div className="login" onClick={handleNavigate}>
          <h2> Prijavi se </h2>
          <img src={avatar} alt="avatarlogo" />
        </div>
      </nav>
      <form onSubmit={handleSubmit}>
        <h1> Registracija </h1>
        <label htmlFor="ime">Ime</label>
        <input type="text" id="ime" name="ime" />
        <label htmlFor="prezime">Prezime</label>
        <input type="text" id="prezime" name="prezime" />
        <label htmlFor="mail">Mejl adresa</label>
        <input type="text" id="mail" name="mail" />
        <label htmlFor="username">Korisničko ime</label>
        <input type="text" id="username" name="username" />
        <label htmlFor="lozinka">Lozinka</label>
        <input type="password" id="lozinka" name="lozinka" />
        <button type="submit"> Registruj se </button>
      </form>
    </div>
  );
};

export default RegistrationPage;

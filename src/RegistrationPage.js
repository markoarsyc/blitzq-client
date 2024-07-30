import React from "react";
import "./Styles/RegistrationPage.css";
import Navbar from "./Navbar";

//slike
import formBg from "./Media/Reg-form-bg.jpeg"


const RegistrationPage = () => {
  
  //form submission
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="reg-page-main-wrapper">
    <Navbar />
    <div className="reg-page-wrapper">
      <img src={formBg} alt='form-bg' />
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
    </div>
    
  );
};

export default RegistrationPage;

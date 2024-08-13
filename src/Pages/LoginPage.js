import React from "react";
import "../Styles/LoginPage.css";
import { useNavigate } from "react-router-dom";

//slike
import loginImgUrl from "../Media/Login-page-img.png";

const LoginPage = () => {
  //Form submission
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  //navigation to registration page
  const navigate = useNavigate();
  const handleNavigate = (route) => {
    navigate(route);
  };

  return (
    <div className="login-page-wrapper">
      <div className="login-img">
        <img src={loginImgUrl} alt="login-img" />
      </div>
      <div className="login-form">
        <form onSubmit={handleSubmit}>
          <h1> Prijava </h1>
          <div className="input-element">
            <label htmlFor="korisnickoime"> Korisničko ime </label>
            <input type="text" name="korisnickoime" />
          </div>
          <div className="input-element">
            <label htmlFor="lozinka"> Lozinka </label>
            <input type="password" name="lozinka" />
          </div>
          <button type="submit" onClick={()=>{
            handleNavigate('homepage');
          }}> Prijavi se </button>
          <p className="additional-form-text"> Nemaš nalog? </p>
          <button onClick={()=>{
            handleNavigate('registration');
          }}> Registruj se </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;

import React from "react";
import "../Styles/Profile.css"
import Navbar from "../Navbar";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/")
  }

  return (
  <div className="profile-main-wrapper">
    <Navbar username="Korisnicko ime" />
    <div className="profile-wrapper">
      <h1>Korisnicko ime</h1>
      <div className="properties">
        <div className="property">
          <p>Ime</p>
          <p className="field">Ime</p>
        </div>
        <div className="property">
          <p>Prezime</p>
          <p className="field">Prezime</p>
        </div>
        <div className="property">
          <p>Mejl</p>
          <p className="field">Mejl</p>
        </div>
        <div className="property">
          <p>Broj partija</p>
          <p className="field">Broj partija</p>
        </div>
        <div className="property">
          <p>Pobede</p>
          <p className="field">Pobede</p>
        </div>
        <div className="property">
          <p>Porazi</p>
          <p className="field">Porazi</p>
        </div>
      </div>
      <button onClick={handleNavigate}>Odjavi se</button>
    </div>
  </div>
  )
};

export default Profile;

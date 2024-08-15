import React, { useEffect, useState } from "react";
import "../Styles/RegistrationPage.css";
import Navbar from "../Navbar";
import { useSocket } from "../Contexts/SocketContext";

// slike
import formBg from "../Media/Reg-form-bg.jpeg";

const RegistrationPage = () => {
  const socket = useSocket();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [mail, setMail] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);
  // form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    //kreiramo objekat koji predstavlja igraca i saljemo ga serveru
    const playerCredentials = {
      firstName: firstName,
      lastName: lastName,
      username: username,
      password: password,
      mail: mail,
    };
    socket.emit("register-player", playerCredentials);
  };

  useEffect(() => {
    //cekamo potvrdu servera da li je uspesna registracija
    socket.on("registration-status", (regStatus) => {
      if (regStatus) {
        setIsRegistered(true);
        // resetovanje input polja nakon uspešne registracije
        setFirstName("");
        setLastName("");
        setUsername("");
        setPassword("");
        setMail("");
      } else {
        console.log("Registracija nije uspela");
      }
    });

    return ()=>{
      socket.off("registration-status");
    }
    
  }, [socket]);

  return (
    <div className="reg-page-main-wrapper">
      <Navbar route="/" />
      <div className="reg-page-wrapper">
        <img src={formBg} alt="form-bg" />
        <form onSubmit={handleSubmit}>
          <h1> Registracija </h1>
          <label htmlFor="ime">Ime</label>
          <input
            type="text"
            id="ime"
            name="ime"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <label htmlFor="prezime">Prezime</label>
          <input
            type="text"
            id="prezime"
            name="prezime"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <label htmlFor="mail">Mejl adresa</label>
          <input
            type="text"
            id="mail"
            name="mail"
            value={mail}
            onChange={(e) => setMail(e.target.value)}
          />
          <label htmlFor="username">Korisničko ime</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label htmlFor="lozinka">Lozinka</label>
          <input
            type="password"
            id="lozinka"
            name="lozinka"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {!isRegistered ? (
            <button type="submit"> Registruj se </button>
          ) : (
            <p id="registration-message">Uspešna registracija</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default RegistrationPage;

import React, { useContext, useEffect, useState } from "react";
import "../Styles/LoginPage.css";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../Contexts/SocketContext";
import { LoginContext } from "../Contexts/LoginContext";

//slike
import loginImgUrl from "../Media/Login-page-img.png";

const LoginPage = () => {
  const socket = useSocket();
  const { setLoggedInPlayer } = useContext(LoginContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginFail, setLoginFail] = useState(false);

  //navigacija
  const navigate = useNavigate();

  //Form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("login", { username: username, password: password });
  };

  useEffect(() => {
    socket.on("login-status", (player) => {
      if (player) {
        setLoginFail(false);
        setLoggedInPlayer(player);
        navigate("/homepage");
      } else {
        setLoginFail(true);
      }

      setUsername("");
      setPassword("");
    });

    return () => {
      socket.off("login-status");
    };
  }, [socket, setLoggedInPlayer, navigate]);

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
            <input
              type="text"
              name="korisnickoime"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
          </div>
          <div className="input-element">
            <label htmlFor="lozinka"> Lozinka </label>
            <input
              type="password"
              name="lozinka"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <button type="submit"> Prijavi se </button>
          {loginFail && (
            <p id="login-fail">Prijava nije uspela, pokušajte ponovo</p>
          )}
          <p className="additional-form-text"> Nemaš nalog? </p>
          <button
            onClick={() => {
              navigate("/registration");
            }}
          >
            {" "}
            Registruj se{" "}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;

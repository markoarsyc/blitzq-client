import Homepage from "./Pages/Homepage";
import LoginPage from "./Pages/LoginPage";
import RegistrationPage from "./Pages/RegistrationPage";
import "./Styles/App.css";
import { Route, Routes } from "react-router-dom";
import Waiting from "./Pages/Waiting";
import Game from "./Pages/Game";
import Profile from "./Pages/Profile";
import Score from "./Pages/Score";
import NotFound from "./Errors/NotFound";
import { SocketProvider } from "./Contexts/SocketContext";
import { useState } from "react";
import { LoginContext } from "./Contexts/LoginContext";

function App() {
  const [loggedInPlayer, setLoggedInPlayer] = useState({});

  return (
    <SocketProvider>
      <LoginContext.Provider value={{ loggedInPlayer, setLoggedInPlayer }}>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="registration" element={<RegistrationPage />} />
          <Route path="homepage" element={<Homepage />} />
          <Route path="waiting" element={<Waiting />} />
          <Route path="game" element={<Game />} />
          <Route path="profile" element={<Profile />} />
          <Route path="score" element={<Score />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </LoginContext.Provider>
    </SocketProvider>
  );
}

export default App;

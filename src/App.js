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
import Category from "./Pages/Category";
import ProtectedRoute from "./ProtectedRoute";
import NotAuthorized from "./Errors/NotAuthorized";

function App() {
  const [loggedInPlayer, setLoggedInPlayer] = useState({});

  return (
    <SocketProvider>
      <LoginContext.Provider value={{ loggedInPlayer, setLoggedInPlayer }}>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="registration" element={<RegistrationPage />} />
          <Route
            path="homepage"
            element={<ProtectedRoute element={<Homepage />} />}
          />
          <Route
            path="waiting"
            element={<ProtectedRoute element={<Waiting />} />}
          />
          <Route path="game" element={<ProtectedRoute element={<Game />} />} />
          <Route
            path="profile"
            element={<ProtectedRoute element={<Profile />} />}
          />
          <Route
            path="score"
            element={<ProtectedRoute element={<Score />} />}
          />
          <Route
            path="category"
            element={<ProtectedRoute element={<Category />} />}
          />
          <Route path="*" element={<NotFound />} />
          <Route path="notauthorized" element={<NotAuthorized />} />
        </Routes>
      </LoginContext.Provider>
    </SocketProvider>
  );
}

export default App;

import Homepage from "./Homepage";
import LoginPage from "./LoginPage";
import RegistrationPage from "./RegistrationPage";
import "./Styles/App.css";
import { Route, Routes } from "react-router-dom";
import Waiting from "./Waiting";
import Game from "./Game";
import Profile from "./Profile";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="registration" element={<RegistrationPage />} />
      <Route path="homepage" element={<Homepage />} />
      <Route path="waiting" element={<Waiting />} />
      <Route path="game" element={<Game />} />
      <Route path="profile" element={<Profile />} />
    </Routes>
  );
}

export default App;

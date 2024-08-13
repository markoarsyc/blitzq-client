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
import {io} from "socket.io-client";

function App() {

  const socket = io("http://localhost:3005");
  console.log(socket);

  // useEffect(()=>{
  //   socket.on("Cao",(krastavac)=>{
  //     console.log(krastavac);
  //   })
  // },[socket])

  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="registration" element={<RegistrationPage socket={socket} />} />
      <Route path="homepage" element={<Homepage />} />
      <Route path="waiting" element={<Waiting socket={socket} />} />
      <Route path="game" element={<Game />} />
      <Route path="profile" element={<Profile />} />
      <Route path="score" element={<Score />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;

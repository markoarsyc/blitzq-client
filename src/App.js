import Homepage from "./Homepage";
import LoginPage from "./LoginPage";
import RegistrationPage from "./RegistrationPage";
import "./Styles/App.css";
import { Route, Routes } from "react-router-dom";
import Waiting from "./Waiting";
import Game from "./Game";
import Profile from "./Profile";
import Score from "./Score";
import NotFound from "./NotFound";
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

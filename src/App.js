import LoginPage from "./LoginPage";
import RegistrationPage from "./RegistrationPage";
import "./Styles/App.css";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="registration" element={<RegistrationPage />} />
    </Routes>
  );
}

export default App;

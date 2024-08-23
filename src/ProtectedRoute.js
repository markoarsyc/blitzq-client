import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { LoginContext } from "./Contexts/LoginContext";

function ProtectedRoute({ element }) {
  const { loggedInPlayer } = useContext(LoginContext);

  if (!loggedInPlayer || Object.keys(loggedInPlayer).length === 0) {
    // Ako igrač nije ulogovan, preusmerava se na LoginPage
    return <Navigate to="/notauthorized" replace />;
  }

  // Ako je igrač ulogovan, dozvoljava se pristup traženoj ruti
  return element;
}

export default ProtectedRoute;

import Loading from "../pages/Loading";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function GuestRoute({ children }) {
  const { isInitialize, isAuth, user } = useAuth();
  if (!isInitialize) return <Loading />;
  if (isAuth && user) {
    if (user.role == "admin") {
      return <Navigate to="/admin/home" replace />;
    }
    return <Navigate to="/user/home" replace />;
  }
  return children;
}

export default GuestRoute;

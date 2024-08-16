import { useAuth } from "../contexts/AuthContext";
import Forbidden from "../pages/Forbidden";

export default function AdminRoute({ children }) {
  const { user } = useAuth();
  if (user.role.name != "ROLE_ADMIN" && user.role.name != "ROLE_HR") {
    return <Forbidden />;
  }
  return <>{children}</>;
}

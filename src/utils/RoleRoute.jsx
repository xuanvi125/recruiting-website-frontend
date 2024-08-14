import { useAuth } from "../contexts/AuthContext";
import Forbidden from "../pages/Forbidden";

export default function AdminRoute({ children }) {
  const { user } = useAuth();
  if (!user || user.role != "admin") {
    return <Forbidden />;
  }
  return <>{children}</>;
}

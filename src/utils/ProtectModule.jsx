import { useAuth } from "../contexts/AuthContext";
import Forbidden from "../pages/Forbidden";

function ProtectModule({ children, roles }) {
  const { user } = useAuth();
  if (!roles.includes(user.role.name)) {
    return <Forbidden />;
  }
  return <>{children}</>;
}

export default ProtectModule;

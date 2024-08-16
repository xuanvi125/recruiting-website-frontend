import { useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import * as authServices from "../../services/AuthService";
import {
  Navbar,
  Typography,
  Breadcrumbs,
  Avatar,
  Button,
} from "@material-tailwind/react";

export function Header() {
  const { user, dispatch } = useAuth();
  let { pathname } = useLocation();
  const [layout = "", page = ""] = pathname
    .split("/")
    .filter((el) => el !== "");

  async function handleLogout() {
    await authServices.logout();
    dispatch({ type: "LOG_OUT" });
    localStorage.removeItem("token");
    navigate("/login");
  }

  return (
    <Navbar
      color="transparent"
      className="rounded-xl transition-all px-0 py-1"
      fullWidth
    >
      <div className="flex flex-col-reverse justify-between gap-6 md:flex-row md:items-center">
        <div className="capitalize">
          <Breadcrumbs className={`bg-transparent p-0 transition-all`}>
            <Typography
              variant="small"
              color="blue-gray"
              className="font-normal opacity-50 transition-all"
            >
              {layout}
            </Typography>

            <Typography
              variant="small"
              color="blue-gray"
              className="font-normal"
            >
              {page || "Home"}
            </Typography>
          </Breadcrumbs>
          <Typography variant="h6" color="blue-gray">
            {page}
          </Typography>
        </div>

        <div className="flex items-center border p-4 rounded-xl gap-2 bg-white ">
          <Avatar src={user.avatar} alt="avatar" />;
          <div className>
            <Typography variant="small" color="blue-gray" className="font-bold">
              {user.name}
            </Typography>
            <Typography variant="small" className="font-bold" color="blue-gray">
              {user.role.name.split("_")[1]}
            </Typography>
          </div>
          <Button color="red" className="ml-2" onClick={handleLogout}>
            Log out
          </Button>
        </div>
      </div>
    </Navbar>
  );
}

export default Header;

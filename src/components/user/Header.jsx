import React from "react";
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Card,
  IconButton,
} from "@material-tailwind/react";
import {
  CubeTransparentIcon,
  UserCircleIcon,
  CodeBracketSquareIcon,
  Square3Stack3DIcon,
  ChevronDownIcon,
  Cog6ToothIcon,
  InboxArrowDownIcon,
  LifebuoyIcon,
  PowerIcon,
  RocketLaunchIcon,
  Bars2Icon,
  AcademicCapIcon,
  BriefcaseIcon,
  BellAlertIcon,
} from "@heroicons/react/24/solid";
import Logo from "./Logo";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import * as authServices from "../../services/AuthService";

// profile menu component
const profileMenuItems = [
  {
    label: "My Profile",
    icon: UserCircleIcon,
    link: "/user/profile",
  },
  {
    label: "My Resume",
    icon: Cog6ToothIcon,
    link: "/user/resume",
  },
  {
    label: "Change Password",
    icon: InboxArrowDownIcon,
    link: "/user/change-password",
  },
  {
    label: "Subscribe Jobs",
    icon: BellAlertIcon,
    link: "/user/subscribe-jobs",
  },
  {
    label: "Sign Out",
    icon: PowerIcon,
  },
];

function ProfileMenu() {
  const { user, dispatch } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const navigate = useNavigate();
  const closeMenu = () => setIsMenuOpen(false);

  async function handleLogout() {
    await authServices.logout();
    dispatch({ type: "LOG_OUT" });
    localStorage.removeItem("token");
    navigate("/login");
  }

  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
      <MenuHandler>
        <Button
          variant="text"
          color="blue-gray"
          className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
        >
          <Avatar
            variant="circular"
            size="sm"
            alt="tania andrew"
            className="border border-gray-900 p-0.5"
            src={
              user?.avatar ||
              "https://static.vecteezy.com/system/resources/previews/009/292/244/original/default-avatar-icon-of-social-media-user-vector.jpg"
            }
          />
          <ChevronDownIcon
            strokeWidth={2.5}
            className={`h-3 w-3 transition-transform ${
              isMenuOpen ? "rotate-180" : ""
            }`}
          />
        </Button>
      </MenuHandler>
      <MenuList className="p-1">
        {profileMenuItems.map(({ label, icon, link }, key) => {
          const isLastItem = key === profileMenuItems.length - 1;
          if (isLastItem) {
            return (
              <Link to={link} key={label}>
                <MenuItem
                  key={label}
                  onClick={closeMenu}
                  className={`flex items-center gap-2 rounded ${
                    isLastItem
                      ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                      : ""
                  }`}
                >
                  {React.createElement(icon, {
                    className: `h-4 w-4 ${isLastItem ? "text-red-500" : ""}`,
                    strokeWidth: 2,
                  })}
                  <Typography
                    as="span"
                    variant="small"
                    onClick={handleLogout}
                    className="font-normal"
                    color={isLastItem ? "red" : "inherit"}
                  >
                    {label}
                  </Typography>
                </MenuItem>
              </Link>
            );
          }

          return (
            <Link to={link} key={label}>
              <MenuItem
                key={label}
                onClick={closeMenu}
                className={`flex items-center gap-2 rounded ${
                  isLastItem
                    ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                    : ""
                }`}
              >
                {React.createElement(icon, {
                  className: `h-4 w-4 ${isLastItem ? "text-red-500" : ""}`,
                  strokeWidth: 2,
                })}
                <Typography
                  as="span"
                  variant="small"
                  className="font-normal"
                  color={isLastItem ? "red" : "inherit"}
                >
                  {label}
                </Typography>
              </MenuItem>
            </Link>
          );
        })}
      </MenuList>
    </Menu>
  );
}

export default function Header() {
  const { user } = useAuth();
  return (
    <Navbar
      fullWidth
      className="w-full p-1 px-5 lg:pl-6 bg-gradient-to-br from-green-100"
    >
      <div className="relative mx-auto flex items-center justify-between text-blue-gray-900">
        <div className="flex gap-4 items-center">
          <Logo />
          <Link to={"/user/home"}>
            <Typography
              as="a"
              href="/user/home"
              className="flex gap-1 font-bold mr-3"
            >
              <AcademicCapIcon className="h-6 w-6" />
              Việc Làm
            </Typography>
          </Link>

          <Link to={"/user/company"}>
            <Typography className="flex gap-1 font-bold">
              <BriefcaseIcon className="h-6 w-6" />
              Công Ty
            </Typography>
          </Link>
        </div>

        <div className="flex gap-2 items-center">
          {!user && (
            <Link to={"/login"}>
              <Button size="sm">
                <span>Log In</span>
              </Button>
            </Link>
          )}
          <div className="flex items-center gap-2">
            <p className="font-bold">{user?.name}</p>
            <ProfileMenu />
          </div>
        </div>
      </div>
    </Navbar>
  );
}

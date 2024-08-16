import { Outlet } from "react-router-dom";
import {
  HomeIcon,
  UserCircleIcon,
  InformationCircleIcon,
  BookOpenIcon,
  UserGroupIcon,
} from "@heroicons/react/24/solid";
import Header from "../components/admin/Header";
import Footer from "../components/admin/Footer";
import SideNav from "../components/admin/SideNav";
import { ClipboardDocumentListIcon } from "@heroicons/react/24/outline";
import Home from "../pages/admin/Home";
import UserTable from "../pages/admin/UserTable";

const icon = {
  className: "w-5 h-5 text-inherit",
};
const routes = [
  {
    layout: "admin",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "company",
        path: "/home",
        element: <Home />,
      },
      {
        icon: <UserCircleIcon {...icon} />,
        name: "job",
        path: "/jobs",
        element: <Home />,
      },
      {
        icon: <BookOpenIcon {...icon} />,
        name: "resume",
        path: "/resumes",
        element: <Home />,
      },
      {
        icon: <UserGroupIcon {...icon} />,
        name: "user",
        path: "/user",
      },
    ],
  },
];

export function Admin() {
  return (
    <div className="min-h-screen bg-blue-gray-50/50">
      <SideNav routes={routes} />
      <div className="p-4 xl:ml-80">
        <Header />

        <Outlet />
        <div className="text-blue-gray-600">
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default Admin;

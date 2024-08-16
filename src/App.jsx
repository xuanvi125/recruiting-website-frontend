import { Navigate, Route, Routes } from "react-router-dom";
import UserLayout from "./layouts/UserLayout";
import HomePage from "./pages/user/HomePage";
import NotFound from "./pages/NotFound";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import SignUp from "./pages/SignUp";
import CompanyPage from "./pages/user/CompanyPage";
import { Toaster } from "react-hot-toast";
import Login from "./pages/Login";
import GuestRoute from "./utils/GuestRoute";
import ProtectedRoute from "./utils/ProtectedRoute";
import ProfileForm from "./components/user/ProfileForm";
import { UpdatePasswordForm } from "./components/user/UpdatePasswordForm";
import ResumeTable from "./components/user/ResumeTable";
import SubscribeJobFrom from "./components/user/SubscribeJobFrom";
import JobSearchResult from "./pages/user/JobSearchResult";
import JobDetails from "./pages/user/JobDetails";
import CompanyDetails from "./pages/user/CompanyDetails";
import VerifyAccount from "./pages/user/VerifyAccount";
import AdminLayout from "./layouts/AdminLayout";
import RoleRoute from "./utils/RoleRoute";
import Home from "./pages/admin/Home";
import UserTable from "./pages/admin/UserTable";
import JobTable from "./pages/admin/JobTable";
import HRResumeTable from "./pages/admin/HRResumeTable";
import JobForm from "./pages/admin/JobForm";
import ProtectModule from "./utils/ProtectModule";
export default function App() {
  return (
    <>
      <Routes>
        <Route
          path="/user"
          element={
            <ProtectedRoute>
              <UserLayout />
            </ProtectedRoute>
          }
        >
          <Route path="home" index element={<HomePage />} />
          <Route path="company" element={<CompanyPage />} />
          <Route path="profile" element={<ProfileForm />} />
          <Route path="resume" element={<ResumeTable />} />
          <Route path="change-password" element={<UpdatePasswordForm />} />
          <Route path="subscribe-jobs" element={<SubscribeJobFrom />} />
          <Route path="job/search" element={<JobSearchResult />} />
          <Route path="job/:id" element={<JobDetails />} />
          <Route path="company/:id" element={<CompanyDetails />} />
        </Route>

        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <RoleRoute>
                <AdminLayout />
              </RoleRoute>
            </ProtectedRoute>
          }
        >
          <Route
            path="home"
            element={
              <ProtectModule roles={["ROLE_ADMIN"]}>
                <Home />
              </ProtectModule>
            }
          />
          <Route
            path="user"
            element={
              <ProtectModule roles={["ROLE_ADMIN"]}>
                <UserTable />
              </ProtectModule>
            }
          />
          <Route path="jobs" element={<JobTable />} />
          <Route
            path="resumes"
            element={
              <ProtectModule roles={["ROLE_HR"]}>
                <HRResumeTable />
              </ProtectModule>
            }
          />
          <Route
            path="job/add"
            element={
              <ProtectModule roles={["ROLE_HR"]}>
                <JobForm />
              </ProtectModule>
            }
          />
        </Route>

        <Route path="/" element={<Navigate to={"/login"} replace />} />
        <Route
          path="/login"
          element={
            <GuestRoute>
              <Login />
            </GuestRoute>
          }
        />
        <Route
          path="/sign-up"
          element={
            <GuestRoute>
              <SignUp />
            </GuestRoute>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <GuestRoute>
              <ForgotPassword />
            </GuestRoute>
          }
        />
        <Route
          path="/verify-account"
          element={
            <GuestRoute>
              <VerifyAccount />
            </GuestRoute>
          }
        />
        <Route
          path="/reset-password"
          element={
            <GuestRoute>
              <ResetPassword />
            </GuestRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
}

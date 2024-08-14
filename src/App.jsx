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
export default function App() {
  return (
    <>
      <Routes>
        <Route path="/user" element={<UserLayout />}>
          <Route path="home" index element={<HomePage />} />
          <Route path="company" element={<CompanyPage />} />
          <Route
            path="profile"
            element={<ProtectedRoute>Profile</ProtectedRoute>}
          />
          <Route
            path="resume"
            element={<ProtectedRoute>Resume</ProtectedRoute>}
          />
          <Route
            path="change-password"
            element={<ProtectedRoute>Change Password</ProtectedRoute>}
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

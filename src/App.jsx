import { Route, Routes } from "react-router-dom";
import UserLayout from "./layouts/UserLayout";
import HomePage from "./pages/user/HomePage";
import NotFound from "./pages/NotFound";
import CompanyPage from "./pages/user/CompanyPage";
export default function App() {
  return (
    <Routes>
      <Route path="/user" element={<UserLayout />}>
        <Route path="home" index element={<HomePage />} />
        <Route path="company" element={<CompanyPage />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

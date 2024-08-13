import UserLayout from "./layouts/UserLayout";
import HomePage from "./pages/user/HomePage";
export default function App() {
  return (
    <UserLayout>
      <div className="p-5">
        <HomePage />
      </div>
    </UserLayout>
  );
}

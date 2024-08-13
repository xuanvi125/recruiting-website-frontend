import Footer from "../components/user/Footer";
import Header from "../components/user/Header";

function UserLayout({ children }) {
  return (
    <div className="flex flex-col w-full min-h-screen">
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}

export default UserLayout;

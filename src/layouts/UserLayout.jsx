import Footer from "../components/user/Footer";
import Header from "../components/user/Header";

function UserLayout({ children }) {
  return (
    <div className="flex flex-col w-full min-h-screen">
      <Header />
      <main className="flex-grow bg-gradient-to-b from-green-50 p-5">
        {children}
      </main>
      <Footer />
    </div>
  );
}

export default UserLayout;

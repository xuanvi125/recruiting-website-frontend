import Banner from "../../components/user/Banner";
import { JobSearch } from "../../components/user/JobSearch";
import Slogan from "../../components/user/Slogan";
function HomePage() {
  return (
    <div>
      <Slogan />
      <div className="my-8">
        <JobSearch />
      </div>
      <div className="w-9/12 h-48 mx-auto my-10">
        <Banner />
      </div>
    </div>
  );
}

export default HomePage;

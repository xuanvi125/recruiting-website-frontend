import {
  Card,
  List,
  ListItem,
  ListItemPrefix,
  Option,
  Radio,
  Select,
  Typography,
} from "@material-tailwind/react";
import Banner from "../../components/user/Banner";
import { JobSearch } from "../../components/user/JobSearch";
import Slogan from "../../components/user/Slogan";
import ListJobCard from "../../components/user/ListJobCard";
import { Pagination } from "../../components/user/Pagination";
import * as JobServices from "../../services/JobService";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
function HomePage() {
  const [jobs, setJobs] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [searchParam, setSearchParam] = useSearchParams();

  function handleChange(e) {
    const searchParams = new URLSearchParams(searchParam);
    searchParams.set("sort", e);
    setSearchParam(searchParams);
  }

  function handleChangeLocation(e) {
    const searchParams = new URLSearchParams(searchParam);
    searchParams.set("location", e);
    setSearchParam(searchParams);
  }

  useEffect(() => {
    async function fetchJobs() {
      const res = await JobServices.searchJob(searchParam);
      setJobs(res.data.result);
      setTotalPages(res.data.metaData.totalPages);
    }
    fetchJobs();
  }, [searchParam]);

  return (
    <div>
      <Slogan />
      <div className="my-8">
        <JobSearch />
      </div>
      <Typography className="text-center text-sm text-gray-500">
        Cập Nhật Lúc:{" "}
        <span className="text-green-400 font-bold">
          {new Date().toLocaleString()}
        </span>
      </Typography>
      <div className="w-9/12 h-48 mx-auto my-10">
        <Banner />
      </div>
      <div className="w-9/12 mx-auto flex flex-col items-center gap-3">
        <Typography className="text-3xl text-green-600 font-bold py-10">
          Các công việc phổ biến
        </Typography>
        <div className="flex gap-3 items-center">
          <div className="w-72">
            <Select
              value={`${searchParam.get("sort") || "salary"}`}
              onChange={handleChange}
              label="Sắp Xếp Theo"
            >
              <Option value="salary">Mức Lương</Option>
              <Option value="level">Level</Option>
            </Select>
          </div>
          <Card className="w-full max-w-[34rem] bg-transparent p-0 rounded-none shadow-none">
            <List className="flex-row">
              <ListItem className="p-0">
                <label
                  htmlFor="horizontal-list-react"
                  className="flex w-full cursor-pointer items-center px-3 py-2"
                >
                  <ListItemPrefix className="mr-3">
                    <Radio
                      id="horizontal-list-react"
                      ripple={false}
                      name="location"
                      onChange={() => handleChangeLocation("Ho Chi Minh")}
                      className="hover:before:opacity-0"
                      containerProps={{
                        className: "p-0",
                      }}
                    />
                  </ListItemPrefix>
                  <Typography color="blue-gray" className="font-medium">
                    Hồ Chí Minh
                  </Typography>
                </label>
              </ListItem>
              <ListItem className="p-0">
                <label
                  htmlFor="horizontal-list-vue"
                  className="flex w-full cursor-pointer items-center px-3 py-2"
                >
                  <ListItemPrefix className="mr-3">
                    <Radio
                      id="horizontal-list-vue"
                      ripple={false}
                      name="location"
                      onChange={() => handleChangeLocation("Ha Noi")}
                      className="hover:before:opacity-0"
                      containerProps={{
                        className: "p-0",
                      }}
                    />
                  </ListItemPrefix>
                  <Typography color="blue-gray" className="font-medium">
                    Hà Nội
                  </Typography>
                </label>
              </ListItem>
              <ListItem className="p-0">
                <label
                  htmlFor="horizontal-list-svelte"
                  className="flex w-full cursor-pointer items-center px-3 py-2"
                >
                  <ListItemPrefix className="mr-3">
                    <Radio
                      name="location"
                      id="horizontal-list-svelte"
                      ripple={false}
                      onChange={() => handleChangeLocation("Da Nang")}
                      className="hover:before:opacity-0"
                      containerProps={{
                        className: "p-0",
                      }}
                    />
                  </ListItemPrefix>
                  <Typography color="blue-gray" className="font-medium">
                    Đà Nẵng
                  </Typography>
                </label>
              </ListItem>
            </List>
          </Card>
        </div>
        <div>
          <ListJobCard jobs={jobs} />
        </div>
        <div className="mt-3">
          <Pagination totalPages={totalPages} />
        </div>
      </div>
    </div>
  );
}

export default HomePage;

import {
  Button,
  Input,
  Option,
  Select,
  Typography,
} from "@material-tailwind/react";
import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import * as JobServices from "../../services/JobService";
import JobCard from "../../components/user/JobCard";
import BreakCrumb from "../../components/user/BreakCrumb";
import { Pagination } from "../../components/user/Pagination";
function JobSearchResult() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [keyword, setKeyword] = React.useState("");
  const [jobs, setJobs] = React.useState([]);
  const [totalPages, setTotalPages] = React.useState(1);
  useEffect(() => {
    async function fetchJobs() {
      const res = await JobServices.searchJob(searchParams);
      setJobs(res.data.result);
      setTotalPages(res.data.metaData.totalPages);
    }
    fetchJobs();
  }, [searchParams]);

  return (
    <div>
      <div className="bg-green-300 rounded-sm h-20 flex items-center">
        <div className="container mx-auto flex gap-1 items-center">
          <Input
            name="keyword"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                const searchParam = new URLSearchParams(searchParams);
                searchParam.set("q", keyword);
                setSearchParams(searchParam);
              }
            }}
            defaultValue={searchParams.get("q") || ""}
            onChange={(e) => setKeyword(e.target.value)}
            label="Tìm kiếm công việc, kĩ năng"
            color="green"
            className="bg-white text-black"
          />
          <div>
            <Select
              name="location"
              value={searchParams.get("location") || ""}
              label="Địa Điểm"
              onChange={(e) => {
                const searchParam = new URLSearchParams(searchParams);
                searchParam.set("location", e);
                setSearchParams(searchParam);
              }}
              className="bg-white min-w-0"
              color="green"
            >
              <Option value="Ho Chi Minh">Hồ Chí Minh</Option>
              <Option value="Ha Noi">Hà Nội</Option>
              <Option value="Da Nang">Đà Nẵng</Option>
            </Select>
          </div>
          <div className="m-w-[15rem]">
            <Select
              name="level"
              label="Level"
              className="bg-white"
              color="green"
              value={searchParams.get("level") || ""}
              onChange={(e) => {
                const searchParam = new URLSearchParams(searchParams);
                searchParam.set("level", e);
                setSearchParams(searchParam);
              }}
            >
              <Option value="INTERN">Intern</Option>
              <Option value="FRESHER">Fresher</Option>
              <Option value="JUNIOR">Junior</Option>
              <Option value="SENIOR">Senior</Option>
            </Select>
          </div>
          <div>
            <Select
              name="sort"
              label="Sắp Xếp Theo"
              className="bg-white"
              color="green"
              value={searchParams.get("sort") || ""}
              onChange={(e) => {
                const searchParam = new URLSearchParams(searchParams);
                searchParam.set("sort", e);
                setSearchParams(searchParam);
              }}
            >
              <Option value="salary">Lương</Option>
              <Option value="startDate">Ngày Bắt Đầu</Option>
            </Select>
          </div>
          <Button
            onClick={() => {
              const searchParam = new URLSearchParams(searchParams);
              searchParam.set("q", keyword);
              setSearchParams(searchParam);
            }}
            color="green"
            className="min-w-[10rem]"
          >
            Tìm Kiếm
          </Button>
        </div>
      </div>

      {/* render result */}
      <div className="container mx-auto">
        <BreakCrumb value={"job-searchs"} />{" "}
        <Typography className="font-bold mt-2 ml-3 text-xl">
          Kết quả tìm kiếm cho từ khóa: {searchParams.get("q")}
        </Typography>
        {jobs.length === 0 && (
          <Typography className="text-center my-4">
            Không Tìm Thấy Công Việc Theo Yêu Cầu
          </Typography>
        )}
        <div className="grid grid-cols-3 gap-3 m-4">
          {jobs.map((job) => {
            return <JobCard key={job.id} job={job} />;
          })}
        </div>
        <div className="flex justify-center my-3">
          <Pagination totalPages={totalPages} />
        </div>
      </div>
    </div>
  );
}

export default JobSearchResult;

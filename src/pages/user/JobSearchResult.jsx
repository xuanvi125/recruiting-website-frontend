import { Typography } from "@material-tailwind/react";
import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import * as JobServices from "../../services/JobService";
import JobCard from "../../components/user/JobCard";
import BreakCrumb from "../../components/user/BreakCrumb";
import { Pagination } from "../../components/user/Pagination";
import JobQueryBar from "../../components/user/JobQueryBar";
function JobSearchResult() {
  const [searchParams, setSearchParams] = useSearchParams();

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
      <JobQueryBar />
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

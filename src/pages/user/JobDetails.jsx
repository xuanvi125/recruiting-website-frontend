import { Button, Typography } from "@material-tailwind/react";
import * as JobServices from "../../services/JobService";
import JobQueryBar from "../../components/user/JobQueryBar";
import {
  ArrowTopRightOnSquareIcon,
  CircleStackIcon,
  DocumentIcon,
  DocumentTextIcon,
  GlobeAltIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";
import BreakCrumb from "../../components/user/BreakCrumb";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Loading from "../Loading";

function JobDetails() {
  const [job, setJob] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    async function fetchJob() {
      const res = await JobServices.getJobById(id);
      console.log(res);
      if (res.status === "success") {
        setJob(res.data);
      }
    }
    fetchJob();
  }, []);

  if (!job) {
    return <Loading />;
  }

  return (
    <div>
      <JobQueryBar />
      <div className="container mx-auto p-2">
        <BreakCrumb value={"job-details"} />
      </div>
      <div className="flex container gap-3 mx-auto my-4">
        <div
          className="flex flex-col gap-3"
          style={{
            minWidth: "70%",
          }}
        >
          <div className="bg-white w-full rounded-lg p-4">
            <Typography className="font-bold text-xl">{job.name}</Typography>
            <div className="flex  gap-20 items-center mt-3">
              <div className="flex items-center gap-2 justify-between">
                <CircleStackIcon color="green" className="h-6 w-6" />
                <div>
                  <Typography className="font-bold text-md">
                    Mức Lương
                  </Typography>
                  <span>
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(job.salary)}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <MapPinIcon color="green" className="h-6 w-6" />
                <div>
                  <Typography className="font-bold text-md">
                    Địa Điểm
                  </Typography>
                  <span>{job.location}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <GlobeAltIcon color="green" className="h-6 w-6" />
                <div>
                  <Typography className="font-bold text-md">Level</Typography>
                  <span>{job.level}</span>
                </div>
              </div>
            </div>
            <Button color="green" className="mt-5 w-full">
              Ứng Tuyển Ngay
            </Button>
          </div>
          <div className="bg-white rounded-lg w-full p-4">
            <Typography className="font-bold text-xl">
              Mô Tả Công Việc
            </Typography>
            <Typography className="mt-3">{job.description}</Typography>
          </div>
        </div>
        {/* company info */}
        <div className="bg-white p-4 self-start rounded-lg w-full">
          <div className="flex gap-3">
            <div className="bg-white rounded-lg max-w-36 p-2 border border-green-400 overflow-hidden">
              <img src={job.company?.logo} />
            </div>
            <Typography className="font-bold">{job.company.name}</Typography>
          </div>
          <div className="mt-2 flex gap-3 items-center">
            <span className="flex gap-1 text-gray-900 items-center">
              <MapPinIcon className="h-5 w-5" /> Địa chỉ:{" "}
            </span>
            <span>{job.company.address}</span>
          </div>
          <div className="mt-2 flex gap-3">
            <span className="text-gray-900 flex gap-1">
              <DocumentTextIcon className="h-5 w-5" />
              Mô tả:{" "}
            </span>
            <span>{job.company.description}</span>
          </div>
          <Link to={`/user/company/${job.company.id}`}>
            <div className="flex items-center gap-2 justify-center mt-2">
              <Typography color="green" className="text-center">
                Xem Trang Công Ty
              </Typography>
              <ArrowTopRightOnSquareIcon color="green" className="h-5 w-5" />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default JobDetails;

import { Avatar, Typography } from "@material-tailwind/react";
import BreakCrumb from "../../components/user/BreakCrumb";
import { MapPinIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import * as CompanyServices from "../../services/CompanyService";
import Loading from "../Loading";
import ListJobCard from "../../components/user/ListJobCard";
import JobCard from "../../components/user/JobCard";
import { Pagination } from "../../components/user/Pagination";
function CompanyDetails() {
  const [company, setCompany] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [jobs, setJobs] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const { id } = useParams();
  useEffect(() => {
    const page = searchParams.get("page") || 1;
    async function fetchCompany() {
      const res = await CompanyServices.getCompanyById(id);
      if (res.status === "success") {
        setCompany(res.data);
      }
      const resJobs = await CompanyServices.getCompanyJobs(id, page);
      setJobs(resJobs.data.result);
      setTotalPages(resJobs.data.metaData.totalPages);
    }
    fetchCompany();
  }, [searchParams]);

  if (!company) {
    return <Loading />;
  }

  return (
    <div className="container mx-auto mt-2">
      <BreakCrumb value={"company-details"} />
      <div
        className="max-h-[250px] rounded-xl flex items-center p-4 gap-5"
        style={{
          background: "linear-gradient(90deg,#212f3f,#00b14f)",
        }}
      >
        <Avatar className="w-32 h-32 mt-5" src={company?.logo} />
        <Typography as="div" className="font-bold text-2xl text-white mt-5">
          {company?.name}
          <div className="flex text-md gap-2 items-center mt-4">
            <MapPinIcon className="h-5 w-5" />
            <span className="text-sm">{company?.address}</span>
          </div>
        </Typography>
      </div>

      <div className="flex gap-4 mt-9">
        <div className="w-2/3">
          <div>
            <div
              className="text-white text-xl font-bold p-3 rounded-lg"
              style={{
                background: "linear-gradient(90deg,#1c4742,#22c96d)",
              }}
            >
              <span className="ml-3"> Giới Thiệu Công Ty</span>
            </div>
            <div className="bg-white rounded-lg p-4">
              <span>{company?.description}</span>
            </div>
          </div>

          {/* tuyển dụng */}
          <div className="mt-5">
            <div
              className="text-white text-xl font-bold p-3 rounded-lg"
              style={{
                background: "linear-gradient(90deg,#1c4742,#22c96d)",
              }}
            >
              <span className="ml-3">Tuyển Dụng</span>
            </div>
            <div className="bg-white rounded-lg p-4 flex flex-col gap-3">
              {jobs.map((job) => {
                return <JobCard key={job.id} job={job} />;
              })}
            </div>
            <div className="flex justify-center">
              <Pagination totalPages={totalPages} />
            </div>
          </div>
        </div>

        <div className="w-1/3">
          <div>
            <div
              className="text-white text-xl font-bold p-3 rounded-lg"
              style={{
                background: "linear-gradient(90deg,#1c4742,#22c96d)",
              }}
            >
              <span className="ml-3">Thông Tin Liên Hệ</span>
            </div>
            <div className="bg-white rounded-lg p-4">
              <div className="flex gap-3">
                <MapPinIcon className="h-5 w-5" color="green" />
                <span>Địa Chỉ Công Ty</span>
              </div>
              <span className="text-gray-800">{company?.address}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CompanyDetails;

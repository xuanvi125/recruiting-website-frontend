import { Button, Card, Typography } from "@material-tailwind/react";
import * as userService from "../../services/UserService";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSearchParams } from "react-router-dom";
import BreakCrumb from "./BreakCrumb";
import { Pagination } from "./Pagination";
import { EyeIcon } from "@heroicons/react/24/solid";
const TABLE_HEAD = [
  "ID",
  "Apply Date",
  "Company Name",
  "Job Position",
  "Job Level",
  "Status",
  "Details",
];

export default function ResumeTable() {
  const [resumes, setResumes] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();
  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const page = searchParams.get("page") || 1;
        const data = await userService.getResume(page);
        setResumes(data.data.result);
        setTotalPages(data.data.metaData.totalPages);
      } catch (err) {
        console.error(err);
      }
    };
    fetchResumes();
  }, [searchParams]);

  if (resumes.length == 0) {
    return (
      <div className="container mx-auto mt-4 flex flex-col">
        <BreakCrumb value={"resume"} />
        <Typography className="font-bold mt-2 text-xl">My Resumes</Typography>

        <Typography
          variant="h6"
          color="blue-gray"
          className="text-center text-lg mt-8"
        >
          Không Tìm Thấy CV Nào
        </Typography>
      </div>
    );
  }
  return (
    <div className="container mx-auto mt-4 flex flex-col">
      <BreakCrumb value={"resume"} />
      <Typography className="font-bold mt-2 text-xl">My Resumes</Typography>
      <Card className="container mx-auto mt-3">
        <table className="w-full min-w-max table-auto text-center">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-bold text-md leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {resumes.map(({ status, url, job, createdAt, id }, index) => {
              const isLast = index === resumes.length - 1;
              const classes = isLast
                ? "p-4"
                : "p-4 border-b border-blue-gray-50";

              return (
                <tr key={id}>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {index + 1}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {new Date(createdAt).toLocaleString({
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "numeric",
                        minute: "numeric",
                        second: "numeric",
                      })}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {job.company.name}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {job.name}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {job.level}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {status}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <a className="underline" href={url} target="_blank">
                      Check CV
                    </a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>
      <div className="mx-auto p-2 mt-4">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}

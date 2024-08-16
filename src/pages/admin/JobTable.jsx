import { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  Typography,
  CardBody,
  Button,
  Avatar,
} from "@material-tailwind/react";
import * as jobService from "../../services/JobService";
import { Link, useSearchParams } from "react-router-dom";
import { Pagination } from "../../components/user/Pagination";
import { useAuth } from "../../contexts/AuthContext";
const TABLE_HEAD = [
  "#",
  "Name",
  "Level",
  "Location",
  "Salary",
  "Company",
  "Action",
];

export default function JobTable() {
  const [tableRows, setTableRows] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [totalPages, setTotalPages] = useState(1);
  const { user } = useAuth();

  useEffect(() => {
    const fetchTableRows = async () => {
      const data = await jobService.searchJob(searchParams);
      setTableRows(data.data.result);
      setTotalPages(data.data.metaData.totalPages);
    };
    fetchTableRows();
  }, [searchParams]);

  return (
    <>
      <Card className="h-full w-full mt-1">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-center">
            <div>
              <Typography variant="h5" color="blue-gray">
                Job
              </Typography>
            </div>

            <Link to="/admin/job/add">
              <Button color="green">Add Job</Button>
            </Link>
          </div>
        </CardHeader>

        <CardBody className="px-0 -mt-2 ">
          <table className="w-full table-auto text-left">
            <thead>
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th
                    key={head}
                    className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-3"
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal leading-none opacity-70"
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tableRows.map(
                ({ id, name, level, company, location, salary }, index) => {
                  const isLast = index === tableRows.length - 1;
                  const classes = isLast
                    ? "p-3"
                    : "p-3 border-b border-blue-gray-50";

                  return (
                    <tr key={id}>
                      <td className={classes}>
                        <div className="flex items-center gap-3">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-bold"
                          >
                            {id}
                          </Typography>
                        </div>
                      </td>

                      <td className={classes}>
                        <div className="flex items-center gap-3">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-bold"
                          >
                            {name}
                          </Typography>
                        </div>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {level}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {location}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {new Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          }).format(salary)}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {company?.name}
                        </Typography>
                      </td>
                      <td className={classes}>
                        {user?.company?.id === company?.id && (
                          <Button color="blue" size="sm">
                            Update
                          </Button>
                        )}
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        </CardBody>
      </Card>
      <div className="flex justify-center mt-3">
        <Pagination totalPages={totalPages} />
      </div>
    </>
  );
}

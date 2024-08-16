import { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  Typography,
  CardBody,
  Button,
  Avatar,
} from "@material-tailwind/react";
import * as companyService from "../../services/CompanyService";
import { Link, useSearchParams } from "react-router-dom";
import { Pagination } from "../../components/user/Pagination";
const TABLE_HEAD = ["#", "Logo", "Name", "Address", "Action"];

export default function Home() {
  const [tableRows, setTableRows] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchTableRows = async () => {
      const data = await companyService.getCompany(searchParams);
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
                Company
              </Typography>
            </div>

            <Link to="/admin/company/add">
              <Button color="green">Add Company</Button>
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
              {tableRows.map(({ id, name, address, logo }, index) => {
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
                          {index + 1}
                        </Typography>
                      </div>
                    </td>

                    <td className={classes}>
                      <div className="flex items-center gap-3">
                        <Avatar src={logo} color="lightBlue" size="small" />
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
                        {address}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Button color="blue" size="sm">
                        Update
                      </Button>
                    </td>
                  </tr>
                );
              })}
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

import { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  Typography,
  CardBody,
  Avatar,
  CardFooter,
  Button,
  Chip,
} from "@material-tailwind/react";
import { useSearchParams } from "react-router-dom";

import * as UserService from "../../services/UserService";
import { Pagination } from "../../components/user/Pagination";
import toast from "react-hot-toast";
import UpdateUseButton from "../../components/admin/UpdateUseButton";
import FilterBar from "../../components/FilterBar";
const TABLE_HEAD = [
  "Avatar",
  "Name",
  "Email",
  "Role",
  "Status",
  "Social Account",
  "Actions",
];

export default function UserTable() {
  const [tableRows, setTableRows] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [pageLimit, setPageLimit] = useState(0);
  const page = +searchParams.get("page") || 1;

  const handleUpdate = async (data) => {
    const res = await UserService.updateUser(data);
    if (res.status === "success") {
      setTableRows((prev) =>
        prev.map((row) => (row.id === data.id ? res.data : row))
      );
      toast.success("User updated successfully!");
    } else {
      toast.error(res.message);
    }
  };
  const fetchTableRows = async (searchParams) => {
    const data = await UserService.getUsers(searchParams);
    setPageLimit(data.data.metaData.totalPages);
    setTableRows(data.data.result);
  };
  useEffect(() => {
    fetchTableRows(searchParams);
  }, [page, pageLimit]);

  return (
    <Card className="h-full w-full mt-1">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-center">
          <FilterBar callback={fetchTableRows} />
        </div>
      </CardHeader>

      <CardBody className="px-0 -mt-2 ">
        <table className="w-full table-auto text-center">
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
                    {head || ""}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableRows.map(
              (
                {
                  id,
                  avatar,
                  name,
                  email,
                  active,
                  googleId,
                  facebookId,
                  role,
                  company,
                },
                index
              ) => {
                const isLast = index === tableRows.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";

                return (
                  <tr key={id}>
                    <td className={classes}>
                      <div>
                        <Avatar
                          src={avatar}
                          alt={name}
                          size="md"
                          className="border border-blue-gray-50 bg-blue-gray-50/50 object-contain p-1"
                        />
                      </div>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {name || ""}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {email || ""}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {role.name.split("_")[1] || ""}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {active ? (
                          <Chip
                            className="mx-auto"
                            style={{ maxWidth: "70px" }}
                            color="teal"
                            value={"Active"}
                          />
                        ) : (
                          <Chip
                            style={{ maxWidth: "70px" }}
                            color="red"
                            value={"Inactive"}
                          />
                        )}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <div>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {googleId ? (
                            <Chip color="green" value={"Google"} />
                          ) : (
                            facebookId && (
                              <Chip color="blue" value={"Facebook"} />
                            )
                          )}
                        </Typography>
                      </div>
                    </td>

                    <td>
                      <UpdateUseButton
                        user={{
                          id,
                          name,
                          email,
                          role,
                          active,
                          company,
                        }}
                        handleUpdate={handleUpdate}
                      />
                    </td>
                  </tr>
                );
              }
            )}
          </tbody>
        </table>
      </CardBody>

      <CardFooter className="mx-auto -mt-4">
        <Pagination totalPages={pageLimit} />
      </CardFooter>
    </Card>
  );
}

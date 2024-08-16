import {
  Button,
  Dialog,
  DialogBody,
  DialogHeader,
  DialogFooter,
  Typography,
  Input,
  Select,
  Option,
} from "@material-tailwind/react";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as rolesService from "../../services/RoleService";
import * as companyService from "../../services/CompanyService";
import * as userService from "../../services/UserService";
import toast from "react-hot-toast";

function UpdateUseButton({ user, handleUpdate }) {
  const [roles, setRoles] = React.useState([]);
  const [companies, setCompanies] = React.useState([]);
  const [open, setOpen] = React.useState(false);

  const { register, handleSubmit } = useForm({
    defaultValues: {
      id: user.id,
      roleId: user.role.id,
      companyId: user?.company?.id,
    },
  });

  useEffect(() => {
    async function fetchData() {
      const response = await rolesService.getRoles();
      setRoles(response.data.result);

      const companyResponse = await companyService.getCompany(
        new URLSearchParams({ limit: 100 })
      );
      setCompanies(companyResponse.data.result);
    }
    fetchData();
  }, []);

  async function onSubmit(data) {
    await handleUpdate(data);
  }

  const handleOpen = () => setOpen(!open);
  return (
    <>
      <Button onClick={handleOpen} color="blue">
        Update
      </Button>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>Update User #ID {user.id}</DialogHeader>
        <DialogBody>
          <form
            className="flex flex-col gap-3"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div>
              <Typography variant="h6">Email</Typography>
              <Input label="Email" value={user?.email} disabled />
            </div>
            <div>
              <Typography variant="h6">Họ Và Tên</Typography>
              <Input label="Họ và Tên" disabled value={user.name} />
            </div>
            <input type="hidden" value={user.id} {...register("id")} />
            <div>
              <Typography variant="h6">Role</Typography>
              <select
                name="roleId"
                {...register("roleId")}
                className="border border-gray-300 rounded-lg p-2 cursor-pointer w-full"
              >
                {roles.map((role) => (
                  <option key={role.id} value={role.id}>
                    {role.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <Typography variant="h6">Company</Typography>
              <select
                label="Select company"
                className="border border-gray-300 rounded-lg p-2 cursor-pointer w-full"
                {...register("companyId")}
              >
                {companies.map((company) => (
                  <option key={company.id} value={company.id}>
                    {company.name}
                  </option>
                ))}
              </select>
            </div>
            <DialogFooter>
              <Button
                type="submit"
                variant="gradient"
                color="green"
                onClick={handleOpen}
              >
                <span>Cập Nhật</span>
              </Button>
              <Button
                variant="text"
                color="red"
                onClick={handleOpen}
                className="mr-1"
              >
                <span>Hủy</span>
              </Button>
            </DialogFooter>
          </form>
        </DialogBody>
      </Dialog>
    </>
  );
}

export default UpdateUseButton;

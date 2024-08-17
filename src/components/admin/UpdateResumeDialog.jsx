import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
  Input,
} from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import * as resumeService from "../../services/ResumeService";
import toast from "react-hot-toast";

export default function UpdateResumeDialog({ resume, renderFunction }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(!open);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    const response = await resumeService.updateResumeStatus(data);
    if (response.status === "success") {
      renderFunction((prev) =>
        prev.map((resume) => (resume.id == data.id ? response.data : resume))
      );
      toast.success("Update resume successfully");
    } else {
      toast.error(response.message || "Update resume failed");
    }
  };

  return (
    <>
      <Button onClick={handleOpen} variant="gradient">
        Update
      </Button>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>
          Cập Nhật Trạng Thái CV Của{" "}
          <span className="text-green-400 ml-3">{resume.user.name} </span>
        </DialogHeader>
        <DialogBody>
          <form
            className="flex flex-col gap-3"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div>
              <Typography variant="h6">Email</Typography>
              <Input label="Email" value={resume?.user?.email} disabled />
            </div>
            <div>
              <Typography variant="h6">Họ Và Tên</Typography>
              <Input label="Họ và Tên" disabled value={resume.user.name} />
            </div>
            <div>
              <Typography variant="h6">Vị Trí Công Việc</Typography>
              <Input
                label="Vị Trí Công Việc"
                disabled
                value={resume.job.name}
              />
            </div>
            <div>
              <Typography variant="h6">Level</Typography>
              <Input label="Level" disabled value={resume.job.level} />
            </div>
            <input type="hidden" value={resume.id} {...register("id")} />
            <div>
              <Typography variant="h6">Trạng Thái</Typography>
              <select
                {...register("status")}
                name="status"
                defaultValue={resume.status}
                className="border border-gray-300 p-2 rounded-lg"
              >
                <option value="PENDING">Pending</option>
                <option value="REVIEWING">Reviewing</option>
                <option value="APPROVED">Approved</option>
                <option value="REJECTED">Reject</option>
              </select>
            </div>

            <DialogFooter>
              <Button
                variant="text"
                color="red"
                onClick={handleOpen}
                className="mr-1"
              >
                <span>Cancel</span>
              </Button>
              <Button
                variant="gradient"
                color="green"
                onClick={handleOpen}
                type="submit"
              >
                <span>Confirm</span>
              </Button>
            </DialogFooter>
          </form>
        </DialogBody>
      </Dialog>
    </>
  );
}

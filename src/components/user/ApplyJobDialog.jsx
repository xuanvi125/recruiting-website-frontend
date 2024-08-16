import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Typography,
} from "@material-tailwind/react";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { useAuth } from "../../contexts/AuthContext";
import { useForm } from "react-hook-form";
import * as userService from "../../services/UserService";
import toast from "react-hot-toast";

export default function DialogDefault({ job }) {
  const { user } = useAuth();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(!open);

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();

  async function onSubmit(data) {
    await toast.promise(
      userService.applyJob(data).then((response) => {
        if (response.status === "success") {
          return response;
        } else {
          throw new Error(response.message || "Đã xảy ra lỗi");
        }
      }),
      {
        loading: "Đang ứng tuyển...",
        success: <p>Ứng tuyển thành công!</p>,
        error: ({ message }) => <p>{message}</p>, // Sử dụng message từ lỗi
      }
    );
  }

  return (
    <>
      <Button
        color="green"
        className="mt-5 w-full flex gap-2 items-center justify-center"
        onClick={handleOpen}
        variant="gradient"
      >
        Ứng Tuyển Ngay <PaperAirplaneIcon className="h-5 w-5" />
      </Button>
      <Dialog open={open} handler={handleOpen} className="p-3">
        <DialogHeader>
          Ứng Tuyển Công Việc{" "}
          <span className="text-green-500 ml-2">{job.name}</span>{" "}
        </DialogHeader>
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
            <input type="hidden" value={job.id} {...register("jobId")} />
            <div>
              <Typography variant="h6">CV Ứng Tuyển</Typography>
              <input
                type="file"
                name="file"
                className="rounded-sm"
                accept=".pdf"
                required
                {...register("file")}
              />
            </div>
            <DialogFooter>
              <Button
                type="submit"
                variant="gradient"
                color="green"
                onClick={handleOpen}
              >
                <span>Nộp hồ sơ ứng tuyển</span>
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

import {
  Input,
  Button,
  Typography,
  Textarea,
  Select,
  Option,
  Checkbox,
} from "@material-tailwind/react";
import { useForm } from "react-hook-form";

import ErrorMessage from "../../components/ErrorMessage";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import * as SkillService from "../../services/SkillService";
import * as JobService from "../../services/JobService";
import { useNavigate } from "react-router-dom";

export default function JobForm({ job }) {
  const navigate = useNavigate();
  const [skills, setSkills] = useState([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  async function onSubmit(data) {
    data = {
      ...data,
      startDate: new Intl.DateTimeFormat("en-GB")
        .format(new Date(data.startDate))
        .split("/")
        .join("-"),
    };

    if (job) {
      data = { ...data, id: job.id };
      const response = await JobService.updateJob(job.id, data);
      if (response.status === "success") {
        toast.success("Update job successfully");
        navigate("/admin/jobs");
      } else {
        toast.error("Update job failed");
      }
      return;
    }

    console.log(data);
    const response = await JobService.createJob(data);
    if (response.status === "success") {
      toast.success("Create job successfully");
      navigate("/admin/jobs");
    } else {
      toast.error("Create job failed");
    }
  }

  useEffect(() => {
    if (job) {
      console.log(job);
      reset({
        name: job.name,
        location: job.location,
        level: job.level,
        salary: job.salary,
        quantity: job.quantity,
        startDate: job.startDate.split("-").reverse().join("-"),
        description: job.description,
        skillIds: job.skills.map((skill) => skill.id.toString()),
      });
    }
  }, [job]);

  useEffect(() => {
    const fetchSkills = async () => {
      const data = await SkillService.getSkills();
      setSkills(data.data.result);
    };
    fetchSkills();
  }, []);

  return (
    <div>
      <Typography variant="h4">{job ? "Edit Job" : "Add Job"}</Typography>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-4 mb-2 mx-auto w-3/5"
      >
        <div className="mx-auto">
          <div>
            <div className="mb-3 flex flex-col gap-6">
              <Typography
                variant="small"
                color="blue-gray"
                className="-mb-5 font-medium"
              >
                Name
              </Typography>
              <Input
                {...register("name", {
                  required: "Please enter job name",
                })}
                type="text"
                autoFocus
                placeholder="Job Name"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />

              {errors.name && <ErrorMessage mess={errors.name.message} />}
            </div>

            <div className="mb-1 flex flex-col gap-6">
              <Typography
                variant="small"
                color="blue-gray"
                className="-mb-5 font-medium"
              >
                Location
              </Typography>
              <select
                {...register("location", {
                  required: "Please enter location",
                })}
                name="location"
                className="border bg-gray-50 border-gray-300 rounded-lg p-2 cursor-pointer w-full"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              >
                <option value="Hà Nội">Hà Nội</option>
                <option value="TP. Hồ Chí Minh">TP. Hồ Chí Minh</option>
                <option value="Đà Nẵng">Đà Nẵng</option>
              </select>
            </div>

            <div className="mb-1 flex flex-col gap-6">
              <Typography
                variant="small"
                color="blue-gray"
                className="-mb-5 font-medium"
              >
                Level
              </Typography>
              <select
                name="level"
                {...register("level", {
                  required: "Please enter level",
                })}
                className="border bg-gray-50 border-gray-300 rounded-lg p-2 cursor-pointer w-full"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              >
                <option value="INTERN">Intern</option>
                <option value="FRESHER">Fresher</option>
                <option value="JUNIOR">Junior</option>
                <option value="SENIOR">Senior</option>
              </select>
            </div>

            <div className="mb-1 flex flex-col gap-6 mt-4">
              <Typography
                variant="small"
                color="blue-gray"
                className="-mb-5 font-medium"
              >
                Salary
              </Typography>
              <Input
                {...register("salary", {
                  required: "Please enter salary",
                })}
                type="number"
                placeholder="10 000"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
              {errors.salary && <ErrorMessage mess={errors.salary.message} />}
            </div>

            <div className="mb-1 flex flex-col gap-6 mt-4">
              <Typography
                variant="small"
                color="blue-gray"
                className="-mb-3 font-medium"
              >
                Quantity
              </Typography>
              <Input
                type="number"
                min={0}
                placeholder="2"
                {...register("quantity")}
              />
            </div>

            <div className="mb-1 flex flex-col gap-6 mt-4">
              <Typography
                variant="small"
                color="blue-gray"
                className="-mb-5 font-medium"
              >
                Skills
              </Typography>

              <div className="flex gap-2">
                {skills.map((skill) => (
                  <Checkbox
                    {...register("skillIds")}
                    type="checkbox"
                    key={skill.id}
                    value={skill.id}
                    label={skill.name}
                  />
                ))}
              </div>
            </div>

            <div className="mb-1 flex flex-col gap-6 mt-4">
              <Typography
                variant="small"
                color="blue-gray"
                className="-mb-5 font-medium"
              >
                Start Date
              </Typography>
              <Input
                {...register("startDate")}
                type="date"
                min={new Date().toISOString().split("T")[0]} // set min
                date
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
            </div>

            <div className="mb-1 flex flex-col gap-6 mt-4">
              <Typography
                variant="small"
                color="blue-gray"
                className="-mb-5 font-medium"
              >
                Description
              </Typography>
              <Textarea
                {...register("description")}
                type="text"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
            </div>
          </div>
        </div>

        <Button className="mt-6 w-1/6 ml-auto" fullWidth type="submit">
          {job ? "Update Job" : "Add Job"}
        </Button>
      </form>
    </div>
  );
}

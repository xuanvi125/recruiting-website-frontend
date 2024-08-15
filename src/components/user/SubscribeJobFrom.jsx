import { Input, Typography } from "@material-tailwind/react";
import BreakCrumb from "./BreakCrumb";
import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import * as notificationService from "../../services/NotificationService";
import * as skillService from "../../services/SkillService";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
function SubscribeJobFrom() {
  const user = useAuth().user;
  const [skills, setSkills] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmiting },
  } = useForm();
  useEffect(() => {
    async function fetchSkills() {
      const data = await skillService.getSkills();
      if (data.status === "success") {
        setSkills(data.data.result);
      }
    }
    fetchSkills();
  }, []);

  async function onSubmit(data) {
    const res = await notificationService.subscribeJobNotification({
      skillIds: [data.skill],
    });
    if (res.status === "success") {
      toast.success("Đăng ký thành công");
    } else {
      toast.error(res.message);
    }
  }
  return (
    <div className="container mx-auto">
      <BreakCrumb value={"subscribe-jobs"} />
      <Typography className="font-bold mt-2 text-xl">
        Đăng Ký Nhận Thông Báo Việc Làm
      </Typography>
      <div>
        <form
          className="container mx-auto w-2/3"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="grid grid-cols-1 gap-6 mt-4 ">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-bold text-gray-700"
              >
                Email
              </label>
              <Input
                disabled
                type="email"
                name="email"
                value={user?.email}
                id="email"
                autoComplete="email"
                required
              />
            </div>
            <div>
              <label
                htmlFor="skills"
                className="block text-sm font-bold text-gray-700"
              >
                Kỹ Năng
              </label>
              <select
                id="skills"
                name="skill"
                autoComplete="skills"
                required
                {...register("skill")}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              >
                {skills.map((skill) => (
                  <option value={skill.id} key={skill.id}>
                    {skill.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="mt-6">
            <button
              type="submit"
              disabled={isSubmiting}
              className="w-full max-w-[24rem] mx-auto flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Đăng Ký
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SubscribeJobFrom;

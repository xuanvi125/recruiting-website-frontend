import { Button, Input, Textarea, Typography } from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import ErrorMessage from "../../components/ErrorMessage";
import { useEffect, useState } from "react";
import * as companyService from "../../services/CompanyService";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
function CompanyForm({ company }) {
  const [preview, setPreview] = useState("");
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,

    formState: { errors, isSubmitting },
  } = useForm();

  async function onSubmit(data) {
    if (company) {
      await toast.promise(
        companyService.updateCompany(company.id, data).then((response) => {
          if (response.status === "success") {
            return response;
          } else {
            throw new Error(response.message || "Đã xảy ra lỗi");
          }
        }),
        {
          loading: "Đang cập nhật...",
          success: <p>Cập nhật công ty thành công!</p>,
          error: ({ message }) => <p>{message}</p>, // Sử dụng message từ lỗi
        }
      );
      navigate("/admin/home");
      return;
    }

    await toast.promise(
      companyService.createCompany(data).then((response) => {
        if (response.status === "success") {
          return response;
        } else {
          throw new Error(response.message || "Đã xảy ra lỗi");
        }
      }),
      {
        loading: "Đang tạo...",
        success: <p>Tạo công ty thành công!</p>,
        error: ({ message }) => <p>{message}</p>, // Sử dụng message từ lỗi
      }
    );
    navigate("/admin/home");
  }
  function handlePreview(e) {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  }

  useEffect(() => {
    if (company) {
      reset({
        name: company.name,
        address: company.address,
        description: company.description,
      });
    }
  }, [company, reset]);

  return (
    <div className="min-h-[400px]">
      <Typography variant="h4">
        {company ? "Edit Company" : "Add Company"}
      </Typography>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-4 mb-2 mx-auto w-1/2"
      >
        <div className="gap-6">
          <div>
            {/* Name */}

            <img src={preview || company?.logo} className="w-60" alt="" />

            <div className="mb-3 flex flex-col gap-6 mt-4">
              <Typography
                variant="small"
                color="blue-gray"
                className="-mb-5 font-medium"
              >
                Logo
              </Typography>
              <input
                {...register("file")}
                onChange={handlePreview}
                type="file"
              />
              {errors.file && <ErrorMessage mess={errors.file.message} />}
            </div>

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
                  required: "Please enter company name",
                })}
                autoFocus
                placeholder="Company Name"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
              {errors.name && <ErrorMessage mess={errors.name.message} />}
            </div>

            <div className="mb-1 flex flex-col gap-6 mt-4">
              <Typography
                variant="small"
                color="blue-gray"
                className="-mb-5 font-medium"
              >
                Address
              </Typography>
              <Input
                {...register("address")}
                placeholder="Company Address"
                type="text"
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
                placeholder="Company Description"
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

        <Button
          className="mt-6 w-fit ml-auto"
          fullWidth
          type="submit"
          disabled={isSubmitting}
        >
          {company ? "Update Company" : "Add Company"}
        </Button>
      </form>
    </div>
  );
}

export default CompanyForm;

import { Button, Input, Option, Select } from "@material-tailwind/react";
import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

function JobQueryBar() {
  const [keyword, setKeyword] = React.useState("");
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  return (
    <div className="bg-green-300 rounded-sm h-20 flex items-center">
      <div className="container mx-auto flex gap-1 items-center">
        <Input
          name="keyword"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              navigate(`/user/job/search?q=${keyword}`);
            }
          }}
          defaultValue={searchParams.get("q") || ""}
          onChange={(e) => setKeyword(e.target.value)}
          label="Tìm kiếm công việc, kĩ năng"
          color="green"
          className="bg-white text-black"
        />
        <div>
          <Select
            name="location"
            value={searchParams.get("location") || ""}
            label="Địa Điểm"
            onChange={(e) => {
              const searchParam = new URLSearchParams(searchParams);
              searchParam.set("location", e);
              setSearchParams(searchParam);
            }}
            className="bg-white min-w-0"
            color="green"
          >
            <Option value="Ho Chi Minh">Hồ Chí Minh</Option>
            <Option value="Ha Noi">Hà Nội</Option>
            <Option value="Da Nang">Đà Nẵng</Option>
          </Select>
        </div>
        <div className="m-w-[15rem]">
          <Select
            name="level"
            label="Level"
            className="bg-white"
            color="green"
            value={searchParams.get("level") || ""}
            onChange={(e) => {
              const searchParam = new URLSearchParams(searchParams);
              searchParam.set("level", e);
              setSearchParams(searchParam);
            }}
          >
            <Option value="INTERN">Intern</Option>
            <Option value="FRESHER">Fresher</Option>
            <Option value="JUNIOR">Junior</Option>
            <Option value="SENIOR">Senior</Option>
          </Select>
        </div>
        <div>
          <Select
            name="sort"
            label="Sắp Xếp Theo"
            className="bg-white"
            color="green"
            value={searchParams.get("sort") || ""}
            onChange={(e) => {
              const searchParam = new URLSearchParams(searchParams);
              searchParam.set("sort", e);
              setSearchParams(searchParam);
            }}
          >
            <Option value="salary">Lương</Option>
            <Option value="startDate">Ngày Bắt Đầu</Option>
          </Select>
        </div>
        <Button
          onClick={() => {
            navigate(`/user/job/search?q=${keyword}`);
          }}
          color="green"
          className="min-w-[10rem]"
        >
          Tìm Kiếm
        </Button>
      </div>
    </div>
  );
}

export default JobQueryBar;

import React from "react";
import { Input, Button, Option, Select } from "@material-tailwind/react";

export function JobSearch() {
  const [key, setKey] = React.useState("");
  const onChange = ({ target }) => setKey(target.value);

  return (
    <div className="relative mx-auto max-w-[40rem]">
      <Input
        color="green"
        type="text"
        label="Vị trí tuyển dụng, công ty hoặc kĩ năng"
        value={key}
        onChange={onChange}
        className="pr-20 border-blue-gray-50 "
        containerProps={{
          className: "min-w-0",
        }}
      />
      <Button
        size="sm"
        color={key ? "green" : "blue-gray"}
        disabled={!key}
        className="!absolute right-1 top-1 rounded"
      >
        Tìm kiếm
      </Button>
    </div>
  );
}

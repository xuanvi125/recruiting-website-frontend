import { Typography } from "@material-tailwind/react";

function Logo() {
  return (
    <Typography
      as="a"
      href="/"
      className="mr-4 ml-2 cursor-pointer py-1.5 text-lg font-bold"
    >
      <div className="flex">
        <img width="70px" src="./logo.svg" alt="" />
        <img src="./bg-left.webp" width="20px" alt="" />
      </div>
    </Typography>
  );
}

export default Logo;

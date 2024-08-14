import { Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";

function Logo() {
  return (
    <Link to="/user/home">
      <Typography className="mr-4 ml-2 cursor-pointer py-1.5 text-lg font-bold">
        <div className="flex">
          <img width="70px" src="/logo.svg" alt="" />
          <img src="/bg-left.webp" width="20px" alt="" />
        </div>
      </Typography>
    </Link>
  );
}

export default Logo;

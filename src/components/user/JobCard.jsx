import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
  Chip,
} from "@material-tailwind/react";

export default function JobCard({ job: { company, name, location, salary } }) {
  return (
    <Card className="max-w-[30rem] flex-row gap-3 items-center p-3">
      <CardHeader
        shadow={false}
        floated={false}
        className="m-0 w-1/4 rounded-sm shrink-0"
      >
        <img src={company.logo} alt="card-image" className="object-cover " />
      </CardHeader>
      <CardBody className="p-1">
        <Typography className="font-bold text-black text-sm uppercase">
          {name}
        </Typography>
        <Typography className="mb-1 text-sm text-gray-700">
          {company.name}
        </Typography>
        <div className="flex gap-2 font-light">
          <Chip
            variant="ghost"
            size="sm"
            value={`${
              salary.toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              }) || "Thỏa thuận"
            }`}
          />
          <Chip variant="ghost" size="sm" value={location} />
        </div>
      </CardBody>
    </Card>
  );
}

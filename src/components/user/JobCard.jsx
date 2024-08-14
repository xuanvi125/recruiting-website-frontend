import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
  Chip,
} from "@material-tailwind/react";

export default function JobCard({ company, name, location, salary }) {
  return (
    <Card className="max-w-[20rem] flex-row gap-3 items-center p-3">
      <CardHeader
        shadow={false}
        floated={false}
        className="m-0 w-1/4 rounded-sm shrink-0"
      >
        <img
          src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80"
          alt="card-image"
          className="object-cover "
        />
      </CardHeader>
      <CardBody className="p-1">
        <Typography className="font-bold text-black text-sm uppercase">
          Senior SEO
        </Typography>
        <Typography className="mb-1 text-sm text-gray-700">
          Công Ty TNHH MTV Việt Nam
        </Typography>
        <div className="flex gap-2 font-light">
          <Chip variant="ghost" size="sm" value="10-15 triệu" />
          <Chip variant="ghost" size="sm" value="Hồ Chí Minh" />
        </div>
      </CardBody>
    </Card>
  );
}

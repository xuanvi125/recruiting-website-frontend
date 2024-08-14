import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Tooltip,
  Typography,
} from "@material-tailwind/react";

function CompanyCard({ company }) {
  return (
    <Card className="w-96 bg-transparent">
      <CardHeader
        floated={false}
        className="flex items-center justify-center bg-transparent shadow-none"
      >
        <img
          src={company.logo}
          className="w-32 h-32 rounded-md"
          alt="profile-picture"
        />
      </CardHeader>
      <CardBody className="text-center">
        <Typography variant="h6" color="blue-gray" className="mb-5">
          {company.name}
        </Typography>
        <Typography color="blue-gray" className="font-medium" textGradient>
          {company.description}
        </Typography>
      </CardBody>
    </Card>
  );
}

export default CompanyCard;

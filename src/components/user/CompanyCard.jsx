import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Tooltip,
  Typography,
} from "@material-tailwind/react";

function CompanyCard() {
  return (
    <Card className="w-96 bg-transparent">
      <CardHeader
        floated={false}
        className="flex items-center justify-center bg-transparent shadow-none"
      >
        <img
          src="https://cdn-new.topcv.vn/unsafe/140x/https://static.topcv.vn/company_logos/cong-ty-tnhh-bao-hiem-nhan-tho-aia-viet-nam-5fcefe44252e7.jpg"
          alt="profile-picture"
        />
      </CardHeader>
      <CardBody className="text-center">
        <Typography variant="h6" color="blue-gray" className="mb-5">
          Công Ty TNHH Bảo Hiểm Nhân Thọ AIA (Việt Nam)
        </Typography>
        <Typography color="blue-gray" className="font-medium" textGradient>
          " AIA VIỆT NAM Gần một thế kỷ qua, AIA đã phục vụ cho nhu cầu không
          ngừng đổi thay của hàng triệu người dân khắp khu vực Châu Á – Thái
          Bình Dương. AIA Việt Nam là thành viên của Tập đoàn AIA - tập đoàn bảo
          hiểm nhân thọ độc lập, có nguồn gốc châu Á lớn nhất thế giới được niêm
          yết. Được thành lập vào năm 2000..."
        </Typography>
      </CardBody>
    </Card>
  );
}

export default CompanyCard;

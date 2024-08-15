import { Button, Input, Typography } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import * as CompanyServices from "../../services/CompanyService";
import CompanyList from "../../components/user/CompanyList";
import { useSearchParams } from "react-router-dom";
import { Pagination } from "../../components/user/Pagination";

function CompanyPage() {
  const [key, setKey] = useState("");
  const onChange = ({ target }) => setKey(target.value);
  const [companies, setCompanies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    async function fetchCompanies() {
      const data = await CompanyServices.getCompany(searchParams);
      setCompanies(data.data.result);
      setTotalPages(data.data.metaData.totalPages);
    }
    fetchCompanies();
  }, [searchParams]);
  return (
    <div className="container mx-auto p-5">
      <div className="flex justify-between">
        <div>
          <Typography className="text-green-500 text-2xl font-bold">
            Khám phá 100+ công ty nổi bật
          </Typography>
          <Typography className="mt-5 text-lg text-gray-700">
            Tra cứu thông tin công ty và tìm kiếm nơi làm việc tốt nhất dành cho
            bạn
          </Typography>
          <div className="relative mt-5 max-w-[40rem]">
            <Input
              color="green"
              type="text"
              label="Công ty tìm kiếm"
              defaultValue={searchParams.get("q") || ""}
              onChange={onChange}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  const params = new URLSearchParams(searchParams);
                  params.set("q", key);
                  setSearchParams(params);
                }
              }}
              className="pr-20 border-blue-gray-50 "
              containerProps={{
                className: "min-w-0",
              }}
            />
            <Button
              size="sm"
              color={key ? "green" : "blue-gray"}
              disabled={!key}
              onClick={() => {
                const params = new URLSearchParams(searchParams);
                params.set("q", key);
                setSearchParams(params);
              }}
              className="!absolute right-1 top-1 rounded"
            >
              Tìm kiếm
            </Button>
          </div>
        </div>
        <img
          src="https://static.topcv.vn/v4/image/brand-identity/company-billBoard.png?v=1.0.0"
          width={300}
        />
      </div>

      <div className="bg-transparent p-4">
        <Typography className="text-center font-bold text-xl p-4 mb-3 text-green-800">
          DANH SÁCH CÁC CÔNG TY
        </Typography>
        {companies.length === 0 && (
          <Typography className="text-center text-lg my-4">
            Không Tìm Thấy Công Ty Theo Yêu Cầu
          </Typography>
        )}
        <div>
          <CompanyList companies={companies} />
        </div>
        <div className="flex justify-center my-5">
          <Pagination totalPages={totalPages} />
        </div>
      </div>
    </div>
  );
}

export default CompanyPage;

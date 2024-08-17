import { useParams } from "react-router-dom";
import CompanyForm from "./CompanyForm";
import { useEffect, useState } from "react";
import * as companyService from "../../services/CompanyService";

function UpdateCompany() {
  const { id } = useParams();
  const [company, setCompany] = useState(null);
  useEffect(() => {
    companyService.getCompanyById(id).then((data) => {
      setCompany(data.data);
    });
  }, [id]);
  return (
    <div>
      <CompanyForm company={company} />
    </div>
  );
}

export default UpdateCompany;

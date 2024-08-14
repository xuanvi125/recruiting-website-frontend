import CompanyCard from "./CompanyCard";

function CompanyList({ companies }) {
  return (
    <div className="grid grid-cols-3 gap-3">
      {companies.map((company) => (
        <CompanyCard key={company?.id} company={company} />
      ))}
    </div>
  );
}

export default CompanyList;

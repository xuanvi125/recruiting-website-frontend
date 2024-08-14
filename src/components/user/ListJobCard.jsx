import JobCard from "./JobCard";

function ListJobCard({ jobs }) {
  return (
    <div className="grid grid-cols-3 gap-3">
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  );
}

export default ListJobCard;

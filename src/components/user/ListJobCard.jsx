import JobCard from "./JobCard";

function ListJobCard({ jobs }) {
  return (
    <div>
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  );
}

export default ListJobCard;

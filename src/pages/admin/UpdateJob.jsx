import { useEffect, useState } from "react";
import JobForm from "../../pages/admin/JobForm";
import * as JobServices from "../../services/JobService";
import { useParams } from "react-router-dom";
function UpdateJob() {
  const [job, setJob] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    async function fetchJob() {
      const res = await JobServices.getJobById(id);
      if (res.status === "success") {
        setJob(res.data);
      }
    }
    fetchJob();
  }, []);
  return <JobForm job={job} />;
}

export default UpdateJob;

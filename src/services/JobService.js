import { API_URL } from "../utils/config";

export async function searchJob(searchParams) {
  const page = searchParams.get("page") || 1;
  const sort = searchParams.get("sort") || "salary";
  const keyword = searchParams.get("q") || "";
  const limit = searchParams.get("limit") || 9;
  const location = searchParams.get("location") || "";
  const level = searchParams.get("level") || "";

  let url = `${API_URL}/jobs?filter=( name~'${keyword}' OR skills.name~'${keyword}')`;

  if (location) {
    url += ` AND location ~'${location}'`;
  }
  if (level) {
    url += ` AND level:'${level}'`;
  }
  const endQuery = `&page=${page}&limit=${limit}&sort=${sort}`;
  url += endQuery;
  const res = await fetch(url);
  return await res.json();
}

export async function getJobById(id) {
  const url = `${API_URL}/jobs/${id}`;
  const res = await fetch(url);
  return await res.json();
}

export async function createJob(job) {
  const token = localStorage.getItem("token");
  const url = `${API_URL}/jobs`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(job),
  });
  return await res.json();
}

export async function updateJob(id, job) {
  const token = localStorage.getItem("token");
  const url = `${API_URL}/jobs`;
  const res = await fetch(url, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(job),
  });
  return await res.json();
}

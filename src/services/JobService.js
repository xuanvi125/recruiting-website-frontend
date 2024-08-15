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

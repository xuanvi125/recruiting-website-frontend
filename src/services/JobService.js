import { API_URL } from "../utils/config";

export async function searchJob(searchParams) {
  const page = searchParams.get("page") || 1;
  const sort = searchParams.get("sort") || "salary";
  const keyword = searchParams.get("q") || "";
  const limit = searchParams.get("limit") || 9;
  const location = searchParams.get("location") || "";
  const url = `${API_URL}/jobs?filter=location ~'${location}' AND ( name~'${keyword}' OR skills.name~'${keyword}') &page=${page}&limit=${limit}&sort=${sort}`;
  const res = await fetch(url);
  return await res.json();
}

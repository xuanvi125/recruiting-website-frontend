import { API_URL } from "../utils/config";

export async function getCompany(searchParams) {
  const page = searchParams.get("page") || 1;
  const key = searchParams.get("q") || "";
  const limit = searchParams.get("limit") || 6;
  const url = `${API_URL}/companies?filter=name~'${key}'&limit=${limit}&page=${page}`;
  const res = await fetch(url);
  return await res.json();
}

export async function getCompanyById(id) {
  const url = `${API_URL}/companies/${id}`;
  const res = await fetch(url);
  return await res.json();
}

export async function getCompanyJobs(id, page) {
  const url = `${API_URL}/jobs?filter=company.id:${id}&page=${page}&limit=4`;
  const res = await fetch(url);
  return await res.json();
}

import { API_URL } from "../utils/config";

export async function getCompany(searchParams) {
  const page = searchParams.get("page") || 1;
  const key = searchParams.get("q") || "";
  const url = `${API_URL}/companies?filter=name~'${key}'&limit=6&page=${page}`;
  const res = await fetch(url);
  return await res.json();
}

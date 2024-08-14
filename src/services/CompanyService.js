import { API_URL } from "../utils/config";

export async function getCompany() {
  const url = `${API_URL}/companies?limit=6`;
  const res = await fetch(url);
  return await res.json();
}

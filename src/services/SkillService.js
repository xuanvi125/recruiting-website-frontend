import { API_URL } from "../utils/config";

export async function getSkills() {
  const response = await fetch(`${API_URL}/skills`);
  const data = await response.json();
  return data;
}

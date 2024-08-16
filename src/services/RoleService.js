import { API_URL } from "../utils/config";

export async function getRoles() {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_URL}/admins/roles`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  return data;
}

import { API_URL } from "../utils/config";

export async function getResume(page) {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API_URL}/resumes?page=${page}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return await res.json();
}

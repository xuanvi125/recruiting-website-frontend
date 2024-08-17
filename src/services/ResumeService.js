import { API_URL } from "../utils/config";

export async function getResume(searchParams) {
  const page = searchParams.get("page") || 1;
  const q = searchParams.get("q") || "";
  const token = localStorage.getItem("token");
  const res = await fetch(
    `${API_URL}/resumes?filter=user.email~'${q}'&page=${page}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return await res.json();
}

export async function updateResumeStatus(data) {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API_URL}/resumes`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return await res.json();
}

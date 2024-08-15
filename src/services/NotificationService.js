import { API_URL } from "../utils/config";

export async function subscribeJobNotification(data) {
  const token = localStorage.getItem("token");
  const url = `${API_URL}/subscribers`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  return await response.json();
}

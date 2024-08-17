import { API_URL } from "../utils/config";
export async function getMe() {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_URL}/users/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  return data;
}

export async function updateMe(data) {
  const form = new FormData();
  form.append("name", data.name);
  form.append("file", data.file[0]);
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_URL}/users/update-profile`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: form,
  });
  const res = await response.json();
  return res;
}

export async function getUsers(searchParams) {
  const page = searchParams.get("page") || 1;
  const q = searchParams.get("q") || "";
  const token = localStorage.getItem("token");
  const response = await fetch(
    `${API_URL}/admins/users?filter=name~'${q}'&page=${page}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const data = await response.json();
  return data;
}

export async function updateUser(data) {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_URL}/admins/users`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  const res = await response.json();
  return res;
}

export async function getResume(page = 1) {
  const token = localStorage.getItem("token");
  const response = await fetch(
    `${API_URL}/users/resumes?page=${page}&limit=5`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const data = await response.json();
  return data;
}

export async function changePassword(data) {
  const response = await fetch(`${API_URL}/users/update-password`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const res = await response.json();
  return res;
}

export async function applyJob(data) {
  const form = new FormData();
  form.append("jobId", data.jobId);
  form.append("file", data.file[0]);
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_URL}/resumes`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: form,
  });
  const res = await response.json();
  return res;
}

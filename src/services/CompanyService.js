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

export async function createCompany(data) {
  const form = new FormData();
  form.append("name", data.name);
  form.append("address", data.address);
  form.append("description", data.description);
  form.append("file", data.file[0]);

  const token = localStorage.getItem("token");
  const url = `${API_URL}/companies`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: form,
  });
  return await res.json();
}

export async function updateCompany(id, data) {
  const form = new FormData();
  form.append("id", id);
  form.append("name", data.name);
  form.append("address", data.address);
  form.append("description", data.description);
  if (data.file) {
    form.append("file", data.file[0]);
  }

  const token = localStorage.getItem("token");
  const url = `${API_URL}/companies`;
  const res = await fetch(url, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: form,
  });
  return await res.json();
}

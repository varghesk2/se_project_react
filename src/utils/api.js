import { baseUrl } from "./constants";

const handleResponse = async (res) => {
  const contentType = res.headers.get("content-type");

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Error ${res.status}: ${text}`);
  }

  if (!contentType || !contentType.includes("application/json")) {
    const text = await res.text();
    throw new Error(`Expected JSON, got: ${text}`);
  }

  return res.json();
};

export const getItems = () => {
  return fetch(`${baseUrl}/items`).then(handleResponse);
};

export const addItem = (item) => {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  }).then(handleResponse);
};

export const deleteItem = (id) => {
  return fetch(`${baseUrl}/items/${id}`, {
    method: "DELETE",
  }).then(handleResponse);
};

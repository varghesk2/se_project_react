const baseUrl = "http://localhost:3001";

export const handleResponse = async (res) => {
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Error ${res.status}: ${text}`);
  }
  
  if (res.status === 204) {
    return null;
  }

  return res.json();
};

const getAuthHeaders = () => {
  const token = localStorage.getItem("jwt");

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

export const getItems = () => {
  return fetch(`${baseUrl}/items`).then(handleResponse);
};

export const addItem = (item) => {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(item),
  }).then(handleResponse);
};

export const deleteItem = (id) => {
  return fetch(`${baseUrl}/items/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  }).then(handleResponse);
};

export const updateUser = (name, avatar) => {
  return fetch(`${baseUrl}/users/me`, {
    method: "PATCH",
    headers: getAuthHeaders(),
    body: JSON.stringify({
      name,
      avatar,
    }),
  }).then(handleResponse);
};

export const addCardLike = (id) => {
  return fetch(`${baseUrl}/items/${id}/likes`, {
    method: "PUT",
    headers: getAuthHeaders(),
  }).then(handleResponse);
};

export const removeCardLike = (id) => {
  return fetch(`${baseUrl}/items/${id}/likes`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  }).then(handleResponse);
};
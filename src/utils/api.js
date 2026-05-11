const baseUrl = "http://localhost:3001";

const handleResponse = async (res) => {
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Error ${res.status}: ${text}`);
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

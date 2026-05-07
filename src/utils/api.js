import { defaultClothingItems } from "./constants";

let items = [...defaultClothingItems];

export const getItems = () => {
  return Promise.resolve(items);
};

export const addItem = (item) => {
  const newItem = {
    ...item,
    _id: crypto.randomUUID(),
  };

  items.unshift(newItem);

  return Promise.resolve(newItem);
};

export const deleteItem = (id) => {
  items = items.filter((item) => item._id !== id);
  return Promise.resolve({ message: "deleted" });
};

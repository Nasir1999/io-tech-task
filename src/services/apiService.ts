import axios from 'axios';

const API_URL = 'https://jsonplaceholder.typicode.com/posts';

export const fetchItems = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const addItem = async (item: { title: string; body: string }) => {
  const response = await axios.post(API_URL, item);
  return response.data;
};

export const updateItem = async (id: number, updatedItem: { title: string; body: string }) => {
  const response = await axios.put(`${API_URL}/${id}`, updatedItem);
  return response.data;
};

export const deleteItem = async (id: number) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};

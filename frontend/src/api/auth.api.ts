import api from "./axios";

export async function getCurrentUser() {
  const response = await api.get("/profile");
  return response.data;
}
import api from "./axios";

export async function getProfile() {
  const response = await api.get("/profile");

  return response.data;
}
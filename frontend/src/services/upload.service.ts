import api from "../api/axios";

export interface Upload {
  id: string;
  file_name: string;
  s3_url: string;
  content_type: string;
  file_size: number;
  created_at: string;
}

export async function getUploads() {
  const response = await api.get("/uploads");
  return response.data.data;
}

export async function uploadFile(file: File) {
  const formData = new FormData();
  formData.append("file", file);

  const response = await api.post(
    "/uploads",
    formData
  );

  return response.data.data;
}

export async function deleteUpload(id: string) {
  await api.delete(`/uploads/${id}`);
}
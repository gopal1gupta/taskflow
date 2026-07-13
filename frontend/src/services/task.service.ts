import api from "../api/axios";

export interface Task {
  id: string;
  title: string;
  description: string | null;
  status: string;
  priority: string;
  due_date: string | null;
  created_at: string;
}

export async function getTasks() {
  const response = await api.get("/tasks");
  return response.data.data;
}

export async function createTask(task: {
  title: string;
  description?: string;
  priority?: string;
  due_date?: string;
}) {
  const response = await api.post("/tasks", task);
  return response.data.data;
}

export async function updateTask(
  id: string,
  task: Partial<{
    title: string;
    description: string;
    priority: string;
    due_date: string;
  }>
) {
  const response = await api.put(`/tasks/${id}`, task);
  return response.data.data;
}

export async function deleteTask(id: string) {
  await api.delete(`/tasks/${id}`);
}
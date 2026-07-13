import api from "../api/axios";

export interface DashboardData {
  totalTasks: number;
  completedTasks: number;
  pendingTasks: number;
  totalUploads: number;
  recentTasks: any[];
  recentUploads: any[];
}

export async function getDashboard(): Promise<DashboardData> {
  const response = await api.get("/dashboard");

  return response.data.data;
}
import { DashboardRepository } from "./dashboard.repository";

export class DashboardService {
  private repository = new DashboardRepository();

  async getDashboard(userId: string) {
    return this.repository.getDashboard(userId);
  }
}
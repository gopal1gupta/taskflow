import { TaskRepository } from "./task.repository";
import { CreateTaskDto } from "./task.types";

export class TaskService {
  private repository = new TaskRepository();

  // Create Task
  async createTask(task: CreateTaskDto) {
    return this.repository.create(task);
  }

  // Get All Tasks
  async getTasks(userId: string) {
    return this.repository.findByUserId(userId);
  }

  // Update Task
  async updateTask(
    id: string,
    userId: string,
    task: Partial<CreateTaskDto>
  ) {
    return this.repository.update(id, userId, task);
  }

  // Delete Task
  async deleteTask(
    id: string,
    userId: string
  ) {
    return this.repository.deleteById(id, userId);
  }
}
import { Request, Response } from "express";
import { TaskService } from "./task.service";
import { createTaskSchema } from "./task.validator";

const service = new TaskService();

export class TaskController {
  // Create Task
  async create(req: Request, res: Response) {
    try {
      const data = createTaskSchema.parse(req.body);

      const task = await service.createTask({
        user_id: req.currentUser!.id,
        title: data.title,
        description: data.description,
        priority: data.priority,
        due_date: data.due_date
          ? new Date(data.due_date)
          : undefined,
      });

      return res.status(201).json({
        success: true,
        message: "Task created successfully",
        data: task,
      });
    } catch (error) {
      console.error(error);

      return res.status(400).json({
        success: false,
        message: "Unable to create task",
      });
    }
  }

  // Get All Tasks
  async getAll(req: Request, res: Response) {
    try {
      const tasks = await service.getTasks(req.currentUser!.id);

      return res.status(200).json({
        success: true,
        data: tasks,
      });
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        success: false,
        message: "Unable to fetch tasks.",
      });
    }
  }

  // Update Task
  async update(req: Request, res: Response) {
    try {
      const data = createTaskSchema.partial().parse(req.body);
      const taskId = Array.isArray(req.params.id)
        ? req.params.id[0]
        : req.params.id;

      const task = await service.updateTask(
        taskId,
        req.currentUser!.id,
        {
          title: data.title,
          description: data.description,
          priority: data.priority,
          due_date: data.due_date
            ? new Date(data.due_date)
            : undefined,
        }
      );

      if (!task) {
        return res.status(404).json({
          success: false,
          message: "Task not found.",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Task updated successfully.",
        data: task,
      });
    } catch (error) {
      console.error(error);

      return res.status(400).json({
        success: false,
        message: "Unable to update task.",
      });
    }
  }

  // Delete Task
  async delete(req: Request, res: Response) {
    try {
      const taskId = Array.isArray(req.params.id)
        ? req.params.id[0]
        : req.params.id;

      const deleted = await service.deleteTask(
        taskId,
        req.currentUser!.id
      );

      if (!deleted) {
        return res.status(404).json({
          success: false,
          message: "Task not found.",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Task deleted successfully.",
      });
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        success: false,
        message: "Unable to delete task.",
      });
    }
  }
}
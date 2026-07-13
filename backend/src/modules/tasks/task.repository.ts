import { pool } from "../../config/database";
import { CreateTaskDto, Task } from "./task.types";

export class TaskRepository {

  // Create Task
  async create(task: CreateTaskDto): Promise<Task> {
    const result = await pool.query(
      `
      INSERT INTO tasks
      (
        user_id,
        title,
        description,
        priority,
        due_date
      )
      VALUES
      (
        $1,
        $2,
        $3,
        $4,
        $5
      )
      RETURNING *
      `,
      [
        task.user_id,
        task.title,
        task.description ?? null,
        task.priority ?? "MEDIUM",
        task.due_date ?? null,
      ]
    );

    return result.rows[0];
  }

  // Get All Tasks
  async findByUserId(userId: string): Promise<Task[]> {
    const result = await pool.query(
      `
      SELECT *
      FROM tasks
      WHERE user_id = $1
      ORDER BY created_at DESC
      `,
      [userId]
    );

    return result.rows;
  }

  // Update Task
  async update(
    id: string,
    userId: string,
    task: Partial<CreateTaskDto>
  ): Promise<Task | null> {
    const result = await pool.query(
      `
      UPDATE tasks
      SET
        title = COALESCE($3, title),
        description = COALESCE($4, description),
        priority = COALESCE($5, priority),
        due_date = COALESCE($6, due_date),
        updated_at = CURRENT_TIMESTAMP
      WHERE id = $1
        AND user_id = $2
      RETURNING *
      `,
      [
        id,
        userId,
        task.title,
        task.description,
        task.priority,
        task.due_date,
      ]
    );

    return result.rows[0] ?? null;
  }

  // Delete Task
  async deleteById(
    id: string,
    userId: string
  ): Promise<boolean> {
    const result = await pool.query(
      `
      DELETE FROM tasks
      WHERE id = $1
        AND user_id = $2
      `,
      [id, userId]
    );

    return result.rowCount === 1;
  }
}
export interface Task {
  id: string;
  user_id: string;

  title: string;
  description: string | null;

  status: "TODO" | "IN_PROGRESS" | "DONE";

  priority: "LOW" | "MEDIUM" | "HIGH";

  due_date: Date | null;

  created_at: Date;
  updated_at: Date;
}

export interface CreateTaskDto {
  user_id: string;

  title: string;

  description?: string;

  priority?: "LOW" | "MEDIUM" | "HIGH";

  due_date?: Date;
}
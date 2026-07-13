import { z } from "zod";

export const createTaskSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(255),

  description: z.string().optional(),

  priority: z
    .enum(["LOW", "MEDIUM", "HIGH"])
    .optional(),

  due_date: z.string().datetime().optional(),
});

export type CreateTaskInput = z.infer<
  typeof createTaskSchema
>;
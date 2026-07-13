import express from "express";
import cors from "cors";
import helmet from "helmet";
import uploadRoutes from "./modules/uploads/upload.routes";
import healthRoutes from "./routes/health.routes";
import profileRoutes from "./routes/profile.routes";
import taskRoutes from "./modules/tasks/task.routes";
import dashboardRoutes from "./modules/dashboard/dashboard.routes";
const app = express();

// Security headers
app.use(helmet());

// Enable CORS
app.use(cors());

// Parse JSON body
app.use(express.json());

// Health endpoint
app.use("/health", healthRoutes);

import databaseRoutes from "./routes/database.routes";

app.use(databaseRoutes);

import userRoutes from "./modules/users/user.routes";

app.use("/api/users", userRoutes);
app.use("/profile", profileRoutes);

app.use("/api/tasks", taskRoutes);
app.use("/api/uploads", uploadRoutes);
app.use("/api/dashboard", dashboardRoutes);
export default app;
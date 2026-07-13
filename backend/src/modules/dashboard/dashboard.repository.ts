import { pool } from "../../config/database";

export class DashboardRepository {
  async getDashboard(userId: string) {
    const totalTasks = await pool.query(
      `
      SELECT COUNT(*)::int count
      FROM tasks
      WHERE user_id=$1
      `,
      [userId]
    );

    const completedTasks = await pool.query(
      `
      SELECT COUNT(*)::int count
      FROM tasks
      WHERE user_id=$1
      AND status='COMPLETED'
      `,
      [userId]
    );

    const uploads = await pool.query(
      `
      SELECT COUNT(*)::int count
      FROM uploads
      WHERE user_id=$1
      `,
      [userId]
    );

    const recentTasks = await pool.query(
      `
      SELECT *
      FROM tasks
      WHERE user_id=$1
      ORDER BY created_at DESC
      LIMIT 5
      `,
      [userId]
    );

    const recentUploads = await pool.query(
      `
      SELECT *
      FROM uploads
      WHERE user_id=$1
      ORDER BY created_at DESC
      LIMIT 5
      `,
      [userId]
    );

    return {
      totalTasks: totalTasks.rows[0].count,
      completedTasks: completedTasks.rows[0].count,
      pendingTasks:
        totalTasks.rows[0].count -
        completedTasks.rows[0].count,
      totalUploads: uploads.rows[0].count,
      recentTasks: recentTasks.rows,
      recentUploads: recentUploads.rows,
    };
  }
}
import { pool } from "../../config/database";
import {
  CreateUploadDto,
  Upload,
} from "./upload.types";

export class UploadRepository {
  async create(
    upload: CreateUploadDto
  ): Promise<Upload> {
    const result = await pool.query(
      `
      INSERT INTO uploads
      (
        user_id,
        file_name,
        s3_key,
        s3_url,
        content_type,
        file_size
      )
      VALUES
      ($1,$2,$3,$4,$5,$6)
      RETURNING *
      `,
      [
        upload.user_id,
        upload.file_name,
        upload.s3_key,
        upload.s3_url,
        upload.content_type,
        upload.file_size,
      ]
    );

    return result.rows[0];
  }

  async findByUser(
    userId: string
  ): Promise<Upload[]> {
    const result = await pool.query(
      `
      SELECT *
      FROM uploads
      WHERE user_id = $1
      ORDER BY created_at DESC
      `,
      [userId]
    );

    return result.rows;
  }

  async findById(
    id: string
  ): Promise<Upload | null> {
    const result = await pool.query(
      `
      SELECT *
      FROM uploads
      WHERE id = $1
      `,
      [id]
    );

    return result.rows[0] ?? null;
  }

  async delete(id: string) {
    await pool.query(
      `
      DELETE FROM uploads
      WHERE id = $1
      `,
      [id]
    );
  }
}
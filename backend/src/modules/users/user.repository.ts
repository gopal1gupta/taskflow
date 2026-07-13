import { pool } from "../../config/database";
import { CreateUserDto, User } from "./user.types";

export class UserRepository {
  async findByCognitoSub(cognitoSub: string): Promise<User | null> {
    const result = await pool.query(
      `SELECT * FROM users WHERE cognito_sub = $1`,
      [cognitoSub]
    );

    return result.rows[0] ?? null;
  }

  async findById(id: string): Promise<User | null> {
    const result = await pool.query(
      `SELECT * FROM users WHERE id = $1`,
      [id]
    );

    return result.rows[0] ?? null;
  }

  async create(user: CreateUserDto): Promise<User> {
    const result = await pool.query(
      `
      INSERT INTO users
      (
        cognito_sub,
        email,
        full_name
      )
      VALUES ($1,$2,$3)
      RETURNING *
      `,
      [
        user.cognito_sub,
        user.email,
        user.full_name ?? null,
      ]
    );

    return result.rows[0];
  }
}
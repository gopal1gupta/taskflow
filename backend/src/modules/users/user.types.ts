export interface User {
  id: string;
  cognito_sub: string;
  email: string;
  full_name: string | null;
  role: string;
  created_at: Date;
  updated_at: Date;
}

export interface CreateUserDto {
  cognito_sub: string;
  email: string;
  full_name?: string;
}
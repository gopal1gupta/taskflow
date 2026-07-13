export interface User {
  id: string;
  name: string;
  email: string;
}

export interface AuthContextType {
  user: User | null;

  login: (
    email: string,
    password: string
  ) => Promise<boolean>;

  logout: () => Promise<void>;

  isAuthenticated: boolean;

  // NEW
  isLoading: boolean;
}
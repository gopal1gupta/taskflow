import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

import {
  getCurrentLoggedInUser,
  logoutUser,
} from "../services/auth.service";

import { loginUser } from "../services/cognito.service";

import type {
  AuthContextType,
  User,
} from "../types/auth";

const AuthContext =
  createContext<AuthContextType | null>(null);

interface Props {
  children: ReactNode;
}

export function AuthProvider({ children }: Props) {
  const [user, setUser] =
    useState<User | null>(null);

  // NEW
  const [isLoading, setIsLoading] =
    useState(true);

  useEffect(() => {
    async function loadUser() {
      try {
        const cognitoUser =
          await getCurrentLoggedInUser();

        setUser({
          id: cognitoUser.userId,
          name: cognitoUser.username,
          email:
            cognitoUser.signInDetails?.loginId ?? "",
        });
      } catch {
        setUser(null);
      } finally {
        // NEW
        setIsLoading(false);
      }
    }

    loadUser();
  }, []);

  const login = async (
    email: string,
    password: string
  ): Promise<boolean> => {
    try {
      await loginUser(email, password);

      const cognitoUser =
        await getCurrentLoggedInUser();

      setUser({
        id: cognitoUser.userId,
        name: cognitoUser.username,
        email:
          cognitoUser.signInDetails?.loginId ?? "",
      });

      return true;
    } catch {
      return false;
    }
  };

  const logout = async () => {
    await logoutUser();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: !!user,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used within an AuthProvider"
    );
  }

  return context;
}
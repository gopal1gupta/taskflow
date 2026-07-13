import { useState } from "react";
import {
  Link as RouterLink,
  useNavigate,
} from "react-router-dom";

import {
  Checkbox,
  FormControlLabel,
  Link,
  TextField,
} from "@mui/material";

import LoadingButton from "@mui/lab/LoadingButton";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { toast } from "react-toastify";

import { loginSchema } from "../../validation/auth.schema";
import type { LoginFormData } from "../../validation/auth.schema";

import AuthLayout from "../../components/auth/AuthLayout";
import AuthHeader from "../../components/auth/AuthHeader";
import PasswordField from "../../components/auth/PasswordField";

import { useAuth } from "../../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();

  const { login } = useAuth();

  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      setLoading(true);

      const success = await login(
        data.email,
        data.password
      );

      if (!success) {
        throw new Error("Login failed");
      }

      toast.success("Login successful!");

      navigate("/", {
        replace: true,
      });
    } catch (error) {
      let message = "Login failed";

      if (error instanceof Error) {
        message = error.message;
      }

      if (
        message.includes("UserNotConfirmedException")
      ) {
        toast.error(
          "Please verify your email before logging in."
        );
      } else if (
        message.includes("NotAuthorizedException")
      ) {
        toast.error("Invalid email or password.");
      } else if (
        message.includes("UserNotFoundException")
      ) {
        toast.error("User does not exist.");
      } else {
        toast.error(message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <AuthHeader
        title="Welcome Back"
        subtitle="Sign in to your account"
      />

      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          fullWidth
          margin="normal"
          label="Email"
          error={!!errors.email}
          helperText={errors.email?.message}
          {...register("email")}
        />

        <PasswordField
          label="Password"
          error={!!errors.password}
          helperText={errors.password?.message}
          {...register("password")}
        />

        <FormControlLabel
          control={<Checkbox />}
          label="Remember Me"
        />

        <LoadingButton
          loading={loading}
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 2 }}
        >
          Login
        </LoadingButton>

        <Link
          component={RouterLink}
          to="/forgot-password"
          display="block"
          mt={3}
        >
          Forgot Password?
        </Link>

        <Link
          component={RouterLink}
          to="/signup"
          display="block"
          mt={1}
        >
          Create an Account
        </Link>
      </form>
    </AuthLayout>
  );
}
import { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { registerUser } from "../../services/cognito.service";

import {
  Checkbox,
  FormControlLabel,
  Link,
  TextField,
  Typography,
} from "@mui/material";

import LoadingButton from "@mui/lab/LoadingButton";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { signupSchema } from "../../validation/signup.schema";
import type { SignupFormData } from "../../validation/signup.schema";

import { toast } from "react-toastify";

import AuthLayout from "../../components/auth/AuthLayout";
import PasswordField from "../../components/auth/PasswordField";

export default function Signup() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: SignupFormData) => {
   setLoading(true);

try {
  await registerUser(
    data.fullName,
    data.email,
    data.password
  );

  toast.success(
    "Account created successfully! Please verify your email."
  );

  navigate("/verify-email", {
    state: {
      email: data.email,
    },
  });
} catch (error) {
  const message =
    error instanceof Error
      ? error.message
      : "Something went wrong";

  toast.error(message);
} finally {
  setLoading(false);
}
  };

  return (
    <AuthLayout>
      <Typography
        variant="h4"
        fontWeight="bold"
        textAlign="center"
      >
        Create Account
      </Typography>

      <Typography
        color="text.secondary"
        textAlign="center"
        mb={4}
      >
        Join TaskFlow today
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label="Full Name"
          fullWidth
          margin="normal"
          error={!!errors.fullName}
          helperText={errors.fullName?.message}
          {...register("fullName")}
        />

        <TextField
          label="Email"
          fullWidth
          margin="normal"
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

        <PasswordField
          label="Confirm Password"
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword?.message}
          {...register("confirmPassword")}
        />

        <FormControlLabel
          control={<Checkbox {...register("acceptTerms")} />}
          label="I agree to the Terms & Conditions"
        />

        {errors.acceptTerms && (
          <Typography
            color="error"
            variant="body2"
            sx={{ mb: 2 }}
          >
            {errors.acceptTerms.message}
          </Typography>
        )}

        <LoadingButton
          loading={loading}
          fullWidth
          variant="contained"
          sx={{ mt: 2 }}
          type="submit"
        >
          Create Account
        </LoadingButton>

        <Typography
          textAlign="center"
          mt={3}
        >
          Already have an account?{" "}
          <Link component={RouterLink} to="/login">
            Login
          </Link>
        </Typography>
      </form>
    </AuthLayout>
  );
}
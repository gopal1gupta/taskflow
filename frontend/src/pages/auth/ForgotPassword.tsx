import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Button,
  TextField,
  Typography,
} from "@mui/material";

import LoadingButton from "@mui/lab/LoadingButton";
import { toast } from "react-toastify";

import AuthLayout from "../../components/auth/AuthLayout";
import { forgotPassword } from "../../services/cognito.service";

export default function ForgotPassword() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendCode = async () => {
    if (!email) {
      toast.error("Please enter your email.");
      return;
    }

    try {
      setLoading(true);

      await forgotPassword(email);

      toast.success("Verification code sent to your email.");

      navigate("/reset-password", {
        state: {
          email,
        },
      });
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Unable to send verification code.";

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
        Forgot Password
      </Typography>

      <Typography
        color="text.secondary"
        textAlign="center"
        mb={4}
      >
        Enter your registered email address.
      </Typography>

      <TextField
        fullWidth
        label="Email Address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <LoadingButton
        loading={loading}
        fullWidth
        variant="contained"
        sx={{ mt: 3 }}
        onClick={handleSendCode}
      >
        Send Verification Code
      </LoadingButton>
    </AuthLayout>
  );
}
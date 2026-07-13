import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import {
  Box,
  Button,
  TextField,
  Typography,
} from "@mui/material";

import LoadingButton from "@mui/lab/LoadingButton";

import { toast } from "react-toastify";

import AuthLayout from "../../components/auth/AuthLayout";

import {
  confirmUser,
  resendVerificationCode,
} from "../../services/cognito.service";

export default function VerifyEmail() {
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email || "";

  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  const handleVerify = async () => {
    if (!code) {
      toast.error("Please enter the verification code.");
      return;
    }

    try {
      setLoading(true);

      await confirmUser(email, code);

      toast.success("Email verified successfully!");

      navigate("/login");
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Verification failed.";

      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    try {
      await resendVerificationCode(email);

      toast.success("Verification code sent again.");
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Unable to resend verification code.";

      toast.error(message);
    }
  };

  return (
    <AuthLayout>
      <Typography
        variant="h4"
        fontWeight="bold"
        textAlign="center"
      >
        Verify Email
      </Typography>

      <Typography
        color="text.secondary"
        textAlign="center"
        mb={4}
      >
        Enter the verification code sent to
      </Typography>

      <Typography
        textAlign="center"
        fontWeight="bold"
        mb={3}
      >
        {email}
      </Typography>

      <TextField
        fullWidth
        label="Verification Code"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />

      <Box mt={3}>
        <LoadingButton
          loading={loading}
          fullWidth
          variant="contained"
          onClick={handleVerify}
        >
          Verify Email
        </LoadingButton>

        <Button
          fullWidth
          sx={{ mt: 2 }}
          onClick={handleResend}
        >
          Resend Code
        </Button>
      </Box>
    </AuthLayout>
  );
}
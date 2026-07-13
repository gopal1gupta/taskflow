import {
  signUp,
  confirmSignUp,
  signIn,
  signOut,
  resetPassword,
  confirmResetPassword,
} from "aws-amplify/auth";

export async function registerUser(
  fullName: string,
  email: string,
  password: string
) {
  return await signUp({
    username: email,
    password,
    options: {
      userAttributes: {
        email,
        name: fullName,
      },
    },
  });
}

export async function confirmUser(
  email: string,
  code: string
) {
  return await confirmSignUp({
    username: email,
    confirmationCode: code,
  });
}





export async function loginUser(
  email: string,
  password: string
) {
  // Clear any existing session
  try {
    await signOut();
  } catch {
    // Ignore if no user is signed in
  }

  return await signIn({
    username: email,
    password,
  });
}

export async function logoutUser() {
  return await signOut();
}

export async function forgotPassword(email: string) {
  return await resetPassword({
    username: email,
  });
}

export async function confirmForgotPassword(
  email: string,
  code: string,
  newPassword: string
) {
  return await confirmResetPassword({
    username: email,
    confirmationCode: code,
    newPassword,
  });
}

import { resendSignUpCode } from "aws-amplify/auth";

export async function resendVerificationCode(
  email: string
) {
  return await resendSignUpCode({
    username: email,
  });
}
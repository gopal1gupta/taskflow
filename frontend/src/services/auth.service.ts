import {
  fetchAuthSession,
  getCurrentUser,
  signOut,
} from "aws-amplify/auth";

export async function getCurrentLoggedInUser() {
  return await getCurrentUser();
}

export async function getAccessToken(): Promise<string | undefined> {
  const session = await fetchAuthSession();
  return session.tokens?.accessToken?.toString();
}

export async function getIdToken(): Promise<string | undefined> {
  const session = await fetchAuthSession();
  return session.tokens?.idToken?.toString();
}

export async function logoutUser() {
  await signOut();
}
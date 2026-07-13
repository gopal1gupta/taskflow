import axios from "axios";
import { fetchAuthSession } from "aws-amplify/auth";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

api.interceptors.request.use(async (config) => {
  try {
    const session = await fetchAuthSession();

    const accessToken = session.tokens?.accessToken?.toString();
    const idToken = session.tokens?.idToken?.toString();

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    if (idToken) {
      config.headers["x-id-token"] = idToken;
    }
  } catch (error) {
    console.error("Unable to get Cognito tokens:", error);
  }

  return config;
});

export default api;
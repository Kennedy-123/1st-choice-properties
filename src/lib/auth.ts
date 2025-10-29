// src/lib/auth.ts
import axios from "axios";

export const refreshAccessToken = async (
  refreshToken: string | null
): Promise<string | null> => {
  if (!refreshToken) return null;

  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh-token`,
      { refreshToken },
      { headers: { "Content-Type": "application/json" } }
    );

    // Expecting { accessToken: "..." } from backend
    return res.data.accessToken ?? null;
  } catch {
    // Return null instead of throwing — lets the caller decide cleanly
    return null;
  }
};

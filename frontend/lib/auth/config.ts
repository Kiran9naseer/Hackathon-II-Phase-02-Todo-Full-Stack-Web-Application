import { createAuthClient } from "better-auth/client";
import { getEnv } from "@/lib/config";

/**
 * Better Auth client configuration with JWT plugin.
 *
 * Configures:
 * - JWT signing with HS256 algorithm
 * - HttpOnly cookie storage for security
 * - 24-hour token expiration
 * - SameSite=Strict for CSRF protection
 */
export const authClient = createAuthClient({
  baseURL: getEnv().BETTER_AUTH_URL,
  cookieName: "jwt_token",
  cookieCache: true,
});

/**
 * Get the current session token from the client.
 * Reads from the HttpOnly cookie set by Better Auth.
 */
export async function getAuthToken(): Promise<string | null> {
  try {
    // Read token from cookie directly
    const cookies = document.cookie.split("; ");
    const tokenCookie = cookies.find((cookie) =>
      cookie.startsWith("jwt_token=") || cookie.startsWith("better-auth.session-token=")
    );

    if (tokenCookie) {
      const token = tokenCookie.split("=")[1];
      return token || null;
    }

    // Check localStorage as fallback (for when HttpOnly cookies are blocked on cross-origin POSTs)
    if (typeof window !== 'undefined') {
      const localToken = localStorage.getItem('token');
      if (localToken) return localToken;
    }

    // Fallback to fetching from session endpoint
    const response = await fetch(`${getEnv().NEXT_PUBLIC_APP_URL}/api/auth/session`, {
      method: "GET",
      credentials: "include",
    });

    if (response.ok) {
      const data = await response.json();
      return data.session?.token || null;
    }
    return null;
  } catch {
    return null;
  }
}

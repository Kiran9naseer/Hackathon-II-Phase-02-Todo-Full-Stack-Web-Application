// frontend/lib/auth/config.ts
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export const {
  handlers,
  auth,
  signIn,
  signOut
} = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const res = await fetch(`${API_BASE_URL}/api/v1/auth/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          });

          const data = await res.json();

          if (res.ok && data.user) {
            // Return user object, the token will be handled by callbacks
            return {
              id: data.user.id,
              email: data.user.email,
              name: data.user.name,
              token: data.token, // Store token temporarily here
            };
          } else {
            throw new Error(data.detail || "Login failed");
          }
        } catch (error: any) {
          console.error("Credentials login error:", error.message);
          throw new Error(error.message || "Something went wrong during login.");
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        // The custom 'token' from authorize is available here
        token.accessToken = (user as any).token; 
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id as string;
      session.user.email = token.email as string;
      session.user.name = token.name as string;
      (session as any).accessToken = token.accessToken; // Attach accessToken to session
      return session;
    },
    async redirect({ url, baseUrl }) {
      // Allows for custom redirection after login/logout.
      // Default behavior in 'better-auth/client' might override this for client-side navigation.
      return baseUrl;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  jwt: {
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: "/login", // Use the existing login page
    error: "/error", // Optionally define an error page
  },
  secret: process.env.AUTH_SECRET,
});
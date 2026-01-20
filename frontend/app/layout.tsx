import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { getEnv } from "@/lib/config";
import { AuthProvider } from "@/lib/auth/provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: getEnv().NEXT_PUBLIC_APP_NAME,
    template: `%s | ${getEnv().NEXT_PUBLIC_APP_NAME}`,
  },
  description: "TodoMaster - Organize your life, boost productivity, and achieve your goals with our intuitive task management solution. Smart task management, real-time progress tracking, and priority organization.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}

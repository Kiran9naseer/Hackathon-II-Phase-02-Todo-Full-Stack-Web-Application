// frontend/app/api/auth/[...auth]/route.ts
import { handlers } from "@/lib/auth/config";

export const { GET, POST } = handlers;

import Credentials from "next-auth/providers/credentials";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import type { NextAuthConfig } from "next-auth";
import { LoginSchemas } from "./schemas/LoginSchemas";
import { db } from "./lib/db";
import bcrypt from "bcryptjs";

// Notice this is only an object, not a full Auth.js instance
export default {
  providers: [
    Github({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Credentials({
      async authorize(credentials) {
        const validatedFiels = LoginSchemas.safeParse(credentials);

        if (validatedFiels.success) {
          const { email, password } = validatedFiels.data;

          const user = await db.user.findUnique({
            where: { email },
          });

          if(!user || !user.password) return null;

          const isCorrectPAssword = await bcrypt.compare(password, user.password)

          if(isCorrectPAssword) return user
        }

        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;

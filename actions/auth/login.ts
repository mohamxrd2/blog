"use server";

import { signIn } from "@/auth";
import { db } from "@/lib/db";
import { LOGIN_REDIRECT } from "@/routes";
import { LoginFormType, LoginSchemas } from "@/schemas/LoginSchemas";
import { AuthError } from "next-auth";

export const login = async (values: LoginFormType) => {
  const validated = LoginSchemas.safeParse(values);

  if (!validated.success) {
    return { error: "Champs invalides. Veuillez vérifier vos informations." };
  }

  const { email, password } = validated.data;

  try {
    const user = await db.user.findUnique({
      where: { email },
    });

    if (!user || !user.password) {
      return { error: "Identifiants incorrects." };
    }

    // if (!user.emailVerified) {
    //   return { error: "Votre email n'a pas été vérifié." };
    // }

    // 🔐 Connexion
    await signIn("credentials", {
      email,
      password,
      redirect: false,
      redirectTo: LOGIN_REDIRECT,
    });

    return { success: "Connexion réussie", redirect: LOGIN_REDIRECT };

  } catch (error: unknown) {
    if (error instanceof AuthError) {
      return { error: "Identifiants incorrects." };
    }

    if (error instanceof Error && error.name === "CredentialsSignin") {
      return { error: "Identifiants incorrects." };
    }

    console.error("Login error:", error);
    return { error: "Une erreur est survenue. Veuillez réessayer plus tard." };
  }
};

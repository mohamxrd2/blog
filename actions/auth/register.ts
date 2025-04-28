"use server";

import { db } from "@/lib/db";
import { RegisterFormType, RegisterSchemas } from "@/schemas/RegisterSchemas";
import bcrypt from "bcryptjs";

export const signUp = async (values: RegisterFormType) => {
  // 1. Validation des données avec Zod
  const validateFields = RegisterSchemas.safeParse(values);

  if (!validateFields.success) {
    return { error: "Champs invalides, merci de vérifier vos informations." };
  }

  const { name, email, password } = validateFields.data;

  try {
    // 2. Vérifier si l'utilisateur existe déjà
    const existingUser = await db.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return { error: "Cet email est déjà utilisé !" };
    }

    // 3. Hasher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4. Créer le nouvel utilisateur
    await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    // 5. Retourner succès
    return { success: "Compte créé avec succès !" };

  } catch (error) {
    console.error(error);
    return { error: "Une erreur est survenue lors de la création du compte." };
  }
};

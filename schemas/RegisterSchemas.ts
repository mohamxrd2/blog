import { z } from 'zod';

// Schéma de validation avec Zod
export const RegisterSchemas = z.object({
  name: z
    .string()
    .min(4, { message: "Le nom doit être au moins de 4 caractères" })
    .max(30, { message: "Le nom ne doit pas dépasser 30 caractères" }),
  email: z
    .string()
    .email({ message: "L'email doit être valide" })
    .nonempty({ message: "L'email est requis" }),
  password: z
    .string()
    .min(6, { message: "Le mot de passe doit comporter au moins 6 caractères" })
    .nonempty({ message: "Le mot de passe est requis" }),
  confirmPassword: z
    .string()
    .nonempty({ message: "La confirmation du mot de passe est requise" }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Les mots de passe ne correspondent pas",
  path: ["confirmPassword"], // On associe l'erreur à confirmPassword
});

// Exportation du type basé sur le schéma de validation
export type RegisterFormType = z.infer<typeof RegisterSchemas>;

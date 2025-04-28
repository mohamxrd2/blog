import { z } from 'zod';

// Schéma de validation avec Zod
export const LoginSchemas = z.object({
  email: z
    .string()
    .email({ message: "L'email doit être valide" })
    .nonempty({ message: "L'email est requis" }),
  password: z
    .string()
    .min(6, { message: "Le mot de passe doit comporter au moins 6 caractères" })
    .nonempty({ message: "Le mot de passe est requis" }),
});

// Exportation du type basé sur le schéma de validation
export type LoginFormType = z.infer<typeof LoginSchemas>;

"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import FormField from "../common/FormField";
import Button from "../common/Button";
import { LogInIcon } from "lucide-react";
import Hedding from "../common/Hedding";
import SocialAuth from "./SocialAuth";

import { RegisterFormType, RegisterSchemas } from "@/schemas/RegisterSchemas";
import { signUp } from "@/actions/auth/register";
// <-- 1. IMPORTER SIGNUP

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormType>({
    resolver: zodResolver(RegisterSchemas),
  });

  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [serverSuccess, setServerSuccess] = useState<string | null>(null);

  const onSubmit = async (data: RegisterFormType) => {
    try {
      setIsLoading(true);
      setServerError(null);
      setServerSuccess(null);

      const response = await signUp(data); // <-- 2. UTILISER SIGNUP

      if (response?.error) {
        setServerError(response.error);
      }

      if (response?.success) {
        setServerSuccess(response.success);
        // Tu peux ici ajouter une redirection si tu veux
        // router.push('/login')
      }
    } catch (error) {
      console.error(error);
      setServerError("Une erreur inattendue est survenue.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 flex flex-col max-w-[500px] mx-auto mt-8"
    >
      <Hedding title="Create account to Bog dev" center lg />

      {/* Affichage Erreur ou Succès avec style moderne */}
      {serverError && (
        <div className="flex items-center justify-center gap-2 bg-red-50 border border-red-300 text-red-700 px-4 py-3 rounded-lg text-sm shadow-md animate-fade-in">
          <span>{serverError}</span>
        </div>
      )}

      {serverSuccess && (
        <div className="flex items-center justify-center gap-2 bg-green-50 border border-green-300 text-green-700 px-4 py-3 rounded-lg text-sm shadow-md animate-fade-in">
          <span>{serverSuccess}</span>
        </div>
      )}

      <FormField
        id="name"
        register={register}
        errors={errors.name}
        placeholder="Name"
      />
      <FormField
        id="email"
        register={register}
        errors={errors.email}
        placeholder="Email"
      />
      <FormField
        id="password"
        type="password"
        register={register}
        errors={errors.password}
        placeholder="Mot de passe"
      />
      <FormField
        id="confirmPassword"
        type="password"
        register={register}
        errors={errors.confirmPassword}
        placeholder="Confirm password"
      />

      <Button
        type="submit"
        label={isLoading ? "Création en cours..." : "Register"}
        loading={isLoading}
        outlined={true}
        iconType={<LogInIcon size={18} />}
      />

      <div className="flex justify-center mb-4">Or</div>

      <SocialAuth />
    </form>
  );
}

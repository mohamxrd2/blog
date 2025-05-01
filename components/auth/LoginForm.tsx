"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { LoginFormType, LoginSchemas } from "@/schemas/LoginSchemas";
import FormField from "../common/FormField";
import Button from "../common/Button";
import { LogInIcon } from "lucide-react";
import Hedding from "../common/Hedding";
import SocialAuth from "./SocialAuth";
import { login } from "@/actions/auth/login";

export default function LoginForm() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormType>({
    resolver: zodResolver(LoginSchemas),
  });

  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [formSuccess, setFormSuccess] = useState<string | null>(null);

  const onSubmit = async (data: LoginFormType) => {
    setIsLoading(true);
    setFormError(null);
    setFormSuccess(null);

    const res = await login(data);

    if (res?.error) {
      setFormError(res.error);
    } else if (res?.success) {
      setFormSuccess(res.success);
      // Rediriger vers l'URL de redirection
      router.push(res.redirect || "/");
    }

    setIsLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 flex flex-col max-w-[500px] mx-auto mt-8"
    >
      <Hedding title="Login to Bog dev" center lg />

     

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
      <Button
        type="submit"
        label={isLoading ? "Connexion..." : "Login"}
        loading={isLoading}
        outlined={true}
        iconType={<LogInIcon size={18} />}
      />

{formError && (
        <div className="flex items-center justify-center gap-2 bg-red-50 border border-red-300 text-red-700 px-4 py-3 rounded-lg text-sm shadow-md animate-fade-in">
        <span>{formError}</span>
      </div>
      )}
      {formSuccess && (
         <div className="flex items-center justify-center gap-2 bg-green-50 border border-green-300 text-green-700 px-4 py-3 rounded-lg text-sm shadow-md animate-fade-in">
         <span>{formSuccess}</span>
       </div>
      )}
      <div className="flex justify-center mb-4">Or</div>
      <SocialAuth />
    </form>
  );
}

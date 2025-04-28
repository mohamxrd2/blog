"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"; // bien écrit "zodResolver"
import { LoginFormType, LoginSchemas } from "@/schemas/LoginSchemas";
import FormField from "../common/FormField";
import Button from "../common/Button";
import { LogInIcon } from "lucide-react";
import Hedding from "../common/Hedding";
import SocialAuth from "./SocialAuth";

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormType>({
    resolver: zodResolver(LoginSchemas),
  });

  const [isLoading, setIsLoading] = useState(false); // <-- on ajoute ça

  const onSubmit = async (data: LoginFormType) => {
    try {
      setIsLoading(true); // Quand on soumet => Loading true

      // Simulation d'une requête (remplace ici par ton appel API)
      await new Promise((resolve) => setTimeout(resolve, 2000));

      console.log(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false); // Quand la requête finit => Loading false
    }
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
        label={isLoading ? "Connexion..." : "Login"} // Change de texte si loading
        loading={isLoading} // On envoie l'état de loading
        outlined={true}
        iconType= {<LogInIcon size={18} />}
      />
      <div className="flex justify-center  mb-4">Or</div>
      <SocialAuth/>
    </form>
  );
}

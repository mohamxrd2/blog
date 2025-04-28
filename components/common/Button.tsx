"use client";

import React from "react";
import { Loader2 } from "lucide-react"; // On utilise un spinner Lucide pour le loading

interface Props {
  label: string;
  disabled?: boolean;
  outlined?: boolean;
  small?: boolean;
  iconType?: React.ReactNode; // Le type d'icône
  className?: string;
  type?: "submit" | "reset" | "button";
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  loading?: boolean; // Pour afficher le spinner
}

export default function Button({
  label,
  disabled = false,
  outlined = false,
  small = false,
  iconType,
  className = "",
  type = "button",
  onClick,
  loading = false,
}: Props) {
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled || loading}
      className={`
        flex items-center justify-center gap-2
        rounded-md 
        ${outlined ? "border border-black bg-white text-black" : "bg-black text-white"}
        ${small ? "px-3 py-1 text-sm" : "px-4 py-2 text-base"}
        disabled:opacity-50 disabled:cursor-not-allowed
        hover:opacity-80 transition
        ${className}
      `}
    >
      {/* Icone s'il existe */}
      {iconType && !loading && (
        <span className="flex items-center">
          {iconType}
        </span>
      )}
      {/* Loader pendant chargement */}
      {loading && (
        <Loader2 className="animate-spin h-5 w-5" />
      )}
      {/* Label */}
      {label}
    </button>
  );
}

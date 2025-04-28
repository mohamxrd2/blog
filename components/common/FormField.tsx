"use client";


import { FieldError, Path, UseFormRegister, FieldValues } from "react-hook-form";

interface Props<T extends FieldValues> {
  id: string;
  type?: string;
  disabled?: boolean;
  placeholder: string;
  label?: string;
  inputClassName?: string;
  register: UseFormRegister<T>;
  errors?: FieldError;

}

export default function FormField<T extends FieldValues>({
  id,
  type = "text",
  disabled = false,
  placeholder,
  label,
  inputClassName = "",
  register,
  errors,
}: Props<T>) {
  return (
    <div className="grid w-full gap-1.5">
      {label && (
        <label
          htmlFor={id}
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-2"
        >
          {label}
        </label>
      )}
      <input
        id={id}
        type={type}
        disabled={disabled}
        placeholder={placeholder}
        className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${inputClassName} ${errors ? 'border-red-500' : ''}`}
        {...register(id as Path<T>)}
      />
      {errors && (
        <p className="text-[12px] text-red-500">
          {errors.message}
        </p>
      )}
    </div>
  );
}

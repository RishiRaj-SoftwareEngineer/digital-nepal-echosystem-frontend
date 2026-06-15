import React from "react";

type InputProps = {
  label?: string;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
};

export function Input({
  label,
  placeholder,
  error,
  disabled,
  leftIcon,
  rightIcon,
}: InputProps) {
  return (
    <div>
      {label && <label>{label}</label>}

      <div className="flex items-center border rounded px-2">
        {leftIcon}
        <input
          placeholder={placeholder}
          disabled={disabled}
          className="flex-1 outline-none"
        />
        {rightIcon}
      </div>

      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}
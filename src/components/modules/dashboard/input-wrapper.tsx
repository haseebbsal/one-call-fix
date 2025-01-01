import React from "react";

interface InputWrapperProps {
  title: string;
  description?: string;
  className?: string;
  children: React.ReactNode;
}

export default function InputWrapper({
  title,
  description,
  className = "",
  children,
}: InputWrapperProps) {
  return (
    <div
      className={`flex flex-col justify-center w-full max-w-xl ${className}`}
    >
      <h3 className="font-bold mb-1">{title}</h3>
      {description && <span className="text-xs md:text-sm text-color-14 mb-3">
        {description}
      </span>}
      {children}
    </div>
  );
}

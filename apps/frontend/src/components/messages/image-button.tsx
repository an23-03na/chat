/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useRef } from "react";
import { cn } from "@/lib/utils";
import { Image } from "lucide-react";

interface Props {
  className?: string;
  handleImage: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ImageButton: React.FC<Props> = (props) => {
  const {className, handleImage} = props
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className={cn("", className)}>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        hidden
        onChange={handleImage}
      />

      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="p-2 rounded-full hover:bg-muted transition"
      >
        <Image size={20} />
      </button>
    </div>
  );
};
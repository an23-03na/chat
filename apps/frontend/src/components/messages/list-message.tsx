/* eslint-disable @next/next/no-img-element */
"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/auth/use-auth";
import { useChat } from "@/hooks/chat/use-chat";

interface Props {
  className?: string;
}

export const ListMessage: React.FC<Props> = (props) => {
  const { className } = props;
  const { authUser } = useAuth();
  const { messages } = useChat();

  return (
    <ul
      className={cn(
        "flex flex-col items-end overflow-auto gap-5 grow",
        className,
      )}
    >
      {messages.map((m: any) => (
        <li
          className={cn("grid gap-2", {
            "self-start": m.senderId !== authUser.id,
          })}
          key={m.id}
        >{m.senderId === authUser.id ? "Вы" : m.sender.name}
          {m.imageUrl && (
            <img
              src={m.imageUrl}
              alt="message"
              className="max-w-xs rounded-lg object-cover"
            />
          )}
          <span>{m.text}</span>
        </li>
      ))}
    </ul>
  );
};

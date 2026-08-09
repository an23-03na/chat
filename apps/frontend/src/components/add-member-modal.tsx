/* eslint-disable @typescript-eslint/no-explicit-any */
// components/chat/add-member-dialog.tsx
"use client";

import React, { useState } from "react";
import { useRooms } from "@/hooks/chat/use-rooms";
import { useAddMember } from "@/hooks/chat/use-add-member";
import { useChatStore } from "@/store/chat";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "./ui/dialog";

export function AddMemberDialog({
  onClose,
  children,
}: {
  children: React.ReactNode;
  onClose?: () => void;
}) {
  const { users } = useRooms();
  const { selectedChat } = useChatStore();
  const { addMember } = useAddMember();
  const [search, setSearch] = useState("");

  if (!selectedChat) return null;

  // существующие участники (id) — предположим, что чат приходит с members
  const existingIds = selectedChat.members?.map((m: any) => m.userId) ?? [];

  const availableUsers = users.filter(
    (u: any) =>
      !existingIds.includes(u.id) &&
      u.name.toLowerCase().includes(search.toLowerCase()),
  );

  const handleAdd = async (userId: string) => {
    await addMember(selectedChat.id, userId);
    // при желании: обнови selectedChat.members локально или через mutate
  };

  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className="bg-white rounded-lg p-4">
        <DialogTitle className="font-semibold mb-3">
          Добавить участника
        </DialogTitle>

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Поиск пользователя..."
          className="w-full border rounded-md px-3 py-2 mb-3 outline-none"
        />

        <div className="max-h-60 overflow-y-auto flex flex-col gap-2">
          {availableUsers.map((user: any) => (
            <button
              key={user.id}
              onClick={() => handleAdd(user.id)}
              className="flex items-center gap-2 p-2 hover:bg-muted rounded-md text-left"
            >
              <img
                src={user.avatar || "/default-avatar.png"}
                className="w-8 h-8 rounded-full"
              />
              <span>{user.name}</span>
            </button>
          ))}
          {availableUsers.length === 0 && (
            <p className="text-sm text-muted-foreground">Никого не найдено</p>
          )}
        </div>

        <button
          onClick={onClose}
          className="mt-3 text-sm text-muted-foreground"
        >
          Закрыть
        </button>
      </DialogContent>
    </Dialog>
  );
}

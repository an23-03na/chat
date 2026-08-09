/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";

interface ChatStore {
  selectedChat: any | null;
  selectedUser: any | null;
  setSelectedChat: (chat: any) => void;
  setSelectedUser: (user: any) => void;
  reset: () => void;
}

export const useChatStore = create<ChatStore>((set) => ({
  selectedChat: null,
  selectedUser: null,
  setSelectedChat: (selectedChat) => set({ selectedChat, selectedUser: null }),
  setSelectedUser: (selectedUser) => set({ selectedUser, selectedChat: null }),
  reset: () => set({ selectedChat: null, selectedUser: null }),
}));

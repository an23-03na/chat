import { create } from "zustand";
import { Socket } from "socket.io-client";

interface Props {
  socket: Socket | null;
  onlineUsers: string[];
  setSocket: (socket: Socket | null) => void;
  setOnlineUsers: (users: string[]) => void;
}

export const useAuthStore = create<Props>((set) => ({
  socket: null,
  setSocket: (socket) => {
    set({ socket });
  },
  onlineUsers: [],
  setOnlineUsers(onlineUsers) {
    set({ onlineUsers });
  },
}));

export const ApiRoutes = {
  SIGNUP: "/auth/signup",
  VERIFY: "/auth/verify",
  LOGIN: "/auth/login",
  LOGOUT: "/auth/logout",
  ME: "/auth/me",
  CHATS: "/chats",
  CHAT: (id: string) => `/chats/${id}`,
  MESSAGES_PRIVATE: "/messages/user",
  MESSAGES_ROOM: "/messages/room",
  CHAT_MEMBERS: (chatId: string) => `/chats/members/${chatId}`,
} as const;

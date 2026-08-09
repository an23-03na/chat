import { useRooms } from "./use-rooms";
import { useMessages } from "./use-messages";

export const useChat = () => {
  const rooms = useRooms();
  const { messages, isLoading: isMessagesLoading, sendMessage } = useMessages();

  return {
    ...rooms,
    messages,
    isMessagesLoading,
    sendMessage,
  };
};

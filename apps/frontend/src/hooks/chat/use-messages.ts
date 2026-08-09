/* eslint-disable @typescript-eslint/no-explicit-any */
import useSWR from "swr";
import { useEffect } from "react";
import { axiosInstance } from "@/lib/instance";
import { ApiRoutes } from "@/constants/api-routes";
import { toast } from "sonner";
import { fetcher } from "@/lib/fetcher";
import { useAuth } from "../auth/use-auth";
import { useChatStore } from "@/store/chat";

export const useMessages = () => {
  const { selectedChat, selectedUser } = useChatStore();
  const { socket } = useAuth();

  const url = selectedUser
    ? `${ApiRoutes.MESSAGES_PRIVATE}/${selectedUser.id}`
    : selectedChat
      ? `${ApiRoutes.MESSAGES_ROOM}/${selectedChat.id}`
      : null;

  const {
    data: messages = [],
    isLoading,
    mutate,
  } = useSWR(url, fetcher, {
    revalidateOnFocus: false,
    revalidateOnMount: true,
    keepPreviousData: false,
  });

  useEffect(() => {
    if (!socket) return;

    const handler = ({ chatId, member }: any) => {
      mutate((prev: any) => {
        if (!prev) return prev;

        return {
          ...prev,
          chats: prev.chats.map((c: any) =>
            c.id === chatId
              ? { ...c, members: [...(c.members ?? []), member] }
              : c,
          ),
        };
      }, false);
    };

    socket.on("memberAdded", handler);

    return () => {
      socket.off("memberAdded", handler);
    };
  }, [socket, mutate]);

  useEffect(() => {
    if (!socket || !selectedChat) return;
    socket.emit("joinRoom", selectedChat.id);

    return () => {
      socket.emit("leaveRoom", selectedChat.id);
    };
  }, [socket, selectedChat]);

  useEffect(() => {
    if (!socket || !selectedUser) return;

    const handler = (newMessage: any) => {
      const isFromSelectedUser = newMessage.sender.id === selectedUser.id;

      const isToSelectedUser = newMessage.receiverId === selectedUser.id;

      if (!isFromSelectedUser && !isToSelectedUser) {
        return;
      }

      mutate((prev: any[] = []) => {
        if (prev.some((m) => m.id === newMessage.id)) return prev;
        return [...prev, newMessage];
      }, false);
    };

    socket.on("newPrivateMessage", handler);

    return () => {
      socket.off("newPrivateMessage", handler);
    };
  }, [socket, selectedUser, mutate]);

  useEffect(() => {
    if (!socket || !selectedChat) return;

    const handler = (newMessage: any) => {
      if (newMessage.chatId !== selectedChat.id) return;

      mutate((prev: any[] = []) => {
        if (prev.some((m) => m.id === newMessage.id)) return prev;
        return [...prev, newMessage];
      }, false);
    };

    socket.on("newMessage", handler);

    return () => {
      socket.off("newMessage", handler);
    };
  }, [socket, selectedChat, mutate]);

  const sendMessage = async (text: string, image?: string) => {
    console.log("selectedUser:", selectedUser);
    console.log("selectedChat:", selectedChat);
    if (!selectedUser && !selectedChat) {
      console.log("❌ Нет выбранного чата");
      return;
    }

    try {
      const res = selectedUser
        ? await axiosInstance.post(ApiRoutes.MESSAGES_PRIVATE, {
            text,
            imageUrl: image,
            receiverId: selectedUser.id,
          })
        : await axiosInstance.post(
            `${ApiRoutes.MESSAGES_ROOM}/${selectedChat.id}`,
            { text, imageUrl: image },
          );

      mutate((prev: any[] = []) => {
        if (prev.some((m) => m.id === res.data.id)) return prev;
        return [...prev, res.data];
      }, false);
    } catch (error) {
      console.log(error);
      toast.error("Failed to send message");
    }
  };

  return {
    messages,
    isLoading,
    sendMessage,
  };
};

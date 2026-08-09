import useSWR from "swr";
import { axiosInstance } from "@/lib/instance";
import { ApiRoutes } from "@/constants/api-routes";
import { toast } from "sonner";
import { fetcher } from "@/lib/fetcher";
import { useChatStore } from "@/store/chat";

export const useRooms = () => {
  const { selectedChat, setSelectedChat, selectedUser, setSelectedUser } =
    useChatStore();

  const { data, isLoading, mutate } = useSWR(ApiRoutes.CHATS, fetcher, {
    revalidateOnFocus: false,
  });

  const chats = data?.chats ?? [];
  const users = data?.users ?? [];

  const createPublicChat = async (name: string, icon?: string) => {
    try {
      const res = await axiosInstance.post(ApiRoutes.CHATS, {
        name,
        icon,
      });

      mutate();
      setSelectedChat(res.data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to create chat");
    }
  };

  const deletePublicChat = async (Id: string) => {
    try {
      await axiosInstance.delete(ApiRoutes.CHAT(Id));
      await mutate();
      toast.success("Chat deleted");
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete chat");
    }
  };

  return {
    chats,
    users,
    isLoading,
    selectedUser,
    selectedChat,
    setSelectedUser,
    setSelectedChat,
    createPublicChat,
    deletePublicChat,
    mutate,
  };
};

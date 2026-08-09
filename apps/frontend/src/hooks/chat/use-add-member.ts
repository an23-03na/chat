/* eslint-disable @typescript-eslint/no-explicit-any */
import { axiosInstance } from "@/lib/instance";
import { ApiRoutes } from "@/constants/api-routes";
import { toast } from "sonner";

export const useAddMember = () => {
  const addMember = async (chatId: string, userId: string) => {
    try {
      await axiosInstance.post(ApiRoutes.CHAT_MEMBERS(chatId), { userId });
      toast.success("User added to chat");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to add member");
    }
  };

  const removeMember = async (chatId: string, userId: string) => {
    try {
      await axiosInstance.delete(ApiRoutes.CHAT_MEMBERS(chatId), {
        data: { userId },
      });
      toast.success("User removed");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to remove member");
    }
  };

  return { addMember, removeMember };
};

/* eslint-disable @typescript-eslint/no-explicit-any */
import { ApiRoutes } from "@/constants/api-routes";
import { fetcher } from "@/lib/fetcher";
import { axiosInstance } from "@/lib/instance";
import { useAuthStore } from "@/store/auth";
import { io } from "socket.io-client";
import useSWR from "swr";
export const useAuth = () => {
  const { onlineUsers, setOnlineUsers, setSocket, socket } = useAuthStore();

  const socketConnect = (user: any) => {
    if (!user || socket?.connected) {
      return;
    }

    const newSocket = io(process.env.NEXT_PUBLIC_SOCKET_URL, {
      query: { userId: user.id },
    });

    newSocket.connect();
    setSocket(newSocket);

    newSocket.on("onlineUsers", (userIds: string[]) => {
      setOnlineUsers(userIds);
    });
  };

  const socketDisconnect = () => {
    if (socket?.connected) {
      socket.disconnect();
      setSocket(null);
    }
  };

  const {
    data: authUser,
    isLoading: isAuthUser,
    mutate,
  } = useSWR(ApiRoutes.ME, fetcher, {
    onError: () => mutate(null, false),
    revalidateOnFocus: false,
  });

  const signup = async (data: any) => {
    await axiosInstance.post(ApiRoutes.SIGNUP, data);
  };
  const login = async (data: any) => {
  const user = (await axiosInstance.post(ApiRoutes.LOGIN, data)).data;
  mutate(user, false);
  socketConnect(user);
};
  const logout = async () => {
    await axiosInstance.post(ApiRoutes.LOGOUT);
    mutate(null, false);
    socketDisconnect();
  };
  const updateProfile = async (data: any) => {
    const res = (await axiosInstance.patch(ApiRoutes.ME, data)).data;
    mutate(res.data, false);
  };

  return {
    authUser,
    isAuthUser,
    onlineUsers,
    socket,
    signup,
    login,
    logout,
    updateProfile,
    socketConnect,
    socketDisconnect,
  };
};

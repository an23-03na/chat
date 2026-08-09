/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useAuth } from "@/hooks/auth/use-auth";
import { useChat } from "@/hooks/chat/use-chat";

export function SiteHeader() {
  const { onlineUsers } = useAuth();
  const { selectedUser, selectedChat, users } = useChat();
  const selected = selectedUser?.name || selectedChat?.name;

  const onlines = users.filter((el: any) => {
    return onlineUsers.includes(el.id);
  });

  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <h1 className="text-base font-medium">{selected}</h1>
        {selectedChat?.id &&
          onlines.map((el: any) => (
            <span key={el.id}>
              {el.name} <span className="w-2 h-2 rounded-full bg-[aqua] inline-block"></span>
            </span>
          ))}
      </div>
    </header>
  );
}

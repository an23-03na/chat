"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { DialogContent, DialogTrigger, Dialog, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useChat } from "@/hooks/chat/use-chat";

interface Props {
  className?: string;
  children: React.ReactNode;
}

export const CreateChatModal: React.FC<Props> = (props) => {
  const { className, children } = props;
  const [name, setName] = React.useState("");
  const { createPublicChat } = useChat();

  return (
    <Dialog>
      <DialogTrigger className="cursor-pointer">{children}</DialogTrigger>
      <DialogContent className={cn("flex pt-10", className)}>
        <DialogTitle hidden />
        <div className="flex gap-4 grow">
          <Input
            className="grow"
            placeholder="name chat"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
          <Button
            onClick={async () => {
              await createPublicChat(name);
            }}
          >
            create chat
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

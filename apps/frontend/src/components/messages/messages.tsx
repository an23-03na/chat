import React from "react";
import { cn } from "@/lib/utils";
import { ListMessage } from "./list-message";
import { SendMessage } from "./send-message";

interface Props {
  className?: string;
}

export const Messages: React.FC<Props> = (props) => {
  const { className } = props;
  return (
    <div className={cn("flex flex-1 flex-col", className)}>
      <div className="@container/main flex flex-1 gap-2">
        <div className="flex flex-col w-full gap-4 p-4 md:gap-6 md:py-6">
          <ListMessage />
          <SendMessage />
        </div>
      </div>
    </div>
  );
};

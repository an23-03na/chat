/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useChat } from "@/hooks/chat/use-chat";
import { EmojiButton } from "./emoji-button";
import { ImageButton } from "./image-button";
import { useImage } from "@/hooks/use-image";

interface Props {
  className?: string;
}

export const SendMessage: React.FC<Props> = (props) => {
  const { className } = props;
  const [text, setText] = React.useState("");

  const { sendMessage } = useChat();
  const { handleImage, image, clearImage } = useImage();
  return (
    <div className={cn("", className)}>
      {image && (
        <div className="mb-2 ml-22">
          <img
            src={image}
            alt="preview"
            className="w-15 h-15 rounded-lg object-cover border"
          />
        </div>
      )}
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          console.log("Отправка сообщения");
          console.log("text:", text);
          console.log("image:", image);
          await sendMessage(text, image);
          setText("");
          clearImage();
        }}
        className="flex items-center gap-2"
      >
        <ImageButton handleImage={handleImage} />
        <EmojiButton
          onSelect={(emoji) => setText((prev) => prev + emoji)} // вставляем эмодзи в текст
        />
        <Input
          className="grow"
          placeholder="Message"
          onChange={(e) => setText(e.target.value)}
          value={text}
        />
        <Button>Send</Button>
      </form>
    </div>
  );
};

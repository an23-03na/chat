"use client";
import { useState, useRef } from "react";
import EmojiPicker from "emoji-picker-react";
import { Smile } from "lucide-react";
import { useClickAway } from "react-use";
interface Props {
  onSelect: (emoji: string) => void;
}

export function EmojiButton({ onSelect }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useClickAway(ref, () => {
    setOpen(false);
  });

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="p-2 rounded-full hover:bg-muted transition"
      >
        <Smile className="w-5 h-5" />
      </button>

      {open && (
        <div className="absolute bottom-12 right-0 z-50">
          <EmojiPicker
            onEmojiClick={(emojiData) => {
              onSelect(emojiData.emoji);
              setOpen(false);
            }}
          />
        </div>
      )}
    </div>
  );
}

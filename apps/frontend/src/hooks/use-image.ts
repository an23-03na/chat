import React from "react";

export const useImage = () => {
  const [image, setImage] = React.useState("");

  const fileToBase64 = (file: File) =>
    new Promise<string>((resolve, reject) => {
      const reader = new FileReader();

      reader.readAsDataURL(file);

      reader.onloadend = () => {
        resolve(reader.result as string);
      };

      reader.onerror = reject;
    });

  const handleImage = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) return;

    const base64 = await fileToBase64(file);

    setImage(base64);
  };

  const clearImage = () => {
    setImage("");
  };

  return {
    image,
    handleImage,
    clearImage,
  };
};
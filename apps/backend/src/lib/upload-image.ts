import cloudinary from "./cloudinary";

export const uploadImage = async (data: string) => {
  let imageUrl = "";
  if (data) {
    const uploadImage = await cloudinary.uploader.upload(data || "");
    imageUrl = uploadImage.secure_url;
  }
  return imageUrl;
};

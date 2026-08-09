"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadImage = void 0;
const cloudinary_1 = __importDefault(require("./cloudinary"));
const uploadImage = async (data) => {
    let imageUrl = "";
    if (data) {
        const uploadImage = await cloudinary_1.default.uploader.upload(data || "");
        imageUrl = uploadImage.secure_url;
    }
    return imageUrl;
};
exports.uploadImage = uploadImage;
//# sourceMappingURL=upload-image.js.map
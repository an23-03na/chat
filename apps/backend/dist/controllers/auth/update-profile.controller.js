"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProfile = void 0;
const auth_schema_1 = require("../../validations/auth.schema");
const zod_1 = __importDefault(require("zod"));
const prisma_client_1 = require("../../prisma/prisma-client");
const cloudinary_1 = __importDefault(require("../../lib/cloudinary"));
const updateProfile = async (req, res) => {
    const { name, phone, avatar } = req.body;
    const user = req.user;
    try {
        const parsed = auth_schema_1.updateProfileSchema.safeParse({
            avatar,
            name,
            phone,
        });
        if (!parsed.success) {
            const error = zod_1.default.treeifyError(parsed.error);
            return res.status(400).json(error);
        }
        const data = parsed.data;
        if (!user) {
            return res.status(400).json({ message: "user not found" });
        }
        let imageUrl = "";
        if (data.avatar) {
            const uploadImage = await cloudinary_1.default.uploader.upload(data.avatar || "");
            imageUrl = uploadImage.secure_url;
        }
        const updateUser = await prisma_client_1.prisma.user.update({
            where: { id: user.id },
            data: {
                name: data.name,
                avatar: imageUrl,
                phone: data.phone,
            },
            select: {
                id: true,
                avatar: true,
                name: true,
                verified: true,
            },
        });
        return res.status(200).json(updateUser);
    }
    catch (error) {
        console.log("Server Error update profile ", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
exports.updateProfile = updateProfile;
//# sourceMappingURL=update-profile.controller.js.map
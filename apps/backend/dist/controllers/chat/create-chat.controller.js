"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createChat = void 0;
const zod_1 = __importDefault(require("zod"));
const chat_schema_1 = require("../../validations/chat.schema");
const upload_image_1 = require("../../lib/upload-image");
const prisma_client_1 = require("../../prisma/prisma-client");
const createChat = async (req, res) => {
    try {
        const userId = req.user?.id;
        if (!userId)
            return res.status(401).json({ message: "Unauthorized" });
        const parsed = chat_schema_1.chatSchema.safeParse(req.body);
        if (!parsed.success)
            return res.status(400).json(zod_1.default.treeifyError(parsed.error));
        const data = parsed.data;
        const imageUrl = data.icon ? await (0, upload_image_1.uploadImage)(data.icon) : null;
        const newChat = await prisma_client_1.prisma.chat.create({
            data: {
                name: data.name,
                icon: imageUrl,
                user: { connect: { id: userId } },
                members: {
                    create: [{ userId }],
                },
            },
        });
        return res.status(201).json(newChat);
    }
    catch (error) {
        console.log("Server Error create chat", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
exports.createChat = createChat;
//# sourceMappingURL=create-chat.controller.js.map
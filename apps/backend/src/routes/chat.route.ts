import { Router } from "express";
import { protectRoute } from "../middleware/auth.middleware";
import { getChatsAndUsers } from "../controllers/chat/get-chats-and-users.controller";
import { createChat } from "../controllers/chat/create-chat.controller";
import { deleteChat } from "../controllers/chat/delete-chat.controller";
import { addMember } from "../controllers/chat/add-member";
import { removeMember } from "../controllers/chat/remove-member";

const router = Router();

router.get("/", protectRoute, getChatsAndUsers);
router.post("/", protectRoute, createChat);
router.delete("/:id", protectRoute, deleteChat);
router.post("/members/:id", protectRoute, addMember);
router.delete("/members/:id", protectRoute, removeMember);

export default router;

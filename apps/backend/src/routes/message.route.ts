import { Router } from "express";
import { protectRoute } from "../middleware/auth.middleware";
import { getMessageUser } from "../controllers/message/get-message-user.controller";
import { getMessageChat } from "../controllers/message/get-message-chat.controller";
import { createMessage } from "../controllers/message/create-message.controller";

const router = Router();

router.get("/user/:id", protectRoute, getMessageUser);
router.post("/user", protectRoute, createMessage);
router.get("/room/:id", protectRoute, getMessageChat);
router.post("/room/:id", protectRoute, createMessage);

export default router;

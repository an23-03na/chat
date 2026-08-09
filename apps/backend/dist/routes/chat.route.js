"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../middleware/auth.middleware");
const get_chats_and_users_controller_1 = require("../controllers/chat/get-chats-and-users.controller");
const create_chat_controller_1 = require("../controllers/chat/create-chat.controller");
const delete_chat_controller_1 = require("../controllers/chat/delete-chat.controller");
const add_member_1 = require("../controllers/chat/add-member");
const remove_member_1 = require("../controllers/chat/remove-member");
const router = (0, express_1.Router)();
router.get("/", auth_middleware_1.protectRoute, get_chats_and_users_controller_1.getChatsAndUsers);
router.post("/", auth_middleware_1.protectRoute, create_chat_controller_1.createChat);
router.delete("/:id", auth_middleware_1.protectRoute, delete_chat_controller_1.deleteChat);
router.post("/members/:id", auth_middleware_1.protectRoute, add_member_1.addMember);
router.delete("/members/:id", auth_middleware_1.protectRoute, remove_member_1.removeMember);
exports.default = router;
//# sourceMappingURL=chat.route.js.map
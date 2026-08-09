"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../middleware/auth.middleware");
const get_message_user_controller_1 = require("../controllers/message/get-message-user.controller");
const get_message_chat_controller_1 = require("../controllers/message/get-message-chat.controller");
const create_message_controller_1 = require("../controllers/message/create-message.controller");
const router = (0, express_1.Router)();
router.get("/user/:id", auth_middleware_1.protectRoute, get_message_user_controller_1.getMessageUser);
router.post("/user", auth_middleware_1.protectRoute, create_message_controller_1.createMessage);
router.get("/room/:id", auth_middleware_1.protectRoute, get_message_chat_controller_1.getMessageChat);
router.post("/room/:id", auth_middleware_1.protectRoute, create_message_controller_1.createMessage);
exports.default = router;
//# sourceMappingURL=message.route.js.map
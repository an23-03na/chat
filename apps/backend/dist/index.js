"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const auth_route_1 = __importDefault(require("./routes/auth.route"));
const chat_route_1 = __importDefault(require("./routes/chat.route"));
const message_route_1 = __importDefault(require("./routes/message.route"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const socket_1 = require("./lib/socket");
const port = Number(process.env.PORT) || 5555;
socket_1.app.use((0, cors_1.default)({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "DELETE", "PATCH"],
    credentials: true,
}));
socket_1.app.use(express_1.default.json());
socket_1.app.use((0, cookie_parser_1.default)());
socket_1.app.use("/api/auth", auth_route_1.default);
socket_1.app.use("/api/chats", chat_route_1.default);
socket_1.app.use("/api/messages", message_route_1.default);
socket_1.server.listen(port, () => {
    console.log(`server run port ${port}`);
});
//# sourceMappingURL=index.js.map
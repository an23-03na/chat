"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.protectRoute = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma_client_1 = require("../prisma/prisma-client");
const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if (!token) {
            return res.status(401).json({ message: "not authorized token" });
        }
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || "");
        if (!decoded) {
            return res.status(401).json({ message: "not authorized decoded" });
        }
        const user = await prisma_client_1.prisma.user.findUnique({
            where: { id: decoded.userId },
        });
        if (!user) {
            return res.status(401).json({ message: "not authorized user" });
        }
        req.user = user;
        next();
    }
    catch (error) {
        console.log("Internal Server Error protectRoute");
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
exports.protectRoute = protectRoute;
//# sourceMappingURL=auth.middleware.js.map
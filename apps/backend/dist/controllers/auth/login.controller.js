"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const auth_schema_1 = require("../../validations/auth.schema");
const zod_1 = __importDefault(require("zod"));
const prisma_client_1 = require("../../prisma/prisma-client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const generate_token_1 = require("../../lib/generate-token");
const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const parsed = auth_schema_1.loginSchema.safeParse({
            email,
            password,
        });
        if (!parsed.success) {
            const error = zod_1.default.treeifyError(parsed.error);
            return res.status(400).json(error);
        }
        const data = parsed.data;
        const user = await prisma_client_1.prisma.user.findUnique({
            where: { email: data.email },
        });
        if (!user) {
            return res.status(400).json({ message: "invalid email or password" });
        }
        if (!user.password) {
            return res.status(400).json({ message: "invalid email or password" });
        }
        const isPasswordValid = await bcrypt_1.default.compare(data.password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "invalid email or password" });
        }
        if (!user.verified) {
            return res.status(400).json({ message: "user is not verified" });
        }
        const { password: _password, createdAt, updatedAt, ...rest } = user;
        (0, generate_token_1.generateToken)(user.id, res);
        return res.status(200).json(rest);
    }
    catch (error) {
        console.log("Server Error login ", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
exports.login = login;
//# sourceMappingURL=login.controller.js.map
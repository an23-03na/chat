"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signup = void 0;
const auth_schema_1 = require("../../validations/auth.schema");
const zod_1 = __importDefault(require("zod"));
const prisma_client_1 = require("../../prisma/prisma-client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const send_email_1 = require("../../lib/send-email");
const signup = async (req, res) => {
    const { email, name, phone, password, avatar } = req.body;
    try {
        const parsed = auth_schema_1.signupSchema.safeParse({
            email,
            avatar,
            name,
            password,
            phone,
        });
        if (!parsed.success) {
            const error = zod_1.default.treeifyError(parsed.error);
            return res.status(400).json(error);
        }
        const data = parsed.data;
        const isUserExist = await prisma_client_1.prisma.user.findUnique({
            where: { email: data.email },
        });
        if (isUserExist) {
            return res.status(400).json("user already exist");
        }
        const hashedPassword = await bcrypt_1.default.hash(data.password, 10);
        const user = await prisma_client_1.prisma.user.create({
            data: {
                userName: data.userName,
                email: data.email,
                name: data.name,
                password: hashedPassword,
                avatar: data.avatar,
                phone: data.phone,
            },
        });
        if (user) {
            const code = Math.floor(100000 + Math.random() * 900000).toString();
            await prisma_client_1.prisma.verificationCode.create({
                data: { code, userId: user.id },
            });
            await (0, send_email_1.sendEmail)({
                to: data.email,
                subject: "Verification",
                html: `<a href="${process.env.API_URL}/api/auth/verify?code=${code}">verify</a>`,
            });
            return res.status(201).json({ message: "success register" });
        }
        else {
            return res.status(400).json("user not created");
        }
    }
    catch (error) {
        console.log("Server Error signup ", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
exports.signup = signup;
//# sourceMappingURL=signup.controller.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verify = void 0;
const prisma_client_1 = require("../../prisma/prisma-client");
const generate_token_1 = require("../../lib/generate-token");
const verify = async (req, res) => {
    const { code } = req.query;
    try {
        if (!code || typeof code !== "string") {
            return res.status(400).json({ message: "code not found" });
        }
        const verificationCode = await prisma_client_1.prisma.verificationCode.findFirst({
            where: { code: code },
            include: { user: true },
        });
        if (!verificationCode) {
            return res.status(400).json({ message: "code not found" });
        }
        await prisma_client_1.prisma.verificationCode.delete({
            where: { userId: verificationCode.user.id },
        });
        const user = await prisma_client_1.prisma.user.update({
            where: { id: verificationCode.user.id },
            data: { verified: new Date() },
        });
        await prisma_client_1.prisma.verificationCode.delete({
            where: { id: verificationCode.id },
        });
        if (user) {
            (0, generate_token_1.generateToken)(user.id, res);
            return res.redirect(`${process.env.FRONTEND_URL}?verify`);
        }
        else {
            return res.status(400).json("user not created");
        }
    }
    catch (error) {
        console.log("Server Error verify ", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
exports.verify = verify;
//# sourceMappingURL=verify.controller.js.map
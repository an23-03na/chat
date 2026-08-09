"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMe = void 0;
const getMe = async (req, res) => {
    try {
        const { password, ...rest } = req.user;
        return res.status(200).json(rest);
    }
    catch (error) {
        console.log("Server Error get me", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
exports.getMe = getMe;
//# sourceMappingURL=get-me.controller.js.map
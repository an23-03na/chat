"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = void 0;
const logout = async (req, res) => {
    try {
        res.clearCookie("jwt");
        return res.status(200).json({ message: "success logout" });
    }
    catch (error) {
        console.log("Server Error logout ", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
exports.logout = logout;
//# sourceMappingURL=logout.controller.js.map
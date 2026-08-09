"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProfileSchema = exports.loginSchema = exports.signupSchema = exports.passwordShchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.passwordShchema = zod_1.default
    .string()
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&._-])[A-Za-z\d@$!%*?&._-]{8,}$/, "email or password invalid");
exports.signupSchema = zod_1.default.object({
    name: zod_1.default.string().min(2, "minimum 2 symbol"),
    userName: zod_1.default.string().min(2, "minimum 2 symbol").optional(),
    email: zod_1.default.email("email or password invalid"),
    password: exports.passwordShchema,
    phone: zod_1.default.string(),
    avatar: zod_1.default.string().optional(),
});
exports.loginSchema = zod_1.default.object({
    email: zod_1.default.email("email or password invalid"),
    password: exports.passwordShchema,
});
exports.updateProfileSchema = zod_1.default.object({
    name: zod_1.default.string().min(2, "minimum 2 symbol").optional(),
    avatar: zod_1.default.string().optional(),
    phone: zod_1.default.string().optional(),
});
//# sourceMappingURL=auth.schema.js.map
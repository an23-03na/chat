import { Router } from "express";
import { signup } from "../controllers/auth/signup.controller";
import { verify } from "../controllers/auth/verify.controller";
import { protectRoute } from "../middleware/auth.middleware";
import { getMe } from "../controllers/auth/get-me.controller";
import { logout } from "../controllers/auth/logout.controller";
import { login } from "../controllers/auth/login.controller";
import { updateProfile } from "../controllers/auth/update-profile.controller";

const router = Router();

router.post("/signup", signup);
router.get("/verify", verify);
router.post("/logout", logout);
router.post("/login", login);
router.get("/me", protectRoute, getMe);
router.patch("/me", protectRoute, updateProfile);

export default router;

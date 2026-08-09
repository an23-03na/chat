"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const signup_controller_1 = require("../controllers/auth/signup.controller");
const verify_controller_1 = require("../controllers/auth/verify.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const get_me_controller_1 = require("../controllers/auth/get-me.controller");
const logout_controller_1 = require("../controllers/auth/logout.controller");
const login_controller_1 = require("../controllers/auth/login.controller");
const update_profile_controller_1 = require("../controllers/auth/update-profile.controller");
const router = (0, express_1.Router)();
router.post("/signup", signup_controller_1.signup);
router.get("/verify", verify_controller_1.verify);
router.post("/logout", logout_controller_1.logout);
router.post("/login", login_controller_1.login);
router.get("/me", auth_middleware_1.protectRoute, get_me_controller_1.getMe);
router.patch("/me", auth_middleware_1.protectRoute, update_profile_controller_1.updateProfile);
exports.default = router;
//# sourceMappingURL=auth.route.js.map
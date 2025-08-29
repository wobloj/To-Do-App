"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const passport_1 = __importDefault(require("../config/passport"));
const User_1 = __importDefault(require("../models/User"));
const jwt_1 = require("../config/jwt");
const router = (0, express_1.Router)();
// Register (local)
router.post("/register", (0, express_validator_1.body)("email").isEmail(), (0, express_validator_1.body)("password").isLength({ min: 6 }), async (req, res) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() });
    const { email, password, displayName } = req.body;
    const normalizedEmail = email.toLowerCase();
    let user = await User_1.default.findOne({ email: normalizedEmail });
    if (!user) {
        const passwordHash = await bcryptjs_1.default.hash(password, 12);
        user = await User_1.default.create({
            email: normalizedEmail,
            displayName: displayName || normalizedEmail.split("@")[0],
            accounts: [{ provider: "local", passwordHash }],
        });
    }
    else {
        const hasLocal = user.accounts.some((a) => a.provider === "local");
        if (hasLocal)
            return res.status(409).json({ error: "Konto lokalne już istnieje dla tego emaila" });
        const passwordHash = await bcryptjs_1.default.hash(password, 12);
        user.accounts.push({ provider: "local", providerId: "local" + normalizedEmail, passwordHash });
        await user.save();
    }
    const token = (0, jwt_1.signToken)(user);
    return res.status(201).json({ token, user: { id: user._id, email: user.email, displayName: user.displayName } });
});
// Login (local)
router.post("/login", (req, res, next) => {
    passport_1.default.authenticate("local", { session: false }, (err, user, info) => {
        if (err)
            return res.status(500).json({ error: err.message });
        if (!user)
            return res.status(401).json({ error: (info === null || info === void 0 ? void 0 : info.message) || "Błąd logowania" });
        const token = (0, jwt_1.signToken)(user);
        return res.json({ token, user: { id: user._id, email: user.email, displayName: user.displayName } });
    })(req, res, next);
});
// OAuth helpers
const oauthSuccessHandler = (req, res) => {
    const token = (0, jwt_1.signToken)(req.user);
    const redirect = new URL(process.env.CLIENT_URL);
    redirect.hash = `token=${token}`; // e.g. http://localhost:5173/#token=...
    res.redirect(redirect.toString());
};
// Google
if (process.env.GOOGLE_CLIENT_ID) {
    router.get("/google", passport_1.default.authenticate("google", { scope: ["profile", "email"] }));
    router.get("/google/callback", passport_1.default.authenticate("google", { session: false, failureRedirect: process.env.CLIENT_URL }), oauthSuccessHandler);
}
// GitHub
if (process.env.GITHUB_CLIENT_ID) {
    router.get("/github", passport_1.default.authenticate("github", { scope: ["user:email"] }));
    router.get("/github/callback", passport_1.default.authenticate("github", { session: false, failureRedirect: process.env.CLIENT_URL }), oauthSuccessHandler);
}
// Facebook
if (process.env.FACEBOOK_APP_ID) {
    router.get("/facebook", passport_1.default.authenticate("facebook", { scope: ["email"] }));
    router.get("/facebook/callback", passport_1.default.authenticate("facebook", { session: false, failureRedirect: process.env.CLIENT_URL }), oauthSuccessHandler);
}
exports.default = router;

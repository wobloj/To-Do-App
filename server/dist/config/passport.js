"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.linkOrCreateUserFromOAuth = void 0;
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = require("passport-local");
const passport_google_oauth20_1 = require("passport-google-oauth20");
const passport_github2_1 = require("passport-github2");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const User_1 = __importDefault(require("../models/User"));
const linkOrCreateUserFromOAuth = async ({ provider, profile, email, }) => {
    var _a, _b;
    const normalizedEmail = (email || ((_b = (_a = profile.emails) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.value) || "").toLowerCase();
    if (!normalizedEmail)
        throw new Error("Brak emaila z providera");
    let user = await User_1.default.findOne({ email: normalizedEmail });
    if (!user) {
        user = await User_1.default.create({
            email: normalizedEmail,
            displayName: profile.displayName || profile.username || normalizedEmail.split("@")[0],
            accouts: [{ provider, providerId: profile.id }],
        });
        return user;
    }
    const hasProvider = user.accounts.some((a) => a.provider === provider);
    if (!hasProvider) {
        user.accounts.push({ provider, providerId: profile.id });
        await user.save();
    }
    return user;
};
exports.linkOrCreateUserFromOAuth = linkOrCreateUserFromOAuth;
passport_1.default.use(new passport_local_1.Strategy({ usernameField: 'email', passwordField: 'password', session: false }, async (email, password, done) => {
    try {
        email = email.toLowerCase();
        const user = await User_1.default.findOne({ email });
        if (!user)
            return done(null, false, { message: 'Nie znaleziono użytkownika' });
        const acct = user.accounts.find((a) => a.provider === "local");
        if (!acct || !acct.passwordHash)
            return done(null, false, { message: 'Nie znaleziono użytkownika' });
        const ok = await bcryptjs_1.default.compare(password, acct.passwordHash);
        if (!ok)
            return done(null, false, { message: 'Niepoprawne hasło' });
        return done(null, user);
    }
    catch (e) {
        return done(e);
    }
}));
if (process.env.GOOGLE_CLIENT_ID) {
    passport_1.default.use(new passport_google_oauth20_1.Strategy({
        clientID: process.env.GOOGLE_ClIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL,
    }, async (_accessToken, _refreshToken, profile, done) => {
        var _a, _b;
        try {
            const email = ((_b = (_a = profile.emails) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.value) || null;
            const user = await (0, exports.linkOrCreateUserFromOAuth)({ provider: "google", profile, email });
            done(null, user);
        }
        catch (e) {
            done(e);
        }
    }));
}
if (process.env.GITHUB_CLIENT_ID) {
    passport_1.default.use(new passport_github2_1.Strategy({
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: process.env.GITHUB_CALLBACK_URL,
        scope: ['user:email']
    }, async (_accessToken, _refreshToken, profile, done) => {
        var _a, _b;
        try {
            const email = ((_b = (_a = profile.emails) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.value) || null;
            const user = await (0, exports.linkOrCreateUserFromOAuth)({ provider: "github", profile, email });
            done(null, user);
        }
        catch (e) {
            done(e);
        }
    }));
}
exports.default = passport_1.default;

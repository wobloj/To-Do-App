"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRequired = exports.signToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const signToken = (user) => jsonwebtoken_1.default.sign({ sub: user._id.toString(), email: user.email, displayName: user.displayName }, process.env.JWT_SECRET, { expiresIn: '7d' });
exports.signToken = signToken;
const authRequired = (req, res, next) => {
    const header = req.headers.authorization || '';
    const token = header.startsWith('Bearer ') ? header.slice(7) : req.token;
    if (!token) {
        try {
            const payload = jsonwebtoken_1.default.verify(token, process.env.JWT_sECRET);
            req.auth = payload;
            next();
        }
        catch (e) {
            return res.status(401).json({ error: "Nieprawidłowy lub wygasły token" });
        }
    }
};
exports.authRequired = authRequired;

import e, { Router, Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import passport from "../config/passport";
import User from "../models/User";
import { signToken } from "../config/jwt";

const router = Router();

// helper do ustawiania cookie
const setAuthCookie = (res: Response, token: string) => {
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // w prod tylko przez https
    sameSite: "lax", // albo "none" jeśli frontend na innej domenie i https
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 dni
  });
};

// Register (local)
router.post(
  "/register",
  body("email").isEmail(),
  body("password").isLength({ min: 6 }),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { email, password, displayName } = req.body as { email: string; password: string; displayName?: string };
    const normalizedEmail = email.toLowerCase();

    let user = await User.findOne({ email: normalizedEmail });
    if (!user) {
      const passwordHash = await bcrypt.hash(password, 12);
      user = await User.create({
        email: normalizedEmail,
        displayName: displayName || normalizedEmail.split("@")[0],
        accounts: [{ provider: "local", passwordHash }],
      });
    } else {
      const hasLocal = user.accounts.some((a) => a.provider === "local");
      if (hasLocal) return res.status(409).json({ error: "Konto lokalne już istnieje dla tego emaila" });
      const passwordHash = await bcrypt.hash(password, 12);
      user.accounts.push({ provider: "local", providerId: "local" + normalizedEmail, passwordHash });
      await user.save();
    }

    const token = signToken(user);
    setAuthCookie(res, token);

    return res.status(201).json({ user: { id: user._id, email: user.email, displayName: user.displayName } });
  }
);

// Login (local)
router.post("/login", (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate("local", { session: false }, (err: any, user: any, info: any) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!user) return res.status(401).json({ error: info?.message || "Błąd logowania" });

    const token = signToken(user);
    setAuthCookie(res, token);

    return res.json({ user: { id: user._id, email: user.email, displayName: user.displayName } });
  })(req, res, next);
});

// Logout
router.post("/logout", (_req: Request, res: Response) => {
  res.clearCookie("token");
  res.json({ message: "Wylogowano" });
});

// Me (sprawdzenie zalogowania)
router.get("/me", passport.authenticate("jwt", { session: false }), (req: Request, res: Response) => {
  const user = req.user as any;
  res.json({ user: { id: user._id, email: user.email, displayName: user.displayName } });
});

// OAuth helpers
const oauthSuccessHandler: e.RequestHandler = (req, res) => {
  const token = signToken(req.user as any);
  setAuthCookie(res, token);
  res.redirect(process.env.CLIENT_URL as string); // frontend sprawdzi /auth/me
};

// Google
if (process.env.GOOGLE_CLIENT_ID) {
  router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));
  router.get(
    "/google/callback",
    passport.authenticate("google", { session: false, failureRedirect: process.env.CLIENT_URL }),
    oauthSuccessHandler
  );
}

// GitHub
if (process.env.GITHUB_CLIENT_ID) {
  router.get("/github", passport.authenticate("github", { scope: ["user:email"] }));
  router.get(
    "/github/callback",
    passport.authenticate("github", { session: false, failureRedirect: process.env.CLIENT_URL }),
    oauthSuccessHandler
  );
}

export default router;

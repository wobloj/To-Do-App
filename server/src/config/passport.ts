import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as GitHubStrategy } from "passport-github2";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import bcrypt from "bcryptjs";
import User from "../models/User";

// 🔹 helper do linkowania konta OAuth
export const linkOrCreateUserFromOAuth = async ({
  provider,
  profile,
  email,
}: {
  provider: "google" | "github";
  profile: any;
  email: string | null;
}) => {
  const normalizedEmail = (email || profile.emails?.[0]?.value || "").toLowerCase();
  if (!normalizedEmail) throw new Error("Brak emaila z providera");

  let user = await User.findOne({ email: normalizedEmail });

  if (!user) {
    user = await User.create({
      email: normalizedEmail,
      displayName:
        profile.displayName ||
        profile.username ||
        normalizedEmail.split("@")[0],
      accounts: [{ provider, providerId: profile.id }],
    });
    return user;
  }

  const hasProvider = user.accounts.some((a: any) => a.provider === provider);
  if (!hasProvider) {
    user.accounts.push({ provider, providerId: profile.id });
    await user.save();
  }
  return user;
};

// 🔹 LocalStrategy (email + hasło)
passport.use(
  new LocalStrategy(
    { usernameField: "email", passwordField: "password", session: false },
    async (email, password, done) => {
      try {
        email = email.toLowerCase();
        const user = await User.findOne({ email });
        if (!user) return done(null, false, { message: "Nie znaleziono użytkownika" });

        const acct = user.accounts.find((a: any) => a.provider === "local");
        if (!acct || !acct.passwordHash)
          return done(null, false, { message: "Brak konta lokalnego" });

        const ok = await bcrypt.compare(password, acct.passwordHash);
        if (!ok) return done(null, false, { message: "Niepoprawne hasło" });

        return done(null, user);
      } catch (e) {
        return done(e as any);
      }
    }
  )
);

// 🔹 Google OAuth
if (process.env.GOOGLE_CLIENT_ID) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        callbackURL: process.env.GOOGLE_CALLBACK_URL as string,
      },
      async (_accessToken, _refreshToken, profile, done) => {
        try {
          const email = profile.emails?.[0]?.value || null;
          const user = await linkOrCreateUserFromOAuth({ provider: "google", profile, email });
          done(null, user);
        } catch (e) {
          done(e as any);
        }
      }
    )
  );
}

// 🔹 GitHub OAuth
if (process.env.GITHUB_CLIENT_ID) {
  passport.use(
    new GitHubStrategy(
      {
        clientID: process.env.GITHUB_CLIENT_ID as string,
        clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
        callbackURL: process.env.GITHUB_CALLBACK_URL as string,
        scope: ["user:email"],
      },
      async (_accessToken: any, _refreshToken: any, profile: any, done: any) => {
        try {
          const email = profile.emails?.[0]?.value || null;
          const user = await linkOrCreateUserFromOAuth({ provider: "github", profile, email });
          done(null, user);
        } catch (e) {
          done(e as any);
        }
      }
    )
  );
}

// 🔹 JWT Strategy (dla ciasteczek)
const cookieExtractor = (req: any) => {
  if (req && req.cookies && req.cookies.token) {
    return req.cookies.token;
  }
  return null;
};

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
      secretOrKey: process.env.JWT_SECRET as string,
    },
    async (payload:any, done:any) => {
      try {
        const user = await User.findById(payload.sub);
        if (!user) return done(null, false);
        return done(null, user);
      } catch (err) {
        return done(err, false);
      }
    }
  )
);

export default passport;

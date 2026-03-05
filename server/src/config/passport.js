import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import * as authRepository from "../modules/auth/auth.repository.js";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {

        const email = profile.emails[0].value;
        const name = profile.displayName;

        let user = await authRepository.findUserByEmail(email);

        if (!user) {
          user = await authRepository.createUser(
            name,
            email,
            null // no password for google login
          );
        }

        return done(null, user);

      } catch (err) {
        done(err, null);
      }
    }
  )
);

export default passport;
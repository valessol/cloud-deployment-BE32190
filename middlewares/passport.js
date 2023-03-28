import passport from "passport";
import fs from "fs";
import { Strategy as LocalStrategy } from "passport-local";
import { compareSync } from "bcrypt";

passport.use(
  "login",
  new LocalStrategy(async (username, password, done) => {
    // verificar username
    const user = await findUser({ username });
    if (!user) return done(null, false);

    // verificar password
    const isCheckedPassword = compareSync(password, user.password);
    console.log({ isCheckedPassword });
    if (!isCheckedPassword) {
      return done(null, false);
    }

    return done(null, user);
  })
);

passport.serializeUser((user, done) => done(null, user.username));

passport.deserializeUser(async (username, done) => {
  const user = await findUser({ username });
  user && done(null, user);
});

export const findUser = async (userData) => {
  const users = await JSON.parse(
    await fs.promises.readFile("./sessions/users.json", "utf-8")
  );
  // const users = await getAllUSers();
  if (users && users.length) {
    const user = users.find((user) => user.username === userData.username);
    return user;
  }
  return null;
};

export const passportAuth = () => {
  return passport.authenticate("login", {
    failureRedirect: "/login-error",
    successRedirect: "/",
  });
};
export default passport;

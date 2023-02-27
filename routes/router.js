import express from "express";
import { items } from "../constants/formItems.js";
import { requireAuth } from "../middlewares/auth.js";
import Mongo from "../classes/MongoDbContainer.js";
import {
  existUser,
  findUser,
  registerUser,
} from "../services/credentialsService.js";
import { registerSchema } from "../schemas/registerSchema.js";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { compareSync } from "bcrypt";

const { Router } = express;
const router = Router();

//---------PASSPORT--------------//
passport.use(
  "login",
  new LocalStrategy(async (username, password, done) => {
    // verificar username
    const user = await findUser({ username });

    if (!user) return done(null, false);

    // verificar password
    const isCheckedPassword = compareSync(password, user.hash);

    if (!isCheckedPassword) return done(null, false);

    return done(null, user);
  })
);

passport.serializeUser((user, done) => done(null, user.username));

passport.deserializeUser(async (username, done) => {
  const user = await findUser({ username });
  user && done(null, user);
});
//------------------------------//

export const mongoDB = new Mongo("users", "credentials", registerSchema);
mongoDB.addCollection();

//------------------------------//
router.use(passport.initialize());
router.use(passport.session());

//-------------RAIZ-----------------//
router.get("/", requireAuth, async (req, res) => {
  res.render("form", { username: req.user.username });
});

//---------LOGIN--------------//
router.get("/login", (req, res) => {
  const isAuth = req.isAuthenticated();

  if (isAuth) return res.redirect("/");
  res.render("renderForm", items["login"]);
});

router.post(
  "/login",
  passport.authenticate("login", {
    failureRedirect: "/login-error",
    successRedirect: "/",
  })
);

//---------LOGOUT-------------//
router.get("/logout", (req, res) => {
  // const { email } = req.session.credentials;
  req.session.destroy((err) => {
    if (err) {
      res.send("Hubo un error al cerrar la sesión: " + err);
    } else {
      res.render("logout", { email: "pepito" });
    }
  });
});

//---------REGISTER--------------//

router.get("/register", (req, res) => {
  res.render("renderForm", items["register"]);
});

router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const isRegisteredUser = await existUser({ username, password });

  // redirigir a vista usuario registrado si ya lo está
  if (isRegisteredUser) return res.redirect("/register-error");

  // guardar en la DB los datos de registro
  await registerUser({ username, password });
  res.redirect("login");
});

//---------REGISTER ERROR--------------//
router.get("/register-error", (req, res) => {
  res.render("error", {
    title: "ya registrado",
    id: "go-to-register",
  });
});

//---------LOGIN ERROR--------------//
router.get("/login-error", (req, res) => {
  res.render("error", {
    title: "Las credenciales no son válidas",
    id: "go-to-login",
  });
});

export default router;

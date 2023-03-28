import express from "express";
import AuthController from "../controllers/auth.js";
import ViewsController from "../controllers/views.js";
import passport, { passportAuth } from "../middlewares/passport.js";

const router = express.Router();
const viewsController = new ViewsController();
const authController = new AuthController();
router.use(passport.initialize());
router.use(passport.session());

router.get("/", viewsController.renderHome);
router.get("/login", viewsController.renderLogin);
router.post(
  "/login",
  passport.authenticate("login", {
    failureRedirect: "/login-error",
    successRedirect: "/",
  })
);
router.get("/logout", viewsController.renderLogout);
router.get("/register", viewsController.renderRegister);
router.post("/register", authController.register);
router.get("/register-error", viewsController.renderRegisterError);
router.get("/login-error", viewsController.renderLoginError);

export default router;

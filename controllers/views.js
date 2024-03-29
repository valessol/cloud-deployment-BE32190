import { items } from "../constants/formItems.js";
import ProductsServices from "../services/products.js";
import MessagesServices from "../services/messages.js";

class ViewsController {
  constructor() {
    this.productsServices = ProductsServices;
    this.messagesServices = MessagesServices;
  }

  renderHome = async (req, res) => {
    try {
      const isAuth = req.isAuthenticated();

      if (!isAuth) return res.redirect("/login");
      res.render("form", {
        username: req.user.username,
      });
    } catch (error) {
      console.log(error);
    }
  };

  renderLogin = async (req, res) => {
    try {
      const isAuth = req.isAuthenticated();
      if (isAuth) return res.redirect("/");

      res.render("renderForm", items["login"]);
    } catch (error) {
      console.log(error);
    }
  };

  renderLogout = async (req, res) => {
    try {
      req.session.destroy((err) => {
        if (err) {
          res.send("Hubo un error al cerrar la sesión: " + err);
        } else {
          res.render("logout", { email: "pepito" });
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  renderRegister = async (req, res) => {
    try {
      res.render("renderForm", items["register"]);
    } catch (error) {
      console.log(error);
    }
  };

  renderRegisterError = async (req, res) => {
    try {
      res.render("error", {
        title: "ya registrado",
        id: "go-to-register",
      });
    } catch (error) {
      console.log(error);
    }
  };

  renderLoginError = async (req, res) => {
    try {
      res.render("error", {
        title: "Las credenciales no son válidas",
        id: "go-to-login",
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export default ViewsController;

import express from "express";
import config from "./config.js";
import authRouter from "./router/auth.js";
import messagesRouter from "./router/messages.js";
import productsRouter from "./router/products.js";
import handlebars from "express-handlebars";
import session from "express-session";
import SessionFileStore from "session-file-store";
import cluster from "cluster";
import logger from "./loggerConfig.js";
import { serverRequestLogguer } from "./middlewares/logger.js";
import { modo, getProcessData } from "./helpers/cli.js";

const FileStore = SessionFileStore(session);

if ((config.EX_MODE === "CLUSTER" || modo === "cluster") && cluster.isMaster) {
  for (let i = 0; i < cpusNumber; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker) => {
    console.log(`Worker ${worker.process.pid} died`);
  });
} else {
  const app = express();

  app.use(
    session({
      store: new FileStore({ path: "./sessions", ttl: 300, retries: 0 }),
      secret: config.SESSION_KEY,
      resave: false,
      saveUninitialized: false,
    })
  );

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static("public"));

  app.engine("handlebars", handlebars.engine());
  app.set("views", "./views");
  app.set("view engine", "handlebars");

  app.use(serverRequestLogguer);

  app.use("/", authRouter);
  app.use("/products", productsRouter);
  app.use("/messages", messagesRouter);

  app.get("/info", (req, res) => {
    const data = getProcessData();
    res.render("processData", { data });
  });

  app.get("*", (req, res) => {
    const { url, method } = req;
    logger.warn("url inválida", { url, method });
    res.redirect("/");
  });

  const PORT = config.PORT;
  app.listen(PORT, () => {
    console.log(
      `Servidor escuchando en el puerto ${PORT}: Environment: ${config.NODE_ENV}`
    );
  });
}

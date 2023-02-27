import express from "express";
import { Server as HttpServer } from "http";
import { Server as IOServer } from "socket.io";
import handlebars from "express-handlebars";
import session from "express-session";
import dotenv from "dotenv";
import MongoStore from "connect-mongo";
import router from "./routes/router.js";
import cluster from "cluster";
import {
  initializeDBItems,
  puerto,
  modo,
  cpus as cpusNumber,
} from "./helpers/index.js";
import { deploy, getProcessData } from "./helpers/cli.js";
import logger from "./loggerConfig.js";
if (process.env.NODE_ENV === "dev" || deploy === "dev") dotenv.config();

// Configuración de la sesión
const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true };
const MONGO_DATA_BASE_URL = process.env.MONGO_DATA_BASE_URL;

// ---- Configuración de los procesos del servidor para todas las rutas ----
if (
  (process.env.EX_MODE === "CLUSTER" || modo === "cluster") &&
  cluster.isMaster
) {
  for (let i = 0; i < cpusNumber; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker) => {
    console.log(`Worker ${worker.process.pid} died`);
  });
} else {
  // Configuración de express
  const app = express();
  const httpServer = new HttpServer(app);
  const io = new IOServer(httpServer);

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use(
    session({
      store: MongoStore.create({
        mongoUrl: `${MONGO_DATA_BASE_URL}test`,
        mongoOptions: advancedOptions,
        collectionName: "sessions",
      }),
      secret: "valeria",
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 60000,
      },
    })
  );

  app.use(express.static("./public"));

  app.engine("handlebars", handlebars.engine());
  app.set("views", "./views");
  app.set("view engine", "handlebars");

  //? ---- Configurar middleware para contar las peticiones al servidor
  app.use((req, res, next) => {
    const method = req.method;
    const url = req.url;
    logger.info("nueva request", { method, url });
    next();
  });

  app.use("/", router);
  app.get("/info", (req, res) => {
    const data = getProcessData();
    res.render("processData", { data });
  });

  //? ---- Definición de ruta inexistente ----
  app.get("*", (req, res) => {
    const { url, method } = req;
    logger.warn("url inválida", { url, method });
    res.redirect("/");
  });

  // Sockets
  io.on("connection", async (socket) => {
    //* Inicializar mensajes y productos
    const {
      instances,
      productsSelected,
      messagesSelected,
      compressionPercentage,
    } = await initializeDBItems();
    const { products, messages } = instances;
    let newCompressionPercentage = compressionPercentage;

    socket.emit("show-all-products", productsSelected);
    socket.emit("show-all-messages", {
      messages: messagesSelected || [],
      compression: newCompressionPercentage || 0,
    });

    socket.on("add-product", (product) => {
      console.log("producto cargado");
      products.insertValues(product);
      productsSelected = [...productsSelected, product];
      io.sockets.emit("show-all-products", productsSelected);
    });

    socket.on("add-message", async (message) => {
      console.log("mensaje recibido");

      //* Guardo el mensaje recibido en archivo
      await messages.saveOnFile([message]);
      newCompressionPercentage = messages.getCompressionPercentage();

      //* Actualizo los mensajes
      messagesSelected = await messages.readFile();

      io.sockets.emit("show-all-messages", {
        messages: messagesSelected,
        compression: newCompressionPercentage,
      });
    });
  });

  const PORT = process.env.PORT || puerto;

  httpServer.listen(PORT, () => {
    console.log(`Servidor escuchando en puerto ${PORT} - PID: ${process.pid}`);
  });
}

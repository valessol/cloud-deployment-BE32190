import express from "express";
import messages from "../controllers/messages.js";

const router = express.Router();

// class Router {
//   constructor() {
//     this.controller = messages;
//   }

//   start() {
//     router.post("/", this.controller.saveMessage);
//     return router;
//   }
// }

router.post("/", messages.saveMessage);

export default router;

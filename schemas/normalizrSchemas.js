import { schema } from "normalizr";

const authorSchema = new schema.Entity("author", {}, { idAttribute: "email" });

const messageSchema = new schema.Entity(
  "mensaje",
  { author: authorSchema },
  { idAttribute: "id" }
);

export const messagesSchema = new schema.Entity(
  "mensajes",
  {
    mensajes: [messageSchema],
  },
  { idAttribute: "id" }
);

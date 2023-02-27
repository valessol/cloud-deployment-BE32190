import { normalize, denormalize } from "normalizr";
import { messagesSchema as schema } from "../schemas/normalizrSchemas.js";
import { print } from "../utils/index.js";

export const normalizeMessageReceived = async (messagesReceived) => {
  const messagesToNormalize = {
    id: "mensajes",
    mensajes: messagesReceived,
  };

  const normalizedMessages = normalize(messagesToNormalize, schema);

  //console.log("------> Mensajes normalizados: ");
  //print(normalizedMessages);
  return normalizedMessages;
};

export const denormalizeMessages = (normalizedMessages) => {
  const denormalizedMessages = denormalize(
    normalizedMessages.result,
    schema,
    normalizedMessages.entities
  );

  //console.log("------> Mensajes denormalizados: ");
  //print(denormalizedMessages);
  return denormalizedMessages;
};

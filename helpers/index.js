import { normalizeMessageReceived, denormalizeMessages } from "./normalizr.js";
import {
  getProductFromFaker,
  getProductsFromFaker,
  getMessageFromFaker,
  getMessagesFromFaker,
} from "./faker.js";
import { puerto, modo, cpus } from "./cli.js";
import { initializeDBItems } from "./initializeDBItems.js";
initializeDBItems;
export {
  initializeDBItems,
  getProductFromFaker,
  getProductsFromFaker,
  getMessageFromFaker,
  getMessagesFromFaker,
  normalizeMessageReceived,
  denormalizeMessages,
  puerto,
  modo,
  cpus,
};

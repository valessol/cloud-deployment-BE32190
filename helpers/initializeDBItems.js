import { getMessagesFromFaker } from "./index.js";
import { FileContainer } from "../classes/FileContainer.js";
import { SQLTableContainer as TableGenerator } from "../classes/SQLTableContainer.js";
import { options as productOptions } from "../DBconfig/sqlite3.js";
import { productsColumns } from "../constants/columns.js";

export const initializeDBItems = async () => {
  let productsSelected = [];
  let messagesSelected = [];

  const products = new TableGenerator(
    productOptions,
    "products",
    productsColumns
  );

  const messages = new FileContainer("./messages.json");

  //* obtener productos de la DB si hay
  productsSelected = await products.selectAllData();

  //* obtener mensajes de la DB
  messagesSelected = await messages.readFile();

  let compressionPercentage;
  //? Descomentar hasta la línea 37 si se quiere traer mensajes desde Faker
  //* obtener los primeros mensajes de faker
  // const messagesFromFaker = await getMessagesFromFaker(5);

  // //* insertar los mensajes normalizados en la DB
  // await messages.saveOnFile(messagesFromFaker);

  // //* obtener el porcentaje de compresión
  // compressionPercentage = messages.getCompressionPercentage();

  // //* Leer los mensajes en DB (ya vienen denormalizados)
  // messagesSelected = await messages.readFile();

  return {
    instances: { products, messages },
    productsSelected,
    messagesSelected,
    compressionPercentage,
  };
};

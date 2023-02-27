import { faker } from "@faker-js/faker";
import crypto from "crypto";

faker.locale = "es";

export const getProductFromFaker = (id) => {
  return {
    id,
    title: faker.commerce.product(),
    price: faker.commerce.price(1000, 5000, 0),
    thumbnail: faker.image.fashion(),
  };
};

export const getProductsFromFaker = (quantity) => {
  let products = [];

  for (let i = 0; i < quantity; i++) {
    const id = crypto.randomUUID();
    const product = getProductFromFaker(id);
    products = [...products, product];
  }

  return products;
};

export const getMessageFromFaker = () => {
  const nombre = faker.name.firstName();
  const apellido = faker.name.lastName();
  const alias = nombre + apellido;
  const email = `${nombre}-${apellido}@mail.com`;
  const edad = Math.floor(Math.random() * 70 + 18);

  return {
    author: {
      email,
      nombre,
      apellido,
      edad,
      alias,
      avatar: faker.image.avatar(),
    },
    text: faker.lorem.text(),
  };
};

export const getMessagesFromFaker = (quantity) => {
  let messages = [];

  for (let i = 0; i < quantity; i++) {
    const msg = getMessageFromFaker();
    messages = [...messages, msg];
  }

  return messages;
};

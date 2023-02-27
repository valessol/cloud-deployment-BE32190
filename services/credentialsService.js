import { hash as getHash, genSalt } from "bcrypt";
import { mongoDB } from "../routes/router.js";

export const getAllUSers = async () => {
  const usersDataResponse = await mongoDB.getAllElements();
  return await usersDataResponse.data;
};

export const existUser = async (userData) => {
  const usersData = await getAllUSers();

  if (usersData && usersData.length) {
    const isRegisteredUser = usersData.some(
      (user) => user.username === userData.username
    );
    return isRegisteredUser;
  }
  return false;
};

export const findUser = async (userData) => {
  const usersData = await getAllUSers();
  if (usersData && usersData.length) {
    const user = usersData.find((user) => user.username === userData.username);
    return user;
  }
  return null;
};

export const registerUser = async (userData) => {
  const { username, password } = userData;

  // encriptar password
  const salt = await genSalt(10);
  const hash = await getHash(password, salt);

  // guardar en la base de datos de mongo
  return await mongoDB.uploadElement({ username, hash });
};

import fs from "fs";
import { hash as getHash, genSalt } from "bcrypt";

class Controller {
  constructor() {}

  register = async (req, res) => {
    try {
      const { username, password } = req.body;
      const isRegisteredUser = await this.existUser({ username, password });

      // redirigir a vista usuario registrado si ya lo está
      if (isRegisteredUser) return res.redirect("/register-error");

      // guardar en la DB los datos de registro
      await this.registerUser({ username, password });
      res.redirect("login");
    } catch (error) {
      console.log(error);
    }
  };

  existUser = async (userData) => {
    const usersData = JSON.parse(
      await fs.promises.readFile("./sessions/users.json", "utf-8")
    );

    if (usersData && usersData.length) {
      const isRegisteredUser = usersData.some(
        (user) => user.username === userData.username
      );
      return isRegisteredUser;
    }
    return false;
  };

  registerUser = async (userData) => {
    const { username, password } = userData;

    // encriptar password
    const salt = await genSalt(10);
    const hash = await getHash(password, salt);

    // guardar en la base de datos de mongo
    //return await mongoDB.uploadElement({ username, hash });
    console.log(JSON.stringify({ username, password: hash }, null, "\t"));
    await fs.promises.appendFile(
      "./sessions/users.json",
      JSON.stringify({ username, password: hash }, null, "\t")
    );
  };
}

export default Controller;

import MessagesBaseDAO from "./messagesDAO.js";
import mongodb from "mongodb";
import mongoose from "mongoose";
import config from "../../../config.js";
import messagesSchema from "../../schemas/messagesSchema.js";

const { MongoClient, ObjectId } = mongodb;

class MessagesDAOMongo extends MessagesBaseDAO {
  constructor(database, collection) {
    super();
    (async () => {
      console.log("Conectando a la base de datos de Mongo DB...");

      const connection = mongoose.connect(config.MONGO_DATA_BASE_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });

      // const db = connection.db(database);
      // this._collection = db.collection(collection);
      this.model = mongoose.model(collection, messagesSchema);

      console.log("Base de datos conectada");
    })();
  }

  getMessages = async (_id) => {
    try {
      if (_id) {
        const message = await this.model.findOne({ _id: ObjectId(_id) });
        return [message];
      } else {
        const messages = await this.model.find({});
        return messages;
      }
    } catch (err) {
      console.log(err);
    }
  };

  saveProduct = async (message) => {
    try {
      await this.model.insertOne(message);
      return message;
    } catch (err) {
      console.log(err);
    }
  };
}

export default MessagesDAOMongo;

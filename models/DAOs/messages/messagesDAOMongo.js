import MessagesBaseDAO from "./messagesDAO.js";
import mongoose from "mongoose";
import config from "../../../config.js";
import messagesSchema from "../../schemas/messagesSchema.js";
import { ObjectId } from "mongodb";
import { convertToDTO } from "../../DTOs/messagesDTO.js";

class MessagesDAOMongo extends MessagesBaseDAO {
  static instance;

  constructor(collection) {
    super();
    (async () => {
      console.log("Conectando a la base de datos de Mongo DB...");

      mongoose.connect(config.MONGO_DATA_BASE_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });

      this.model = mongoose.model(collection, messagesSchema);

      console.log("Base de datos conectada");
    })();
  }

  static getInstance(collection) {
    if (!this.instance) {
      this.instance = new MessagesDAOMongo(collection);
    }
    return this.instance;
  }

  getMessages = async () => {
    try {
      const messages = await this.model.find({});
      return convertToDTO(messages);
    } catch (err) {
      console.log(err);
    }
  };

  getMessageById = async (_id) => {
    try {
      const message = await this.model.findById(_id);
      return convertToDTO(message);
    } catch (err) {
      console.log(err);
    }
  };

  saveMessage = async (message) => {
    try {
      await this.model.create({ ...message });
      const messages = await this.getMessages();
      const savedMessage = messages.find(
        (mes) => mes.email === message.email && mes.message === message.message
      );
      return convertToDTO(savedMessage);
    } catch (err) {
      console.log(err);
    }
  };

  updateMessage = async (id, data) => {
    try {
      const _id = new ObjectId(id);
      await this.model.updateOne({ _id }, { ...data });
      const message = await this.getMessageById(id);
      return convertToDTO(message);
    } catch (err) {
      console.log(err);
    }
  };

  deleteMessage = async (id) => {
    try {
      const messageToDelete = await this.getMessageById(id);
      if (messageToDelete) {
        const _id = new ObjectId(id);
        await this.model.findOneAndDelete({ _id });
        return convertToDTO(messageToDelete);
      }
      throw new Error("Mensaje no encontrado");
    } catch (err) {
      console.log(err);
    }
  };
}

export default MessagesDAOMongo.getInstance("messages");

import config from "../config.js";
import MessagesDAOFactory from "../models/DAOs/messages/messagesDAOFactory.js";
import Messages from "../models/model/messages.js";

class MessagesServices {
  static instance;

  constructor() {
    this.messagesDAO = MessagesDAOFactory.get(config.PERSISTENCE);
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new MessagesServices();
    }
    return this.instance;
  }

  getMessages = async () => {
    let messages = await this.messagesDAO.getMessages();
    return messages;
  };

  getMessageById = async (id) => {
    let messages = await this.messagesDAO.getMessageById(id);
    return messages;
  };

  saveMessageService = async (message) => {
    const newMessage = MessagesServices.setDefaultAttr(message);

    if (!MessagesServices.validateMessage(newMessage)) {
      return new Error("El formato de mensaje no es correcto");
    }
    return await this.messagesDAO.saveMessage(newMessage);
  };

  updateMessage = async (id, data) => {
    try {
      const updatedMessage = await this.messagesDAO.updateMessage(id, data);
      return updatedMessage;
    } catch (err) {
      console.log(err);
    }
  };

  deleteMessage = async (id) => {
    try {
      const messageToDelete = await this.messagesDAO.deleteMessage(id);
      return messageToDelete;
    } catch (err) {
      console.log(err);
    }
  };

  static setDefaultAttr(message) {
    let newMessage = { ...message, timestamp: new Date() };

    if (!newMessage.avatar)
      newMessage.avatar = `https://res.cloudinary.com/dagruxu0y/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1680376006/Avatars/3824210_l3s1ht.jpg`;

    if (!newMessage.alias) newMessage.alias = "Anónimo";

    return newMessage;
  }

  static validateMessage(message) {
    try {
      Messages.validate(message);
      return true;
    } catch (error) {
      throw new Error("El mensaje no es válido", error);
    }
  }
}

export default MessagesServices.getInstance();

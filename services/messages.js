import config from "../config.js";
import MessagesDAOFactory from "../models/DAOs/messages/messagesDAOFactory.js";
import Messages from "../models/model/messages.js";

class MessagesServices {
  constructor() {
    this.messagesDAO = MessagesDAOFactory.get(config.PERSISTENCE);
  }

  getMessages = async () => {
    let messages = await this.messagesDAO.getMessages();
    return messages;
  };

  saveMessageService = async (message) => {
    if (!MessagesServices.validateMessage(message)) {
      return new Error("El formato de mensaje no es correcto");
    }
    return await this.messagesDAO.saveMessage(message);
  };

  static validateMessage(message) {
    try {
      Messages.validate(message);
      return true;
    } catch (error) {
      throw new Error("El mensaje no es válido");
    }
  }
}

export default MessagesServices;

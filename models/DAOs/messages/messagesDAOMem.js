import MessagesBaseDAO from "./messagesDAO.js";
import messageDTO from "../../DTOs/messagesDTO.js";

class MessagesDAOMem extends MessagesBaseDAO {
  static instance;

  constructor() {
    super();
    this.messages = [];
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new MessagesDAOMem();
    }
    return this.instance;
  }

  getMessages = async () => {
    return this.messages;
  };

  saveMessage = async (message) => {
    try {
      let id = this.getNextId();
      let timestamp = Date.now();
      let savedMessage = messageDTO(message, id, timestamp);
      this.messages.push(savedMessage);
      return savedMessage;
    } catch (error) {
      console.log("Error al guardar el mensaje");
      return {};
    }
  };
}

export default MessagesDAOMem.getInstance();

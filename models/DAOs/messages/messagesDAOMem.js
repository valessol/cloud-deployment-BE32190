import MessagesBaseDAO from "./messagesDAO.js";
import messageDTO from "../../DTOs/messagesDTO.js";

class MessagesDAOMem extends MessagesBaseDAO {
  constructor() {
    super();
    this.messages = [];
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

export default MessagesDAOMem;

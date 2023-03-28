import MessagesDAOMem from "./messagesDAOMem.js";
import MessagesDAOMongo from "./messagesDAOMongo.js";

class MessagesDAOFactory {
  static get(type) {
    const persistenceContainer = {
      memory: MessagesDAOMem,
      //file: new MessagesDAOFile(),
      mongo: MessagesDAOMongo,
    };
    return new persistenceContainer[type]("ecommerce", "messages");
  }
}

export default MessagesDAOFactory;

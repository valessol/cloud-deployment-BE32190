import MessagesDAOMem from "./messagesDAOMem.js";
import MessagesDAOMongo from "./messagesDAOMongo.js";

class MessagesDAOFactory {
  static get(type) {
    const persistenceContainer = {
      memory: MessagesDAOMem,
      mongo: MessagesDAOMongo,
    };
    return persistenceContainer[type];
  }
}

export default MessagesDAOFactory;

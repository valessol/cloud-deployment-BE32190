import crypto from "crypto";
class MessagesBaseDAO {
  getNextId() {
    try {
      const id = crypto.randomUUID();
      return id;
    } catch (err) {
      throw new Error(err);
    }
  }
}

export default MessagesBaseDAO;

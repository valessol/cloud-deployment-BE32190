import MessagesServices from "../services/messages.js";

class Controller extends MessagesServices {
  constructor() {
    super();
    this.messages = this.getMessages();
  }

  saveMessage = async (req, res) => {
    try {
      let message = req.body;
      await this.saveMessageService(message);
      res.redirect("/");
    } catch (error) {
      console.log(error);
    }
  };
}

const messages = new Controller();
export default messages;

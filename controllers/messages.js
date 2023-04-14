import MessagesServices from "../services/messages.js";

class Controller {
  constructor() {
    this.services = MessagesServices;
  }

  saveMessage = async (req, res) => {
    try {
      let message = req.body;
      await this.services.saveMessageService(message);
      res.redirect("/");
    } catch (error) {
      console.log(error);
    }
  };

  getAllMessages = async (req, res) => {
    try {
      const messages = await this.services.getMessages();
      res.status(200).json(messages);
    } catch (error) {
      console.log(error);
    }
  };

  getMessageByIdService = async (req, res) => {
    try {
      const { id } = req.params;
      console.log("messages controller", req);
      const products = await this.services.getMessageById(id);
      res.status(200).json(products);
    } catch (error) {
      console.log(error);
    }
  };
}

const messages = new Controller();
export default messages;

import Joi from "joi";

class Messages {
  constructor(message) {
    this.message = message;
  }

  static validate(message) {
    const ProductSchema = Joi.object({
      email: Joi.string().required(),
      name: Joi.string().required(),
      surname: Joi.string(),
      age: Joi.string(),
      alias: Joi.string(),
      avatar: Joi.string(),
      message: Joi.string().required(),
    });

    const { error } = ProductSchema.validate(message);
    if (error) {
      throw error;
    }
  }
}

export default Messages;

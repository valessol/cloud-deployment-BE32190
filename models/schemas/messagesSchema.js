import mongoose from "mongoose";

const schema = {
  name: { type: String, required: true, maxLength: 100 },
  surname: { type: String, maxLength: 500 },
  age: { type: String, maxLength: 2 },
  alias: { type: String, maxLength: 500 },
  avatar: { type: String, maxLength: 500 },
  email: { type: String, required: true, maxLength: 500 },
  message: { type: String, required: true, maxLength: 1000 },
};

const messagesSchema = new mongoose.Schema({ ...schema });

export default messagesSchema;

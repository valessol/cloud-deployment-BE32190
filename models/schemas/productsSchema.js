import mongoose from "mongoose";

const schema = {
  title: String,
  price: String,
  thumbnail: String,
};

const productsSchema = new mongoose.Schema({ ...schema });

export default productsSchema;

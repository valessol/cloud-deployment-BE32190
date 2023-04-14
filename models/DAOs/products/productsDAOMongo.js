import ProductsBaseDAO from "./productsDAO.js";
import mongoose from "mongoose";
import config from "../../../config.js";
import productsSchema from "../../schemas/productsSchema.js";
import { ObjectId } from "mongodb";
import { convertToDTO } from "../../DTOs/productsDTO.js";

class ProductsDAOMongo extends ProductsBaseDAO {
  static instance;

  constructor(collection) {
    super();
    (async () => {
      console.log("Conectando a la base de datos de Mongo DB...");

      mongoose.connect(config.MONGO_DATA_BASE_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });

      this.model = mongoose.model(collection, productsSchema);

      console.log("Base de datos conectada");
    })();
  }

  static getInstance(collection) {
    if (!this.instance) {
      this.instance = new ProductsDAOMongo(collection);
    }
    return this.instance;
  }

  getProducts = async () => {
    try {
      const products = await this.model.find({});
      return convertToDTO(products);
    } catch (err) {
      console.log(err);
    }
  };

  getProductById = async (_id) => {
    try {
      const product = await this.model.findById(_id);
      return convertToDTO(product);
    } catch (err) {
      console.log(err);
    }
  };

  saveProduct = async (product) => {
    try {
      await this.model.create({ ...product });
      const products = await this.getProducts();
      const savedProduct = products.find(
        (prod) => prod.title === product.title
      );
      return convertToDTO(savedProduct);
    } catch (err) {
      console.log(err);
    }
  };

  updateProduct = async (id, data) => {
    try {
      const _id = new ObjectId(id);
      await this.model.updateOne({ _id }, { ...data });
      const product = await this.getProductById(id);
      return convertToDTO(product);
    } catch (err) {
      console.log(err);
    }
  };

  deleteProduct = async (id) => {
    try {
      const productToDelete = await this.getProductById(id);
      if (productToDelete) {
        const _id = new ObjectId(id);
        await this.model.findOneAndDelete({ _id });
        return convertToDTO(productToDelete);
      }
      return undefined;
    } catch (err) {
      console.log(err);
    }
  };
}

export default ProductsDAOMongo.getInstance("products");

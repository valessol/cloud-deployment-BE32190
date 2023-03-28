import ProductsBaseDAO from "./productsDAO.js";
import mongoose from "mongoose";
import mongodb from "mongodb";
import config from "../../../config.js";
import productsSchema from "../../schemas/productsSchema.js";

const { ObjectId } = mongodb;

class ProductsDAOMongo extends ProductsBaseDAO {
  constructor(database, collection) {
    super();
    (async () => {
      console.log("Conectando a la base de datos de Mongo DB...");

      const connection = mongoose.connect(config.MONGO_DATA_BASE_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });

      // const db = connection.db(database);
      // this._collection = db.collection(collection);
      this.model = mongoose.model(collection, productsSchema);

      console.log("Base de datos conectada");
    })();
  }

  getProducts = async (_id) => {
    try {
      if (_id) {
        const product = await this.model.findOne({ _id: ObjectId(_id) });
        return [product];
      } else {
        //console.log(this.model);
        const products = await this.model.find({});
        //console.log(products);
        return products;
      }
    } catch (err) {
      console.log(err);
    }
  };

  saveProduct = async (product) => {
    try {
      // await this.model.insertOne(product);
      await this.model.create({ ...product });
      return product;
    } catch (err) {
      console.log(err);
    }
  };
}

export default ProductsDAOMongo;

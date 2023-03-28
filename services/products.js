import config from "../config.js";
import ProductsDAOFactory from "../models/DAOs/products/productsDAOFactory.js";
import Products from "../models/model/products.js";

class ProductsServices {
  constructor() {
    this.productsDAO = ProductsDAOFactory.get(config.PERSISTENCE);
  }

  getProducts = async () => {
    let products = await this.productsDAO.getProducts();
    return products;
  };

  saveProductService = async (product) => {
    if (!ProductsServices.validateProduct(product)) {
      return new Error("El formato de producto no es correcto");
    }
    return await this.productsDAO.saveProduct(product);
  };

  static validateProduct(product) {
    try {
      Products.validate(product);
      return true;
    } catch (error) {
      throw new Error("El producto no es válido");
    }
  }
}

export default ProductsServices;

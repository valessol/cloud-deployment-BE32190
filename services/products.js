import config from "../config.js";
import ProductsDAOFactory from "../models/DAOs/products/productsDAOFactory.js";
import Products from "../models/model/products.js";

class ProductsServices {
  static instance;

  constructor() {
    this.productsDAO = ProductsDAOFactory.get(config.PERSISTENCE);
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new ProductsServices();
    }
    return this.instance;
  }

  getProducts = async () => {
    let products = await this.productsDAO.getProducts();
    return products;
  };

  getProductById = async (id) => {
    let products = await this.productsDAO.getProductById(id);
    return products;
  };

  saveProductService = async (product) => {
    const newProduct = ProductsServices.setDefaultAttr(product);

    if (!ProductsServices.validateProduct(newProduct)) {
      return new Error("El formato de producto no es correcto");
    }
    return await this.productsDAO.saveProduct(newProduct);
  };

  updateProduct = async (id, data) => {
    try {
      const updatedProduct = await this.productsDAO.updateProduct(id, data);
      return updatedProduct;
    } catch (err) {
      console.log(err);
    }
  };

  deleteProduct = async (id) => {
    try {
      const productToDelete = await this.productsDAO.deleteProduct(id);
      return productToDelete;
    } catch (err) {
      console.log(err);
    }
  };

  static setDefaultAttr(product) {
    let newProduct = { ...product, timestamp: new Date() };

    if (!newProduct.thumbnail)
      newProduct.thumbnail =
        "https://res.cloudinary.com/dagruxu0y/image/upload/v1680385409/Avatars/img_ckql0i.png";

    return newProduct;
  }

  static validateProduct(product) {
    try {
      Products.validate(product);
      return true;
    } catch (error) {
      throw new Error("El producto no es válido");
    }
  }
}

export default ProductsServices.getInstance();

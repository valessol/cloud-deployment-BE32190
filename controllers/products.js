import ProductsServices from "../services/products.js";

class Controller {
  constructor() {
    this.services = ProductsServices;
  }

  saveProduct = async (req, res) => {
    try {
      let product = req.body;
      await this.services.saveProductService(product);
      res.status(201).redirect("/");
    } catch (error) {
      console.log(error);
    }
  };

  getAllProducts = async (req, res) => {
    try {
      const products = await this.services.getProducts();
      res.status(200).json(products);
    } catch (error) {
      console.log(error);
    }
  };

  getProductById = async (req, res) => {
    try {
      const { id } = req.params;
      const products = await this.services.getProductById(id);
      res.status(200).json(products);
    } catch (error) {
      console.log(error);
    }
  };
}

const products = new Controller();

export default products;

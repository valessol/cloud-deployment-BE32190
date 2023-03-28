import ProductsServices from "../services/products.js";

class Controller extends ProductsServices {
  constructor() {
    super();
    this.products = this.getProducts();
  }

  saveProduct = async (req, res) => {
    try {
      let product = req.body;
      await this.saveProductService(product);
      res.redirect("/");
    } catch (error) {
      console.log(error);
    }
  };
}

const products = new Controller();

export default products;

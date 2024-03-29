import ProductsBaseDAO from "./productsDAO.js";
import productDTO from "../../DTOs/productsDTO.js";

class ProductsDAOMem extends ProductsBaseDAO {
  static instance;

  constructor() {
    super();
    this.products = [];
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new ProductsDAOMem();
    }
    return this.instance;
  }

  getProducts = async () => {
    return this.products;
  };

  saveProduct = async (product) => {
    try {
      let id = this.getNextId();
      let timestamp = Date.now();
      let savedProduct = productDTO(product, id, timestamp);
      this.products.push(savedProduct);
      return savedProduct;
    } catch (error) {
      console.log("Error al guardar el producto");
      return {};
    }
  };
}

export default ProductsDAOMem.getInstance();

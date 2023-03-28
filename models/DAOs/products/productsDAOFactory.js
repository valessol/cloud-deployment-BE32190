import ProductsDAOMem from "./productsDAOMem.js";
import ProductsDAOMongo from "./productsDAOMongo.js";

class ProductsDAOFactory {
  static get(type) {
    const persistenceContainer = {
      memory: ProductsDAOMem,
      //file: new ProductsDAOFile(),
      mongo: ProductsDAOMongo,
    };
    return new persistenceContainer[type]("ecommerce", "products");
  }
}

export default ProductsDAOFactory;

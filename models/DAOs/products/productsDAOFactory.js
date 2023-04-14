import ProductsDAOMem from "./productsDAOMem.js";
import ProductsDAOMongo from "./productsDAOMongo.js";

class ProductsDAOFactory {
  static get(type) {
    const persistenceContainer = {
      memory: ProductsDAOMem,
      mongo: ProductsDAOMongo,
    };
    return persistenceContainer[type];
  }
}

export default ProductsDAOFactory;

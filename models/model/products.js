import Joi from "joi";

class Products {
  constructor(product) {
    this.product = product;
  }

  static validate(product) {
    const ProductSchema = Joi.object({
      title: Joi.string().required(),
      price: Joi.number().required(),
      thumbnail: Joi.string(),
    });

    const { error } = ProductSchema.validate(product);
    if (error) {
      throw error;
    }
  }
}

export default Products;

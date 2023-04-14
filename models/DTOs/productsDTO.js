export default class ProductDTO {
  constructor({ title, price, thumbnail, timestamp, _id }) {
    this._id = _id;
    this.title = title;
    this.price = price;
    this.thumbnail = thumbnail;
    this.timestamp = timestamp;
  }
}

export function convertToDTO(data) {
  if (Array.isArray(data)) {
    return data.map((d) => new ProductDTO(d));
  } else {
    return new ProductDTO(data);
  }
}

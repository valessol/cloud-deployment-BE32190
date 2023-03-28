function productDTO(product, id, timestamp) {
  return {
    ...product,
    id,
    timestamp,
  };
}

export default productDTO;

export const createContext = (products, messages) => {
  const hasProducts = products.length;
  const hasMessages = messages.length;

  return {
    products: hasProducts
      ? products.map((product) => {
          return {
            title: product.title,
            price: product.price,
            thumbnail: product.thumbnail,
          };
        })
      : [],
    messages: hasMessages
      ? messages.map((mes) => {
          return {
            avatar: mes.avatar | "",
            alias: mes.alias | "anónimo",
            message: mes.message,
          };
        })
      : [],
  };
};

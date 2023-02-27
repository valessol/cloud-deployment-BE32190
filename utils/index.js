import util from "util";

export const print = (objeto) => {
  console.log(util.inspect(objeto, false, 12, true));
};

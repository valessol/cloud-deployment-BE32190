import logger from "../loggerConfig.js";

export const serverRequestLogguer = (req, res, next) => {
  const method = req.method;
  const url = req.url;
  logger.info("nueva request", { method, url });
  next();
};

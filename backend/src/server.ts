import app from "./app";
import { env } from "./config/env";
import { logger } from "./config/logger";

app.listen(env.PORT, () => {
  logger.info("=================================");
  logger.info("🚀 TaskFlow Backend Started");
  logger.info(`Environment : ${env.NODE_ENV}`);
  logger.info(`Port        : ${env.PORT}`);
  logger.info(`Health URL  : http://localhost:${env.PORT}/health`);
  logger.info("=================================");
});
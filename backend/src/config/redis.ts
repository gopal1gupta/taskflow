import { createClient } from "redis";
import { env } from "./env";
import { logger } from "./logger";

export const redisClient = createClient({
  url: env.REDIS_URL,
});

redisClient.on("connect", () => {
  logger.info("🔄 Connecting to Redis...");
});

redisClient.on("ready", () => {
  logger.info("✅ Redis Connected Successfully");
});

redisClient.on("error", (error) => {
  logger.error("❌ Redis Connection Error", error);
});

redisClient.on("end", () => {
  logger.warn("⚠️ Redis Connection Closed");
});

export async function connectRedis() {
  await redisClient.connect();
}
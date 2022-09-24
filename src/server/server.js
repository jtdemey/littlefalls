import express from "express";
import morgan from "morgan";
import logger from "./logger.js";
import router from "./routes.js";
import generateDb from "../db/scripts/generate.js";

const dev = process.env.NODE_ENV !== "production";
const port = process.env.SERVER_PORT || 3001;

(async () => {
  try {
    const app = express();
    app.set("view engine", "ejs");
    app.use(morgan("short"));
    app.use("/", router);
		app.use(express.static(dev ? "src" : "dist"));
    process.on("SIGINT", () => process.exit());
    app.listen(port, err => {
      if (err) throw err;
      generateDb();
      logger.info(
        `> Ready on localhost:${port} - env ${
          dev ? "development" : "production"
        }`
      );
    });
  } catch (e) {
    logger.error(e);
    process.exit(1);
  }
})();

import Database from "better-sqlite3";
import logger from "../server/logger.js";

const db = new Database("littlefalls.db", { verbose: logger.info });

export default db;

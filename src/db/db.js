import Database from "better-sqlite3";
import logger from "../server/logger.js";
import { removeNewlines } from "../scripts/utils.js";

const db = new Database("littlefalls.db", { verbose: logger.info });

export const executeTransaction = (query, entity) => {
  const statement = db.prepare(removeNewlines(query));
  const transaction = db.transaction(() => statement.run(entity));
  transaction();
};

export default db;

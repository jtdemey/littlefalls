import Database from "better-sqlite3";
import logger from "../server/logger.js";
import { removeNewlines } from "../scripts/utils.js";

const db = new Database("littlefalls.db", { verbose: logger.info });
db.pragma("journal_mode = WAL");

export const executeTransaction = (query, entity) => {
  const statement = db.prepare(removeNewlines(query));
  const transaction = db.transaction(() =>
    entity ? statement.run(entity) : statement.run()
  );
  transaction();
};

export default db;

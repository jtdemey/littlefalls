import { executeTransaction } from "../db.js";
import { removeNewlines } from "../../scripts/utils.js";

const generate = () => {
  const createQueries = [
    removeNewlines(
      `CREATE TABLE IF NOT EXISTS update_timestamps (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        schedule VARCHAR(64) NULL
      )`
    ),
    removeNewlines(
      `CREATE TABLE IF NOT EXISTS schedule (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        date VARCHAR(64) NOT NULL,
        agenda VARCHAR(256) NOT NULL
      )`
    )
  ];
  createQueries.forEach(query => executeTransaction(query));
};

export default generate;

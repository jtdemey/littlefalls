import db from "../db.js";
import { removeNewlines } from "../../scripts/utils.js";

const generate = () => {
  const query = db.prepare(
    removeNewlines(
      `CREATE TABLE IF NOT EXISTS schedule (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        date VARCHAR(64) NOT NULL,
        agenda VARCHAR(256) NOT NULL
      )`
    )
  );
  const transaction = db.transaction(() => query.run());
  transaction();
};

export default generate;

import db from "../../db.js";
import { removeNewlines } from "../../scripts/utils.js";

const create = ({ date, agenda }) => {
  const query = db.prepare(
    removeNewlines(`INSERT INTO schedule (date, agenda) VALUES (?, ?)`)
  );
  const transaction = db.transaction(() => query.run(date, agenda));
  transaction();
};

export default create;

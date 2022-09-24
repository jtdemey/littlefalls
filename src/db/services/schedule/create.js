import { executeTransaction } from "../../db.js";

const create = ({ date, agenda }) =>
  executeTransaction(
    `INSERT INTO schedule (date, agenda) VALUES (@date, @agenda)`,
    { date, agenda }
  );

export default create;

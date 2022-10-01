import { executeTransaction } from "../../db.js";

const set = schedule => {
  executeTransaction(`DELETE FROM schedule`);
  const placeholders = schedule.map((row, i) =>
    i === schedule.length - 1 ? "(?, ?)" : "(?, ?), "
  );
  const values = schedule.reduce((acc, next) => {
    return acc.concat([next.date]).concat([next.agenda]);
  }, []);
  executeTransaction(
    `INSERT INTO schedule (date, agenda) VALUES ${placeholders.join("")}`,
    values
  );
};

export default set;

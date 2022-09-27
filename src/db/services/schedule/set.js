import { executeTransaction } from "../../db.js";

const set = schedule => {
  executeTransaction(`DELETE FROM schedule`);
  const values = schedule.map((row, i) => i === schedule.length ? "(?, ?)" : "(?, ?), ");
  console.log(values);
  executeTransaction(
    `INSERT INTO schedule (date, agenda) VALUES ${values}`,
    schedule.map(row => ([row.date, row.agenda]))
  );
  /*
  schedule.forEach(scheduleRow => {
    executeTransaction(
      `INSERT INTO schedule (date, agenda) VALUES (@date, @agenda)`,
      { ...scheduleRow }
    );
  });
  */
};

export default set;

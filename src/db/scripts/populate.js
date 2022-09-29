import { executeTransaction } from "../db.js";

const schedule = [
  { date: "October 9", agenda: "[edit agenda]" },
  { date: "October 16", agenda: "[edit agenda]" },
  { date: "October 23", agenda: "[edit agenda]" },
  { date: "October 30", agenda: "[edit agenda]" },
  { date: "November 6", agenda: "[edit agenda]" },
  { date: "November 13", agenda: "[edit agenda]" },
  { date: "November 20", agenda: "[edit agenda]" },
  { date: "November 27", agenda: "[edit agenda]" },
  { date: "December 4", agenda: "[edit agenda]" }
];

const populate = () => {
  schedule.forEach(record => executeTransaction(
    `INSERT INTO schedule (date, agenda) VALUES (@date, @agenda)`,
    record
  ));
};

export default populate;

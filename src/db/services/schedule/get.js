import db from "../../db.js";

const get = () => {
  const query = db.prepare(`SELECT id, date, agenda FROM schedule LIMIT 10`);
  return query.all();
};

export default get;

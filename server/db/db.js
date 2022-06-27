const { Pool } = require("pg");
const pool = new Pool({
  user: "postgres",
  password: "Iub.nivek907",
  host: "localhost",
  port: "5432",
  database: "discordcode",
});

module.exports = {
  async query(text, params) {
    const start = Date.now();
    const res = await pool.query(text, params);
    const duration = Date.now() - start;
    console.log("executed query", { text, duration, rows: res.rowCount });
    return res;
  },
  pool,
};

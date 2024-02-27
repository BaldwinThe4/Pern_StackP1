const Pool = require("pg");

const pool = require("pg").pool;
const pool = new Pool({
  user: "postgres",
  password: "Sanskar@123",
  host: "localhost",
  port: 5432,
  database: "perntodo",
});

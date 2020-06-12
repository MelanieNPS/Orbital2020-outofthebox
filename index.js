const app = require("express")();
const {Pool} = require('pg')
require("dotenv").config()

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  },
  max : 10,
  connectionTimeoutMillis : 0,
  idleTimeoutMillis : 0,
})

app.get("/",(req,res)=>res.sendFile(`${__dirname}`/index.html))
app.get("/", async (req,res) => {

  const results = await pool.query("SELECT * FROM sudoku")
  console.table (results.rows)

  res.send({"rows": results.rows, "method": "pool"})
})

var port=process.env.PORT|| 9000;

app.listen(port, () => console.log("Listening on port 9000"))
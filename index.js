const app = require("express")();
const {Pool} = require('pg')
require("dotenv").config()
var connectionString= "postgres://fivlromeqlnjrg:edd0b21807802ec53e54e005a67ffc8f01d5f8efc80db81a890614b0a77ee3b7@ec2-54-246-87-132.eu-west-1.compute.amazonaws.com:5432/dasj74f4uq4dcp"

const pool = new Pool({
  connectionString: connectionString,
  ssl: {
    rejectUnauthorized: false
  },
  max : 10,
  connectionTimeoutMillis : 0,
  idleTimeoutMillis : 0,
})

app.get("/all", async (req,res) => {

  const results = await pool.query("SELECT * FROM sudoku")
  console.table (results.rows)

})

app.listen( 9000, () => console.log("Listening on port 9000"))
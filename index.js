const express = require("express");
const app=express();
const path = require('path');
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

app.get("/", async (req,res) => {

  const results = await pool.query("SELECT * FROM sudoku")
  console.table (results.rows)

  res.send({"rows": results.rows, "method": "pool"})
})

//app.get("/",(req,res)=>res.sendFile(`${__dirname}/index.html`))
app.use( '/' , express.static(path.join(__dirname ,'/..' ,'public')))

var port=process.env.PORT|| 9000;

app.listen(port, () => console.log("Listening on port 9000"))
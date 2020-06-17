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

app.use(express.static('public'))

app.get("/", async (req,res) => {
  res.sendFile(__dirname + '/index.html')
})

app.get("/puzzleString", async(req, res) => {
  const puzzle = await readOneRow();
  res.setHeader ("content-type", "application/json")
  res.send(JSON.stringify(puzzle))
})

let difficulty = 'Easy'
app.change("/difficulty", async (req,res) => {
  difficulty = req.body.difficulty;
  res.setHeader("content-type", "application/json")
  res.send(JSON.stringify(result))
})


async function readOneRow(difficulty){
  try {
    const results = await pool.query("SELECT * FROM sudoku WHERE difficulty='"+difficulty+"' ORDER BY random() LIMIT 1");
    return results.rows;
  } 
  catch(e){
    return [];
  }
}

//app.get("/",(req,res)=>res.sendFile(`${__dirname}/index.html`))


var port=process.env.PORT|| 9000;

app.listen(port, () => console.log("Listening on port 9000"))
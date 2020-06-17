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

var difficulty = "Easy"
app.post("/puzzleString", async (req,res) => {
  let result = {}
  try{
    difficulty = req.body.difficulty;
    result.success = true;
  } 
  catch(e){
    result.success = false;
  }
  finally {
    res.setHeader("content-type", "application/json")
    res.send(JSON.stringify(result))
  }
})


async function readOneRow(){
  const results = await pool.query("SELECT * FROM sudoku ORDER BY random() LIMIT 1");
  try {
    switch(difficulty){
      case "Easy":
        results = await pool.query("SELECT * FROM sudoku WHERE difficulty='Easy' ORDER BY random() LIMIT 1");
        break;
      
       case "Medium" :
        results = await pool.query("SELECT * FROM sudoku WHERE difficulty='Medium' ORDER BY random() LIMIT 1");
        break;

       case "Hard" :
        results = await pool.query("SELECT * FROM sudoku WHERE difficulty='Hard' ORDER BY random() LIMIT 1");
        break;

       case "Expert" :
        results = await pool.query("SELECT * FROM sudoku WHERE difficulty='Expert' ORDER BY random() LIMIT 1"); 
        break;
    }
    return results.rows;
  } 
  catch(e){
    return [];
  }
}

//app.get("/",(req,res)=>res.sendFile(`${__dirname}/index.html`))


var port=process.env.PORT|| 9000;

app.listen(port, () => console.log("Listening on port 9000"))
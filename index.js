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
app.post("/difficulty", async (req,res) => {
  let result = {}
  try{
    const reqJson = req.body;
    await updateDifficulty(reqJson.difficulty)
    result.success = true;
  } 
  catch(e){
    result.success = false
  }
  finally {
    res.setHeader("content-type", "application/json")
    res.send(JSON.stringify(result));
  }
})

const results = await pool.query("SELECT * FROM sudoku ORDER BY random() LIMIT 1");
async function readOneRow(){
  try {
    return results.rows;
  } 
  catch(e){
    return [];
  }
}

async function updateDifficulty(difficultyLevel){
  try{
    switch(difficultyLevel){
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
    return true;
  }
  catch(e){
    return false;
  }
}

//app.get("/",(req,res)=>res.sendFile(`${__dirname}/index.html`))


var port=process.env.PORT|| 9000;

app.listen(port, () => console.log("Listening on port 9000"))
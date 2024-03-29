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
app.get("/tips", async (req,res) => {
  res.sendFile(__dirname + '/tips.html')
})

//For Classic Sudoku Puzzles
app.get("/puzzleStringEasy", async(req, res) => {
  const puzzle = await readOneRowEasy();
  res.setHeader ("content-type", "application/json")
  res.send(JSON.stringify(puzzle))
})
app.get("/puzzleStringMedium", async(req, res) => {
  const puzzle = await readOneRowMedium();
  res.setHeader ("content-type", "application/json")
  res.send(JSON.stringify(puzzle))
})
app.get("/puzzleStringHard", async(req, res) => {
  const puzzle = await readOneRowHard();
  res.setHeader ("content-type", "application/json")
  res.send(JSON.stringify(puzzle))
})
app.get("/puzzleStringExpert", async(req, res) => {
  const puzzle = await readOneRowExpert();
  res.setHeader ("content-type", "application/json")
  res.send(JSON.stringify(puzzle))
})
app.get("/puzzleStringRandom", async(req, res) => {
  const puzzle = await readOneRowRandom();
  res.setHeader ("content-type", "application/json")
  res.send(JSON.stringify(puzzle))
})


async function readOneRowEasy(){
  try {
    const results = await pool.query("SELECT * FROM sudoku WHERE difficulty='Easy' ORDER BY random() LIMIT 1"); 
    return results.rows;
  } 
  catch(e){
    return [];
  }
}
async function readOneRowMedium(){
  try {
    const results = await pool.query("SELECT * FROM sudoku WHERE difficulty='Medium' ORDER BY random() LIMIT 1"); 
    return results.rows;
  } 
  catch(e){
    return [];
  }
}
async function readOneRowHard(){
  try {
    const results = await pool.query("SELECT * FROM sudoku WHERE difficulty='Hard' ORDER BY random() LIMIT 1"); 
    return results.rows;
  } 
  catch(e){
    return [];
  }
}
async function readOneRowExpert(){
  try {
    const results = await pool.query("SELECT * FROM sudoku WHERE difficulty='Expert' ORDER BY random() LIMIT 1"); 
    return results.rows;
  } 
  catch(e){
    return [];
  }
}
async function readOneRowRandom(){
  try {
    const results = await pool.query("SELECT * FROM sudoku ORDER BY random() LIMIT 1"); 
    return results.rows;
  } 
  catch(e){
    return [];
  }
}



//For Hyper Sudoku Puzzles
app.get("/puzzleStringEasyHyper", async(req, res) => {
  const puzzle = await readOneRowEasyHyper();
  res.setHeader ("content-type", "application/json")
  res.send(JSON.stringify(puzzle))
})
app.get("/puzzleStringMediumHyper", async(req, res) => {
  const puzzle = await readOneRowMediumHyper();
  res.setHeader ("content-type", "application/json")
  res.send(JSON.stringify(puzzle))
})
app.get("/puzzleStringHardHyper", async(req, res) => {
  const puzzle = await readOneRowHardHyper();
  res.setHeader ("content-type", "application/json")
  res.send(JSON.stringify(puzzle))
})
app.get("/puzzleStringExpertHyper", async(req, res) => {
  const puzzle = await readOneRowExpertHyper();
  res.setHeader ("content-type", "application/json")
  res.send(JSON.stringify(puzzle))
})


async function readOneRowEasyHyper(){
  try {
    const result = await pool.query("SELECT * FROM sudoku WHERE hyper_difficulty='Easy' ORDER BY random() LIMIT 1")
    return result.rows;
  } catch (e) {
    return [];
  }
}
async function readOneRowMediumHyper(){
  try {
    const result = await pool.query("SELECT * FROM sudoku WHERE hyper_difficulty='Medium' ORDER BY random() LIMIT 1")
    return result.rows;
  } catch (e) {
    return [];
  }
}

async function readOneRowHardHyper(){
  try {
    const result = await pool.query("SELECT * FROM sudoku WHERE hyper_difficulty='Hard' ORDER BY random() LIMIT 1")
    return result.rows;
  } catch (e) {
    return [];
  }
}

async function readOneRowExpertHyper(){
  try {
    const result = await pool.query("SELECT * FROM sudoku WHERE hyper_difficulty='Expert' ORDER BY random() LIMIT 1")
    return result.rows;
  } catch (e) {
    return [];
  }
}



//app.get("/",(req,res)=>res.sendFile(`${__dirname}/index.html`))


var port=process.env.PORT|| 9000;

app.listen(port, () => console.log("Listening on port 9000"))
const { Client } = require('pg')
require("dotenv").config()
var connectionString= "postgres://fivlromeqlnjrg:edd0b21807802ec53e54e005a67ffc8f01d5f8efc80db81a890614b0a77ee3b7@ec2-54-246-87-132.eu-west-1.compute.amazonaws.com:5432/dasj74f4uq4dcp"

const client = new Client({
  connectionString: connectionString,
  ssl: {
    rejectUnauthorized: false
  }
})

client.connect()
.then(()=>console.log("connected"))
.catch(e=>console.log(e))
.finally(()=>client.end())
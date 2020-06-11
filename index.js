const { Client } = require('pg')
require("dotenv").config()

const client = new Client({
  connectionString: process.env.DATABASE_URL
})

client.connect()
.then(()=>console.log("connected"))
.catch(e=>console.log(e))
.finally(()=>client.end())
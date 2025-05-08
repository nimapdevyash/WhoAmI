require("dotenv").config() ;
const express = require("express");
const  connectToDatabase = require("./db")

connectToDatabase() ;

const app = express() ;

app.listen(process.env.PORT , () => console.log("app is live on " , process.env.PORT))
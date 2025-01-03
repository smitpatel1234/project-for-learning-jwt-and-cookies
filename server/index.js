const express = require('express')
const mongoose = require('mongoose');
const cors = require("cors")
const bcrypt = require("bcrypt")
const app = express()
const cookieParser = require('cookie-parser');
app.use(cookieParser());
const port=3001
app.use(cors({
   origin: 'http://localhost:3000', 
   credentials: true
}));
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const  connectDB = require( './mydb/connectdb.js');
connectDB();
app.use('/',require('./router/register.js'));
app.use('/',require('./router/login.js'));
app.use('/',require('./router/users.js'))


 app.listen(port,()=>{
    console.log(`Example app listening on port ${port}`)
 });

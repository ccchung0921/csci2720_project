const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

const PORT = process.env.PORT || 5005

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cors())

const dbURL = "mongodb+srv://cluster0.pedjk.mongodb.net/chung" ;

//Config of my db 
// var options = {
//             user: 'ccchung0921',
//             pass: 'a54255875221',
//             dbName: 'chung'
//         }

mongoose.connect(dbURL,options);

var db = mongoose.connection

db.on('error',console.error.bind(console,'connection error'));

db.once('open',()=>{
    console.log('connection success');
})


app.listen(PORT,()=>{
    console.log(`server run at ${PORT}`)
})



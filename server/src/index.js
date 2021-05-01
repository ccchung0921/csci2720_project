const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');
const moment = require('moment');
const bcrypt = require('bcryptjs');

const app = express();

const PORT = process.env.PORT || 5005

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cors())

const dbURL = "mongodb+srv://cluster0.pedjk.mongodb.net/chung" ;

var options = {
            user: 'ccchung0921',
            pass: 'a54255875221',
            dbName: 'chung'
        }

mongoose.connect(dbURL,options);

var db = mongoose.connection

db.on('error',console.error.bind(console,'connection error'));

db.once('open',()=>{
    console.log('connection success');
})

var Place = require('./models/Place');
var User = require('./models/user');

app.get('/places',async (req,res)=>{
    try{
        const places = await Place.find();
        console.log(places)
        res.status(200).json(places);
    }catch(err){
        res.status(404).send({message: err.message})
    }
})

app.get('/waitingtime',async (req,res)=>{
    try{
        const {data} = await axios.get('https://www.ha.org.hk/opendata/aed/aedwtdata-en.json')
        console.log(data)
        res.status(200).json(data);
    }catch(err){
        res.status(404).send({message: err.message})
    }
})

app.get('/historicaltime/:name',async(req,res)=>{
    try{
        let {name}  = req.params
        let url = 'https://api.data.gov.hk/v1/historical-archive/get-file?url=http%3A%2F%2Fwww.ha.org.hk%2Fopendata%2Faed%2Faedwtdata-en.json&time=';
        let pastURLs = [];
        for (let i = 0 ; i < 10 ; ++i){
            const now = new Date(Date.now());
            const previousHour = now.setHours(now.getHours() - (i+1))
            const formatPrevious = moment(previousHour).format('YYYYMMDD-HHmm')
            const formatDate = formatPrevious.substring(0,formatPrevious.length-2).concat('15')
            pastURLs.push(url+formatDate);
        }
         const promises = pastURLs.map(async(url)=>{
             const {data} = await axios.get(url);
             const waitTimes = data.waitTime;
             const filterName = waitTimes.filter((time) => time.hospName === name).map(({topWait}) => topWait.match(/\d/g).join(""))[0];
             return parseInt(filterName) 
        })
        Promise.all(promises).then((data)=> res.status(200).json(data));
    }catch(err){
        res.status(404).send({message: err.message})
    }
})

app.get('/historicaldays/:name',async(req,res)=>{
    try{
        let {name}  = req.params
        let url = 'https://s3-ap-southeast-1.amazonaws.com/historical-resource-archive/';
        let timeURL = '/http%253A%252F%252Fwww.ha.org.hk%252Fopendata%252Faed%252Faedwtdata-en.json/';
        let pastURLs = [];
        for (let i = 0 ; i < 7 ; ++i){
            const now = new Date(Date.now());
            const previousDays = now.setDate(now.getDate() - (i+1));
            const formatPreviousHour = moment(previousDays).format('YYYY/MM/DD');
            const formatPreviousTime = moment(previousDays).format('HHmm');
            const formatHour = parseInt(formatPreviousTime.substring(0,2));
            const formatMinutes = parseInt(formatPreviousTime.substring(2,4));
            let time = Math.floor(formatMinutes/15)*15
            time = time < 10 ? '0'+ time.toString() : time.toString()
            pastURLs.push(url+formatPreviousHour+timeURL+formatHour+time);
        }
         const promises = pastURLs.map(async(url)=>{
             const {data} = await axios.get(url);
             const waitTimes = data.waitTime;
             const filterName = waitTimes.filter((time) => time.hospName === name).map(({topWait}) => topWait.match(/\d/g).join(""))[0];
             return parseInt(filterName) 
        })
        Promise.all(promises).then((data)=> res.status(200).json(data));
    }catch(err){
        res.status(404).send({message: err.message})
    }
})

app.post('/signup',async(req,res) =>{
    const {username,password,confirmPassword,fullName} = req.body;
    console.log(username)
    try{
        const existingUser = await User.findOne({username});
        if (existingUser) return res.status(401).json({message:"User already exist"});
        if (password !== confirmPassword) return res.status(402).json({messgae:'Password does not match'});
        const hashedPassword = await bcrypt.hash(password,12);
        const result = await User.create({
            username,
            password: hashedPassword,
            fullName,
        })
        res.status(200).json(result);
    }catch(err){
        console.log(err)
        res.status(505).json({message: "Something went wrong"});
    }
})



app.post('/signin',async(req,res) =>{
    const {username,password} = req.body;
    try{
        const existingUser = await User.findOne({username});
        if (!existingUser) return res.status(401).json({message:"User does not exist"});
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordCorrect) return res.status(400).json({message:"Invalid Credentials"});
        res.status(200).json(existingUser);
    }catch(err){
        console.log(err)
        res.status(500).json({message: "Something went wrong"});
    }
})


app.listen(PORT,()=>{
    console.log(`server run at ${PORT}`)
})



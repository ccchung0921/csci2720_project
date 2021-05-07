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
var Comment = require('./models/Comment');

app.post('/place', async(req,res) =>{
    const place = req.body;
    const newPlace = new Place(place);
    try{
     await newPlace.save()
     res.status(201).json(newPlace)
    }catch(err){
     res.status(404).json({messgae: err.message});
    }
})

app.patch('/place/:id', async(req,res) =>{
    try{
        const {id:_id} = req.params;
        const accept = req.body;
        if (! mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No request with that id');
        const updatedPlace = await Place.findByIdAndUpdate(_id, {...accept, _id},{new:true});
        res.json(updatedPlace);
    }catch(err){
        res.status(404).json({message: err.message});
    }
})


app.delete('/place/:id', async(req,res)=>{
    const {id} = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No place with that id');
    await Place.findByIdAndRemove(id);
    res.json({message: 'Place deleted successfully'});
})


app.get('/places',async (req,res)=>{
    try{
        const places = await Place.find();
        res.status(200).json(places);
    }catch(err){
        res.status(404).send({message: err.message})
    }
})

app.get('/users',async(req,res)=>{
    try{
        const users = await User.find();
        res.status(200).json(users);
    }catch(err){
        res.status(404).send({message: err.message})
    }
})

app.post('/user', async(req,res) =>{
    const {username,password,confirmPassword,fullName,isAdmin} = req.body;
    try{
        const existingUser = await User.findOne({username});
        if (existingUser) return res.status(401).json({message:"User already exist"});
        if (password !== confirmPassword) return res.status(402).json({messgae:'Password does not match'});
        const hashedPassword = await bcrypt.hash(password,12);
        const result = await User.create({
            username,
            password: hashedPassword,
            fullName,
            isAdmin
        })
        res.status(200).json(result);
    }catch(err){
        console.log(err)
        res.status(505).json({message: "Something went wrong"});
    }
})

app.patch('/user/:id', async(req,res) =>{
    try{
        const {id:_id} = req.params;
        let update = req.body;
        if ("password" in update){
            const hashedPassword = await bcrypt.hash(update.password,12);
            update = {...update,password: hashedPassword};
        }
        if (! mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No request with that id');
        const updatedUser= await User.findByIdAndUpdate(_id, {...update, _id},{new:true});
        res.json(updatedUser);
    }catch(err){
        res.status(404).json({message: err.message});
    }
})

app.delete('/user/:id', async(req,res)=>{
    const {id} = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No place with that id');
    await User.findByIdAndRemove(id);
    res.json({message: 'Place deleted successfully'});
})

app.get('/waitingtime',async (req,res)=>{
    try{
        const {data} = await axios.get('https://www.ha.org.hk/opendata/aed/aedwtdata-en.json')
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
            const formatHour = formatPreviousTime.substring(0,2);
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
        console.log(err)
        res.status(404).send({message: err.message})
    }
})

app.post('/signup',async(req,res) =>{
    const {username,password,confirmPassword,fullName} = req.body;
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

app.get('/favourite/:id',async(req,res)=>{
    try{
        const {id} = req.params;
        const places = await User.findById(id).populate({path:'favourite_places',model:Place});
        res.status(200).json(places);
    }catch(err){
        console.log(err)
        res.status(404).json({message:err.message})
    }
})

app.post('/favourite/add/:id',async(req,res)=>{
    try{
        const {id:_id} = req.params;
        const {placeId} = req.body;
        if ( !mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No request with that id');
        const update = await User.findByIdAndUpdate(_id, {$push:{favourite_places : placeId}}, {new:true}).populate({path:'favourite_places',model:Place});
        res.status(200).json(update);
    }catch(err){
        console.log(err)
        res.status(404).json({message: err.message});
    }
})

app.post('/favourite/remove/:id',async(req,res)=>{
    try{
        const {id:_id} = req.params;
        const {placeId} = req.body;
        if ( !mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No request with that id');
        const update = await User.findByIdAndUpdate(_id, {$pull:{favourite_places : placeId}}, {new:true}).populate({path:'favourite_places',model:Place});
        res.status(200).json(update);
    }catch(err){
        console.log(err)
        res.status(404).json({message: err.message});
    }
})

app.get('/comment/place/:id',async(req,res)=>{
    try{
        const {id:_id} = req.params;
        if (! mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No request with that id');
        const comments = await Comment.find({"place":_id}).populate({path:'place',model:Place}).populate({path:'creator',model:User}).sort({"createdAt": -1 }).exec();
        res.status(200).json(comments)
    }catch(err){
        console.log(err)
        res.status(404).json({message: err.message})
    }
})

app.get('/user/:id',async(req, res) =>{
    try{
        const {id} = req.params;
        const user = await User.findById(id);
        if(!user) return res.status(404).json({message:"User does not exist."});
        res.status(200).json(user);
    }catch(err){
        res.status(500).json({message:"Something went wrong."});
    }
})


app.get('/comment/user/:id',async(req,res)=>{
    try{
        const {id:_id} = req.params;
        if (! mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No request with that id');
        const comments = await Comment.find({"creator":_id}).populate({path:'place',model:Place}).populate({path:'creator',model:User}).sort({"createdAt": -1 }).exec();
        res.status(200).json(comments)
    }catch(err){
        console.log(err)
        res.status(404).json({message: err.message})
    }
})


app.post('/comment',async(req,res)=>{
    const comment = req.body;
    const newComment = new Comment(comment);
    try{
        await newComment.save().then(async(c) =>res.status(201).json(await c.populate({path:'creator',model:User}).execPopulate()))
    }catch(err){
        console.log(err)
        res.status(404).json({messgae: err.message})
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



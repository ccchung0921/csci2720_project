var mongoose = require('mongoose');

var UserSchema = mongoose.Schema({
username: { type: String, required: true,
unique: true },
password: { type: String, required: true },
fullName:{type:String,required:true},
favourite_places: { type: [{type:mongoose.Schema.Types.ObjectId,ref:"places"}],default:[] },
role: {type:String, required:true, default:"user"},
},{collection:'user'});


module.exports = mongoose.model('user',UserSchema);
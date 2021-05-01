var mongoose = require('mongoose');

var UserSchema = mongoose.Schema({
username: { type: String, required: true,
unique: true },
password: { type: String, required: true },
favourite_places: { type: [{type:mongoose.Schema.Types.ObjectId,ref:"places"}]  }
});


module.exports = mongoose.model('user',UserSchema);
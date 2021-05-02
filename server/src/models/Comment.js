var mongoose = require('mongoose');

var CommentSchema = mongoose.Schema({
creator: {type: mongoose.Schema.Types.ObjectId, ref: 'User' ,required: true},
place: {type: mongoose.Schema.Types.ObjectId, ref: 'places' ,required:true},
content: { type: String, required: true },
createdAt:{
    type: Date,
    required:true
}
},{collection:'comments'});


module.exports = mongoose.model('comment', CommentSchema);

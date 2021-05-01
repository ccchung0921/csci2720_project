var mongoose = require('mongoose');

var CommentSchema = mongoose.Schema({
comment_id: { type: String, required: true,
unique: true },
user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
place: { type: mongoose.Schema.Types.ObjectId, ref: 'places' },
content: { type: String, required: true }
},{collection:'comments'});


module.exports = mongoose.model('comment', CommentSchema);

var mongoose = require('mongoose');

var Schema = mongoose.Schema

var PlaceSchema = new Schema({
    name: { type: String, required: true,unique: true },
    longitude: { type: Number },
    latitude: { type: Number },
    waiting_time: { type: Number, required: true }
    });

module.exports = mongoose.model('places', PlaceSchema);
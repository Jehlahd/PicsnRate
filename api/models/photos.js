var mongoose = require('mongoose');

var PictureSchema = new mongoose.Schema({
    pictures: [{
        photo: String,
        lat: Number,
        lng: Number,
        votes: Number
    }]
});

module.exports = mongoose.model('Picture', PictureSchema);
var Picture = require('../models/photos.js');

exports.getPicture = function (req, res) {
    Picture.findOne({}, function (err, pictures) {
        if (err) {
            return res.send(err);
        }
        if (!pictures) {
            return res.send("No pictures");
        }
        //console.log(pictures);
        return res.send(pictures);
    })
}

exports.getPictureCoords = function (req, res) {
    Picture.findOne({}, function (err, pictures) {
        if (err) {
            return res.send(err);
        }
        if (!pictures) {
            return res.send("No pictures");
        }
        //console.log(pictures);
        var resCoords = {
            latLng: []
        };
        pictures.pictures.forEach(function (coords) {
            resCoords.latLng.push({
                id: coords._id,
                latitude: coords.lat,
                longitude: coords.lng
            });
        })
        return res.send(resCoords);
    })
}

exports.upvote = function (req, res) {
    Picture.findOne({}, function (err, pictures) {
        if (err) {
            return res.send(err);
        }
        if (!pictures) {
            return res.send("No pictures");
        }
        //console.log(pictures);
        console.log("id:" + req.body.id);
        pictures.pictures.forEach(function (coords) {
            //console.log(coords);
            if (req.body.id == coords._id) {

                console.log("jouge");
                ++coords.votes;
            }
            pictures.save();
        })
        return res.send();
    })
}

exports.postPicture = function (req, res) {
    var picture = req.body;
    console.log(picture);
    Picture.update({}, {
        $push: {
            pictures: picture
        }
    }, {
        upsert: true
    }, function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log("Successfully added");
        }
    });
}
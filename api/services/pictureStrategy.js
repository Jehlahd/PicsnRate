var Picture = require('../models/photos.js');

exports.getPicture = function (req, res) {
    Picture.findOne({}, function (err, pictures) {
        if (err) {
            return res.send(err);
        }
        if (!pictures) {
            return res.send("No pictures");
        }
        console.log(pictures);
        return res.send(pictures);
    })
}

exports.postPicture = function (req, res) {
    var picture = req.body.picture;
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
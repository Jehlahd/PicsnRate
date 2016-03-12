var Picture = require('../models/photos.js');

exports.postPicture = function (req, res) {
    var picture = req.body.picture;
    /*Picture.find({}, function (err, found) {
        if (err) {
            return res.send(err);
        }

        if (found) {
            console.log("found, so update: " + found);

            found.pictures.push(picture);
            found.save();
        } else {
            var newFactor = new Picture();
            newFactor.push(picture);
            console.log("create new factor");
            newFactor.save();
        }
    });*/
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
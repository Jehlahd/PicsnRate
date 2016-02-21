var User = require('../models/user');

exports.getUser = function (req, res) {
    User.findById(req.query.user_id, function (err, user) {
        if (err)
            res.send(err);
        res.json(user);
    });
};

exports.updateUser = function (req, res) {

    User.findById(req.body.user_id, function (err, user) {
        if (err)
            res.send(err);
        if (user) {
            if (req.body.updatedUser.userName != "") {
                console.log("test " + req.body.updatedUser.userName);
                user.displayName = req.body.updatedUser.userName;
            }
            if (req.body.updatedUser.email != "") {
                user.email = req.body.updatedUser.email;
            }

            user.km = req.body.updatedUser.km;
            user.save(function (err) {});
            res.send('ok');
        }
    });
};
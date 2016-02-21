var jwt = require('jwt-simple');
var moment = require('moment');

module.exports = function (user, res) {
    console.log("createSendToken");
    var payload = {
        sub: user.id,
        exp: moment().add(10, 'days').unix()
    };
    console.log(payload.sub);
    var token = jwt.encode(payload, "shhh..");
    console.log(token);
    res.status(200).send({
        user: user.toJSON(),
        token: token
    });
};
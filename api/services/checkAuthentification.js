/**
 * Created by Vincent on 29/08/2015.
 */
var jwt = require('jwt-simple');
module.exports = function(req, res, next) {
    if (!req.headers.authorization)
    {
        return res.status(401).send(
            {message: 'You are not authorized'}
        );
    }

    var token = req.headers.authorization.split(' ')[1];
    var payload = jwt.decode(token,'shhh..');

    if (!payload.sub)
    {
        return res.status(401).send({message: 'Authentification failed'});
    }
    next();
};
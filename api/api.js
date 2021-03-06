/**
 * Created by Vincent on 04/08/2015.
 */
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var jwt = require("jwt-simple");
var passport = require("passport");
var LocalStrategy = require("./services/localStrategy.js");
var facebookAuth = require('./services/facebookAuth.js');
var googleAuth = require('./services/googleAuth.js')
var createSendToken = require('./services/jwt.js');
var jobs = require('./services/jobs.js');
var emailVerification = require('./services/emailVerification.js');
var userController = require('./services/user.js')
var pictureController = require('./services/pictureStrategy.js');

var app = express();

app.use(bodyParser.json());
app.use(passport.initialize());

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Credentials', 'true');

    res.header('Access-Control-Allow-Origin', '*');

    //res.header('Access-Control-Allow-Origin', 'http://localhost:9000');

    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');

    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    next();

});

passport.use('local-register', LocalStrategy.register);
passport.use('local-login', LocalStrategy.login);

app.post('/register', passport.authenticate('local-register'), LocalStrategy.setUserName, function (req, res) {
    createSendToken(req.user, res);

});

app.get('/auth/verifyEmail', emailVerification.handler);

app.get('/jobs', jobs);

app.post('/login', passport.authenticate('local-login'), function (req, res) {
    createSendToken(req.user, res);
});

app.post('/auth/google', googleAuth);

app.post('/auth/facebook', facebookAuth);


app.get('/user', userController.getUser);

app.put('/user', userController.updateUser);

app.post('/photo', pictureController.postPicture);
app.get('/photo', pictureController.getPicture);
app.put('/photo/votes', pictureController.upvote);
app.get('/coords', pictureController.getPictureCoords);
/*app.put('/user', function (req, res) {
    console.log("req " + req.body.user_id);
    res.send("ok");
});*/


mongoose.connect('mongodb://localhost/picsnrate');

var server = app.listen(3000, function () {
    console.log('api listening on ', server.address().port);
});
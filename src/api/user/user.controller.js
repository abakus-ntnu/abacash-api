'use strict';

var User = require('./user.model');
var System = require('../system/system.model');
var passport = require('passport');
var config = require('../../config/environment');
var mailer = require('../../components/mailer/mailer');
var jwt = require('jsonwebtoken');

var validationError = function(res, err) {
  return res.json(422, err);
};

var randomString = function(length) {
  return Math.round((Math.pow(36, length + 1) - Math.random() * Math.pow(36, length))).toString(36).slice(1);
}

/**
 * Get list of users
 * restriction: 'admin'
 */
exports.index = function(req, res) {
  User.find({}, '-salt -hashedPassword', function (err, users) {
    if(err) return res.send(500, err);
    res.json(200, users);
  });
};

exports.new = function(req, res) {
    console.log(req);
  System.find({}, 'name -_id', function (err, systems) {
    if(err) return res.send(500, err);
    res.json(200, {systems: systems, userRoles: config.userRoles});
  });
};

/**
 * Invite a new user
 */
exports.inviteUser = function (req, res, next) {
  var newUser = new User(req.body);
  newUser.meta.status = 'invited';
  newUser.meta.invite = randomString(14);
  newUser.password = "invitePassword";
  newUser.save(function(err, user) {
    if(err) { return validationError(res, err); }
    mailer.invite(user);
    return res.json(201);
  });
};

/**
 * Get a invite 
 */
exports.getInvite = function(req, res, next) {
  User.findOne({'meta.invite': req.params.id},function (err, user) {
    if(err) { return validationError(res, err); }
    if (!user) { return res.json(422, {'message': 'This user does not exist'})}
    if (user.meta.status != 'invited') { return res.json(422, {'message': 'This user has already signed up'})}
    return res.json(200, user.profile);
  });
};

/**
 * 
 */
exports.restore = function(req, res, next){
  User.findOne({'email': req.body.email},function (err, user) {
    if(err) { return validationError(res, err); }
    if (!user) { return res.json(422, {'message': 'This user does not exist'})}
    user.meta.restore = randomString(14);
    var date = new Date();
    user.meta.restoreExpires = new Date(date.getTime() + 15*60000);
    user.save(function(err, user) {
      if (err) return validationError(res, err);
      mailer.restore(user);
      res.send(200);
    });
      
    return res.json(200, user.profile);
  });
};


/**
 * 
 */
exports.getRestore = function(req, res, next){
  User.findOne({'meta.restore': req.params.id}, function (err, user) {
    if (err) return next(err);
    if (!user) return res.send(401);
    var date = new Date();
    if(date < user.meta.restoreExpires){
      res.json(user.profile);
    }else{
      res.json(422, {'message': 'This ticket has expired'})  
    }
  });
};


/**
 *  
 */
exports.reset = function(req, res, next){
  User.findById(req.body.user._id, function (err, user) {
    if(err) return res.send(500, err);
    user.password = req.body.newPassword;
    user.save(function(err, user) {
        if (err) return validationError(res, err);
        res.send(200);
      });
  });
}

/**
 * Redeem an invite
 */
exports.invite = function(req, res, next) {
  User.findById(req.params.id, function (err, user) {
    if (err) return next(err);
    if (!user) return res.send(401);
      user.meta.status = 'user';
      user.password = req.body.password;
      user.name = req.body.name;
      user.email = req.body.email;
      user.save(function(err, user) {
        if (err) return validationError(res, err);
        var token = jwt.sign({_id: user._id }, config.secrets.session, { expiresInMinutes: 60*5 });
        res.json({ token: token });
      });
  });
};

/**
 * Get a single user
 */
exports.show = function (req, res, next) {
  var userId = req.params.id;

  User.findById(userId, function (err, user) {
    if (err) return next(err);
    if (!user) return res.send(401);
    res.json(user.profile);
  });
};

/**
 * Deletes a user
 * restriction: 'admin'
 */
exports.destroy = function(req, res) {
  User.findByIdAndRemove(req.params.id, function(err, user) {
    if(err) return res.send(500, err);
    return res.send(204);
  });
};

/**
 * Change a users password
 */
exports.changePassword = function(req, res, next) {
  var userId = req.user._id;
  var oldPass = String(req.body.oldPassword);
  var newPass = String(req.body.newPassword);

  User.findById(userId, function (err, user) {
    if(user.authenticate(oldPass)) {
      user.password = newPass;
      user.save(function(err) {
        if (err) return validationError(res, err);
        res.send(200);
      });
    } else {
      res.send(403);
    }
  });
};

/**
 * Get my info
 */
exports.me = function(req, res, next) {
  var userId = req.user._id;
  User.findOne({
    _id: userId
  }, '-salt -hashedPassword', function(err, user) { // don't ever give out the password or salt
    if (err) return next(err);
    if (!user) return res.json(401);
    res.json(user);
  });
};

/**
 * Authentication callback
 */
exports.authCallback = function(req, res, next) {
  res.redirect('/');
};

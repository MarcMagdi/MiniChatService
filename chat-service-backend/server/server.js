'use strict';

/**
 * Project Phase I: Mini Chat Service
 * Created by Marc Magdi on Friday 5/05/2017.
 */

var loopback = require('loopback');
var boot = require('loopback-boot');
var async = require('async');
var logger = require('morgan');
var threadsTable = {};
var app = module.exports = loopback();
app.use(logger('dev'));

app.start = function() {
  app.async = async;
  app.threadsTable = threadsTable;

  // start the web server
  return app.listen(function() {
    app.emit('started');
    var baseUrl = app.get('url').replace(/\/$/, '');
    console.log('Web server listening at: %s', baseUrl);
    if (app.get('loopback-component-explorer')) {
      var explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
  });
};

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function(err) {
  if (err) throw err;

  // start the server if `$ node server.js`
  if (require.main === module) {
    app.io = require('socket.io')(app.start());
    // app.start();
    app.io.on('connection', function(socket) {
      socket.emit('sessionId', {id: socket.id});
      app.models.UserModel.findById(socket.handshake.query.id, function(err, user) {
            if (user) {
              var userData = {};
              userData.username = user.username;
              userData.id = user.id;
              user.updateAttribute("online", "true", function(err, instance) {
                // send to all users except the sender
                socket.broadcast.emit('user', {type:'user-online', instance: userData});
              });
            }
        });

      socket.on('disconnect', function() {
        app.models.UserModel.findById(socket.handshake.query.id, function(err, user) {
          if (user) {
            var userData = {};
            userData.username = user.username;
            userData.id = user.id;
            user.updateAttribute("online", "false", function(err, instance) {
              app.io.emit('user', {type:'user-offline', instance: userData});
            });
          }
        });

        for (var key in threadsTable) {
          var userId = socket.id;
          unregisterUser(userId, key);
        }
        // console.log('user disconnected');
      });

      socket.on('register-thread', function(data) {
        var threadId = data.threadId;
        var userId = socket.id;
        if (!threadsTable[threadId]) {
          threadsTable[threadId] = [];
        }
        threadsTable[threadId].push(userId);
      });

      socket.on('unregister-thread', function() {
        var threadId = socket.handshake.query.id;
        var userId = socket.id;
        unregisterUser(userId, threadId);
      });

      function unregisterUser(userId, threadKey) {
        var index = threadsTable[threadKey].indexOf(userId);

        if (index > -1) {
          threadsTable[threadKey].splice(index, 1);
        }
      }

    });
  }
});

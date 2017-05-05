'use strict';

module.exports = function(Message) {

  /**.
   * notify connected user to the sent message
   */
  Message.observe('after save', function (ctx, next) {
    var io = Message.app.io;
    if (ctx.isNewInstance) {
      var type = 'new-message';
      var threadsTable = Message.app.threadsTable;
      for (var user in threadsTable[ctx.instance.threadId]) {
        io.sockets.connected[threadsTable[ctx.instance.threadId][user]].emit('message', {type:type, instance: ctx.instance});
      }
    }

    next();
  }); // after save.
};

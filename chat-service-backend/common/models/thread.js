'use strict';

module.exports = function(Thread) {
  /**.
   * get list of the threads for a specific user with last message as preview.
   * @param id the user id
   * @param cb callback function
   */
  Thread.preview = function(id, cb) {
    Thread.find({include: ['messages' , 'userOne', 'userTwo'],
      where: { or: [ { 'userOne': id }, { 'userTwo': id } ], "messages": { "neq":  {} }
    }}, function(err, threads) {
      if (threads.length == 0) {
        cb(null, threads);
      } else {
        var length = threads.length;
        var spliced = 0;
        threads.forEach(function callback(currentValue, index, array) {
          currentValue.messages.findOne({order: 'date DESC'}, function (err, message) {
            if (message) {
              currentValue.preview = message.toJSON();
            } else {
              array.splice(index - spliced, 1); // don't return an empty conversation
              spliced++;
            }
            returnValue(index == length - 1, threads);
          });
        });
      }
    });

    function returnValue(finished, threads) {
      if (finished) {
        delete threads.messages;
        cb(null, threads);
      }
    }
  };

  /**.
   * Get a thread between two users, create a new one if there is no exist
   * @param id the if of the first user
   * @param id2 the id of the second user
   * @param cb callback function
   */
  Thread.specific_user = function(id, id2, cb) {
    Thread.findOne({include: ['messages' , 'userOne', 'userTwo'],
      where: { or: [ {and: [ { 'userOne': id2 }, { 'userTwo': id } ]}, {and: [ { 'userOne': id }, { 'userTwo': id2 } ]} ]
      }}, function(err, thread) {

      if(thread != null) {
        cb(null, thread);
      } else {
        Thread.create({"userOne": id , "userTwo" : id2}, function (err, instance) {
          Thread.findById(instance.id, {include: ['messages' , 'userOne', 'userTwo']}, function (err, thread) {
            cb(null, thread);
          });
        })
      }
    });
  };

  Thread.remoteMethod('specific_user', {
    accepts: [
      {arg: 'id', type: 'number', required: true},
      {arg: 'id2', type: 'number', required: true}
    ],
    returns: {type: 'string', root: true},
    http: {path: '/users/:id/specific_user/:id2', verb: 'get'}
  });

  Thread.remoteMethod('preview', {
    accepts: [
      {arg: 'id', type: 'number', required: true}
    ],
    returns: {type: 'array', root: true},
    http: {path: '/users/:id', verb: 'get'}
  });
};

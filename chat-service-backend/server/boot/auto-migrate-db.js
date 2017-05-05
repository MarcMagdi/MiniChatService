/**
 * Project Phase I: Mini Chat Service
 * Created by Marc Magdi on Friday 5/05/2017.
 */
module.exports = function(app, cb) {

  // Auto Migrate the postgres database to match the application schema

  // var ds = app.datasources.postgresDB;
  // if(ds.connected) { // to ignore memory leak;
  //   updateDB();
  // } else {
  //   ds.once('connected', function() {
  //     updateDB();
  //   });
  // }
  //
  // function updateDB() {
  //   ds.autoupdate('UserModel' , function(err){if (err) throw err;});
  //   ds.autoupdate('Thread' , function(err){if (err) throw err;});
  //   ds.autoupdate('Message' , function(err){if (err) throw err;});
  // }
  // process.nextTick(cb); // Remove if you pass `cb` to an async function yourself

};

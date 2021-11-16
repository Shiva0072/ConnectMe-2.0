const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/ConnectMe');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("DB server is running");
});

module.exports=db;
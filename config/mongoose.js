const mongoose = require('mongoose');
const env=require('./environment');

// mongoose.connect(`mongodb://localhost/${env.db}`);
mongoose.connect(env.db,{
  useNewUrlParser:true,
  useCreateIndex:true,
  useUnifiedTopology:true,
  useFindAndModify:true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("DB server is running");
});

module.exports=db;
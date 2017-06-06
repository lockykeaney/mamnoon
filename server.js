// set up ======================================================================
require('dotenv').config();
const app = require('./app');

// database configuration ===============================================================
const mongoose = require('mongoose');
mongoose.connect(process.env.DB_LOCAL);
if(app.settings.env === 'production') {
  mongoose.connect(process.env.DB_PRODUCTION);
}
mongoose.Promise = require('bluebird');
mongoose.Promise = global.Promise;

// launch ======================================================================
app.listen(process.env.PORT || 5555, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});

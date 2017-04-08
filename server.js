// set up ======================================================================
const app = require('./app');
const port  = process.env.PORT || 6000;

// database configuration ===============================================================
const mongoose = require('mongoose');
const configDB = require('./config/database.js');
mongoose.connect(configDB.url);
// require('./config/passport');

// launch ======================================================================
app.listen(port);
console.log('The magic happens on port ' + port);

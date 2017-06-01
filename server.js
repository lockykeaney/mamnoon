// set up ======================================================================
require('dotenv').config();
const app = require('./app');
const port  = process.env.PORT || 5555;

// database configuration ===============================================================
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/cupcake');
mongoose.Promise = require('bluebird');
mongoose.Promise = global.Promise;

// launch ======================================================================
app.listen(port);
console.log('The magic happens on port ' + port);

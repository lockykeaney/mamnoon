// set up ======================================================================
require('dotenv').config();
const app = require('./app');
const port  = process.env.PORT || 6000;

// database configuration ===============================================================
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/cupcake');
mongoose.Promise = require('bluebird');

// launch ======================================================================
app.listen(port);
console.log('The magic happens on port ' + port);

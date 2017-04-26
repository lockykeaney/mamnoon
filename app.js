const express = require('express');
const app = express();
const path = require('path');
const hbs = require('express-hbs');
const passport = require('passport');
const flash = require('connect-flash');
const morgan  = require('morgan');
const cookieParser  = require('cookie-parser');
const bodyParser  = require('body-parser');
const session = require('express-session');
const twilio = require('twilio');

require('dotenv').config();

app.use('/', express.static(__dirname + '/'));
app.use(express.static(path.join(__dirname, 'public')));

app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('views', path.join(__dirname + '/views'));
app.set('view engine', 'hbs');
app.engine('hbs', hbs.express4({
  partialsDir: __dirname + '/views/partials',
}));

app.use(session({ secret: 'ihaveasecret' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use(require('./routes'));

module.exports = app;

// const config = require ("./config");
const express      = require('express');
const path         = require('path');
const favicon      = require('serve-favicon');
const logger       = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser   = require('body-parser');
const layouts      = require('express-ejs-layouts');
const mongoose     = require('mongoose');
const session      = require('express-session');
const MongoStore   = require('connect-mongo')(session);
const passport     = require('passport');
const bcrypt     = require('bcrypt');


// mongoose.connect('mongodb://localhost/iparty');

const app = express();

// // view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// // default value for title local
app.locals.title = 'iParty';

// // uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(layouts);

// //mongostore
app.use(session({
  secret: 'letsparty',
  resave: false,
  saveUninitialized: true,
  store: new MongoStore( { mongooseConnection: mongoose.connection })
}));

// //passport
app.use(passport.initialize());
app.use(passport.session());
// passport.use(new LocalStrategy(User.authenticate()));
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());
require ("./config/passport")(app)


// const index = require('./routes/index');
// app.use('/', index);
app.get('/', (req, res) => {
  res.render("index");
});

// // catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// // error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;


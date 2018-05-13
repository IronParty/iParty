require('dotenv').config()
const express      = require('express');
const path         = require('path');
const favicon      = require('serve-favicon');
const logger       = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser   = require('body-parser');
const layouts      = require('express-ejs-layouts');
const mongoose     = require('mongoose');
const flash        = require('flash');
const session      = require('express-session');
const MongoStore   = require('connect-mongo')(session);


const index = require('./routes/index');
const userController = require('./routes/user')
const authController = require('./routes/auth')
const companiesController = require('./routes/companies')
const reviewController = require('./routes/reviews')
const orderController = require('./routes/orders')

const bcrypt     = require('bcrypt');

mongoose.connect("mongodb://localhost/iParty")
  .then(console.log(`connected to  ${process.env.DATABASE_URL}`))

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


app.use(session({
  secret: 'ironfundingdev',
  resave: false,
  saveUninitialized: true,
  store: new MongoStore( { mongooseConnection: mongoose.connection })
}));

app.use(flash());


require ('./config/passport')(app)






app.use('/', index);
app.use('/', authController);
app.use('/user', userController);
app.use('/company', companiesController);
app.use('/review', reviewController);
app.use('/order', orderController);


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


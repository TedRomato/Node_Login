const express = require('express');
const session = require('express-session');
const passport = require('passport');
const mongoose = require('mongoose');
require('dotenv').config();


mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;

db.once('open', () => {
  console.log('db connected');
})


const app = express();


app.set('view engine', 'ejs');

app.use(session({secret: process.env.SESSION_SECRET}));
app.use(express.urlencoded({extended: false}));
app.use(express.static('public'));


//PASSPORT SETUP

const initializePassport = require("./passport_util/initialize_passport.js");
initializePassport(passport, app);


//AUTH ROUTER SETUP

const registerRouter = require('./routes/register.js')();
const loginRouter = require('./routes/login.js')(passport);

app.use('/login', loginRouter);
app.use('/register', registerRouter);


//EXAMPLE FILE
const rootRouter = require('./routes/example_custom_route.js')(passport);
app.use('/', rootRouter);

app.listen(5000 || process.env.PORT, () => {
  console.log("Listening on port 5000 || process.env.PORT");
});

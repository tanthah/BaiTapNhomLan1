const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('passport');
const cookieParser = require('cookie-parser');
require('dotenv').config();


const setupPassport = require('./config/passport');
const authRoutes = require('./routes/auth');


const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));


// passport
app.use(passport.initialize());
setupPassport();


app.use('/api/auth', authRoutes);


module.exports = app;
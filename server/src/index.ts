import dotenv from 'dotenv';
import mongoose from 'mongoose';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import passport from 'passport';
import passportLocal from 'passport-local';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import bcrypt from 'bcryptjs';
import User from './models/User';
import MongoStore from 'connect-mongo';
import { UserInterface, DatabaseUserInterface } from './interfaces/UserInterface';

dotenv.config();

const userRouter = require('./routes/user')
const itemRouter = require('./routes/item')

const LocalStrategy = passportLocal.Strategy;
const PORT = 4000;
/* connect to database */
mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGO_URL!).then(() => {
  console.log(`listening on port ${PORT}`);
});

/* middleware */
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: false}))
app.use(cookieParser());
app.use(cors({ origin: "https://shopifly.com", credentials: true }))
app.use(
  session({
    secret: process.env.ACCESS_TOKEN_SECRET!,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 86400000 },
    store: new MongoStore({
      mongoUrl: process.env.MONGO_URL,
      ttl: 14 * 24 * 60 * 60,
      autoRemove: 'native'
    })
})
);

app.use(passport.initialize());
app.use(passport.session());




// passport 
passport.use(new LocalStrategy((username: string, password: string, done) => {
  User.findOne({ username: username }, (err: Error, user: DatabaseUserInterface) => {
    if (err) throw err;
    if (!user) return done(null, false);
    bcrypt.compare(password, user.password, (err, result: boolean) => {
      if (err) throw err;
      if (result === true) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    });
  });
})
);

passport.serializeUser((user: DatabaseUserInterface, cb) => {
  cb(null, user._id);
});

passport.deserializeUser((id: string, cb) => {
  User.findOne({ _id: id }, (err: Error, user: DatabaseUserInterface) => {
    const userInformation: UserInterface = {
      username: user.username,
      isAdmin: user.isAdmin,
      id: user._id,
      items: user.items,
      checkOutHistory: user.checkOutHistory,
    };
    cb(err, userInformation);
  });
});

app.use('/user', userRouter);
app.use('/item', itemRouter);
app.listen(4000);
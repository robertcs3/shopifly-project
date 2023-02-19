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
const { resolve } = require("path");
app.use(express.json());
app.use(express.urlencoded({extended: false}));
/* app.set('trust proxy', 1);   */
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:5173", credentials: true }))
app.use(
  session({
    secret: process.env.ACCESS_TOKEN_SECRET!,
    resave: false,
      /* cookie: {
      sameSite: "none",
      secure: true,
      maxAge: 86400000,
    },   */
    saveUninitialized: false,
     /* store: new MongoStore({
      mongoUrl: process.env.MONGO_URL,
      ttl: 14 * 24 * 60 * 60,
      autoRemove: 'native'
    })   */
})
);

app.use(passport.initialize());
app.use(passport.session());




/* -----------------------------passport authentication-------------------- */
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

/* ----------------------Stripe payment------------------------- */

app.use(express.static(process.env.STATIC_DIR!));

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2022-11-15",
});

app.get("/", (req, res) => {
  const path = resolve(process.env.STATIC_DIR + "/index.html");
  res.sendFile(path);
});

app.get("/config", (req, res) => {
  res.send({
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
  });
});

app.post("/create-payment-intent", async (req, res) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      currency: "EUR",
      amount: 1999,
      automatic_payment_methods: { enabled: true },
    });

    // Send publishable key and PaymentIntent details to client
    res.send({
      clientSecret: paymentIntent.client_secret,
    });
    return
  } catch (e) {
    return res.status(400).send({
      error: {
        message: e.message,
      },
    });
  }

});


app.use('/user', userRouter);
app.use('/item', itemRouter);
app.listen(4000);
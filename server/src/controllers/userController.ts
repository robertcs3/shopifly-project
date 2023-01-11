import express, { Request, Response, NextFunction } from 'express';
import User from '../models/User'
import Item from '../models/Item'
import bcrypt from 'bcryptjs';

import { DatabaseUserInterface, UserInterface } from '../interfaces/UserInterface';

import { CheckOutItems } from '../interfaces/UserInterface';
/* get user */
exports.get_user = ((req: Request, res: Response) => {
  res.send(req.user);
})

/* register user */
exports.register_user = ((req: Request, res: Response) => {
  const { username, password } = req?.body;
  User.findOne({ username }, async (err: Error, doc: DatabaseUserInterface) => {
    if (err) throw err;
    if (doc) {
      res.send("User Already Exists")
    } else if (!doc) {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({
        username,
        password: hashedPassword,
      });
      await newUser.save();
      res.send("success!")
    }
  })
})

/* login user */
exports.login_user = ((req: Request, res: Response) => {
  res.send("success!")
})

/* logout user */
exports.logout_user = ((req: Request, res: Response, next: NextFunction) => {
  req.logout(function (err: Error) {
    if (err) return next(err);
  })
  res.send("success!")
})

/* grant user admin privileges */
exports.verify_user = (async (req: Request, res: Response) => {
  try {
    let grantAdmin = await User.findByIdAndUpdate(req.params.id, { isAdmin: true })
    res.send("success!");
  } catch (err) {
    console.log(err);
  }
})

/* update user cart */
exports.update_cart = (async (req: Request, res: Response) => {
  const { cartItems } = req?.body;
  try {
    await User.updateOne({ _id: req.params.id },
      { $set: { items: cartItems }})

    res.send("cart updated")
  } catch (err) {
    console.log(err);
  }
})

/* checkout cart items */
exports.checkout = ((req: Request, res: Response) => {
  const { checkOutItems } = req?.body;
  try {
    checkOutItems.forEach(async (item: CheckOutItems) => {
      let originalItem = await Item.findById(item.id);
      await User.updateMany({_id: req.params.id}, {$push: { checkOutHistory: item}})
      await Item.updateOne({_id: item.id}, {$set: {stock: originalItem?.stock! - item.quantity}})
    });
    res.send('success!')
  } catch (err) {
    console.log(err);
  }
})

exports.checkout_history =(async (req: Request, res: Response) => {
  try {
    let user = await User.findById(req.params.id);
    res.send(user?.checkOutHistory);
  } catch (err) {
    console.log(err)
  }
})

exports.clear_checkout_history = (async (req: Request, res: Response) => {
  try {
    await User.updateOne({_id: req.params.id}, {$unset : {"checkOutHistory": []}})
    res.send("success!")
  } catch (err) {
    console.log(err)
  } 
})

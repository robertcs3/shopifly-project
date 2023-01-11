import express, { Request, Response, NextFunction } from 'express';
const router = express.Router();
const user_controller = require('../controllers/userController')
import passport from 'passport';



/* get user */
router.get('/', user_controller.get_user);

/* register user */
router.post('/register', user_controller.register_user);

/* login user */
router.post('/login', passport.authenticate('local'), user_controller.login_user);

/* logout user */
router.get('/logout', user_controller.logout_user);

/* grant user admin privileges */
router.patch('/verify/:id', user_controller.verify_user);

/* update user cart */
router.patch('/update/:id', user_controller.update_cart);

/* add checkout items to checkout history*/
router.patch('/checkout/:id', user_controller.checkout);

/* get checkout history */
router.get('/checkouthistory/:id', user_controller.checkout_history);

/* clear a user's checkout history*/
router.patch('/clearcheckouthistory/:id', user_controller.clear_checkout_history);


module.exports = router;
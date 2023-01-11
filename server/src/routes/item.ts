import express from "express";
const router = express.Router()
const item_controller = require('../controllers/itemController');

/* get items */
router.get('/', item_controller.get_items);

/* create item */
router.post('/create', item_controller.create_item);

/* edit item */
router.put('/:id', item_controller.edit_item);

/* delete item */
router.delete('/:id', item_controller.delete_item);





module.exports = router;
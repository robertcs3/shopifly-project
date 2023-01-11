import Item from '../models/Item'
import  { Request, Response } from "express";

exports.get_items = ( async (req: Request, res: Response) => {
    try {
        let items = await Item.find();
        res.send(items)
    } catch (err) {
        console.log(err);
    }
})

/* Create an item */
exports.create_item = ( async (req:any, res:Response) => {   
    const { name, price, stock, imageUrl } = req?.body;
    try {
        let newItem = new Item({
            name,
            price,
            stock,
            imageUrl,
    });

    if (await Item.findOne({name: name})) {
        res.send("duplicate");
    } else {
        await newItem.save();
        res.send("success!");
    }
    } catch (err) {
        console.log(err);
    }
})

/* edit an item */
exports.edit_item = ( async (req: Request, res: Response) => {
    const {name, price, numberInStock, imageUrl} =  req?.body
    let checkDuplicate = await Item.find({ name: { $in: name}})
    if (checkDuplicate.length > 1) {
        res.send('duplicate');
    } else {
        try {
        let original = await Item.findById(req.params.id);
        let edited = await Item.updateOne({name: original!.name},
            {$set: {name: name,
                price: price, numberInStock: numberInStock, imageUrl: imageUrl}});
        res.send("success!");
    } catch (err) {
        console.log(err);
    }
    }
    
})

/* delete an item */
exports.delete_item = ( async (req: Request, res: Response) => {
    try {
        await Item.findByIdAndDelete(req.params.id)
        res.send("success!")
    } catch (err) {
        console.log(err)
    }
})
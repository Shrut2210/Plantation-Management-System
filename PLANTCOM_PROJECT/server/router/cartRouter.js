import express from 'express';
import { Cart } from "../models/Cart.js";
const router = express.Router();

router.post('/:id', async (req, res) => {
    const {  adminName, productCode, title, imagePath, description, price, category } = req.body;
    
    const getCart = await Cart.findOne({email : req.params.id});

    if(getCart)
    {
        const getOrder = await Cart.findOne({'items.productCode' : productCode});

        if(getOrder)
        {
            console.log('item alreday exists!!!!');
            return res.status(200).json({message : 'item already in cart'})
        }
        else
        {
            getCart.totalCost += Number.parseInt(price);
            getCart.totalQty += 1;

            getCart.items.push({
                adminName: adminName,
                productCode: productCode,
                title: title,
                imagePath: imagePath,
                description: description,
                category: category,
                price: price
            });
            await getCart.save();
            return res.status(200).json({message : 'cart item added succefully....'});
        }
    }
    else
    {
        const newCart = new Cart({  adminName, productCode, title, imagePath, description, price, category });
        newCart.totalCost += Number.parseInt(price);
        newCart.totalQty += 1;
        newCart.email = req.params.id;

        newCart.items.push({
            adminName: adminName,
            productCode: productCode,
            title: title,
            imagePath: imagePath,
            description: description,
            category: category,
            price: price
        });
        await newCart.save();
        console.log(newCart);
        return res.status(200).json({message : 'cart item added succefully....'});
    }
})

router.get("/:id", async (req, res) => {
    let cart = await Cart.findOne({email : req.params.id});
    return res.json(cart);
})

router.delete('/:email/:code', async (req, res) => {
    const email = req.params.email;
    const productCode = req.params.code;
    console.log(email + ' ' + productCode);

    await Cart.updateOne({email : email}, {$pull : {items : {productCode : productCode}}})

    return res.status(200).json({message : 'Element removed successfully'})
})

export default router;
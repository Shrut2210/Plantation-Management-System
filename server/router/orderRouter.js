import express from 'express';
import { Order } from '../models/Order.js';
const router = express.Router();

router.post('/:id', async (req, res) => {
    const {   adminName, productCode, title, imagePath, description, price, category, address } = req.body;
    
    const getOrder = await Order.findOne({email : req.params.id});

    if(getOrder)
    {
        const itemData = await Order.findOne({'items.productCode' : productCode})
        if(itemData) 
        {
            getOrder.totalCost += Number.parseInt(price);
            getOrder.totalQty += 1;
            getOrder.items.qty += 1;
            return res.status(200).json({message : 'item qty added....'})
        }
        else
        {
            getOrder.totalCost += Number.parseInt(price);
            getOrder.totalQty += 1;

            getOrder.items.push({
                adminName: adminName,
                productCode: productCode,
                title: title,
                imagePath: imagePath,
                description: description,
                category: category,
                price: Number.parseInt(price),
                qty: 1,
            });
            await getOrder.save();
            return res.status(200).json({message : 'order item added succefully....'});
        }
    }
    else
    {
        const newOrder = new Order({ adminName, productCode, title, imagePath, description, price, category, address })
        newOrder.email = req.params.id;
        newOrder.address = address;
        newOrder.totalCost += Number.parseInt(price);
        newOrder.totalQty += 1;

        newOrder.items.push({
            adminName: adminName,
            productCode: productCode,
            title: title,
            imagePath: imagePath,
            description: description,
            category: category,
            price: price,
            qty: 1
        });
        await newOrder.save();
        console.log(newOrder);
        return res.status(200).json({message : 'order item added succefully....'});
    }
})

router.get('/' , async (req, res) => {
    let order = await Order.find();
    return res.json(order);
})

router.get("/:id", async (req, res) => {
    let order = await Order.findOne({email : req.params.id});
    return res.json(order);
})

export default router;
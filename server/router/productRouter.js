import express from "express";
const router = express.Router();
import {Product} from "../models/product.js";

router.get('/', async (req, res) => {
    try {
      const plants = await Product.find();
      res.json(plants);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
  router.get('/:id', getPlant, (req, res) => {
    if (!res.plant) {
        return res.status(404).json({ message: 'Plant not found' });
      }
      res.json(res.plant);
  });
  
  async function getPlant(req, res, next) {
    let plant;
    try {
      plant = await Product.findById(req.params.id);
      if (plant == null) {
        return res.status(404).json({ message: 'Plant not found' });
      }
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
    res.plant = plant;
    next();
  }

router.post("/", async (req,res) => {
    console.log(req.body)
    const addProduct = new Product(req.body); 
  
    await addProduct.save();
    console.log(addProduct);
    return res.status(200).json(addProduct);
})

export default router;
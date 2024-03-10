import { User } from './models/User.js';
import { Order } from './models/Order.js';
import { Product } from './models/product.js';
import express  from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.urlencoded({extended:false}));
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

mongoose.connect("mongodb+srv://shrut2210:plantecom@cluster0.cr6gpjk.mongodb.net/").then()
{
    console.log("connect to db");
}

app.get("/", async (req,res)=>{
    const data = await User.find();
    res.send(data);
});
app.listen(8000,()=>{
    console.log("running on 8000");
});
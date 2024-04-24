import express  from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";

dotenv.config({path: './config.env'});

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json()); 
app.use(cookieParser());

import './db/connection.js'

import productRouter from './router/productRouter.js' 
app.use('/products', productRouter); 

import userRouter from './router/userRouter.js'
app.use('/user', userRouter);

import cartRouter from './router/cartRouter.js'
app.use('/cart', cartRouter);

import orderRouter from './router/orderRouter.js'
app.use('/order',orderRouter);

app.get("/", async (req,res) => {
    res.send("data");
})

app.listen(process.env.PORT,()=>{
    console.log("running on port");
});
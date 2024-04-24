import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config({path: './config.env'});

mongoose.connect(process.env.DATABASE).then(() => {console.log('connection successful');}).catch((err)=> console.log("no connection"));

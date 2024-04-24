// const mongoose = require('mongoose');
import mongoose from "mongoose";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config({ path: './config.env' });

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
    contactNo: {
      type: Number,
      require: true,
    },
    location: {
      type: String,
      required: true,
    },
    isadmin: {
      type: Boolean,
      default : false
    },
    adminName: {
      type: String,
    },
  }
)

export const User = mongoose.model('User', userSchema);

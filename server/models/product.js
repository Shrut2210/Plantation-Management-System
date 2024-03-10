// const mongoose = require('mongoose');
import mongoose from "mongoose";

const productSchema = mongoose.Schema(
    {
        adminName: {
            type: String,
            required: true,
        },
        productCode: {
            type: String,
            required: true,
            unique: true,
          },
          title: {
            type: String,
            required: true,
          },
          imagePath: {
            type: String,
            required: true,
          },
          description: {
            type: String,
            required: true,
          },
          price: {
            type: Number,
            required: true,
          },
          category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
          },
          manufacturer: {
            type: String,
          },
          available: {
            type: Boolean,
            required: true,
          },
          createdAt: {
            type: Date,
            default: Date.now,
          },
    }
)

export const Product = mongoose.model('Product', productSchema);
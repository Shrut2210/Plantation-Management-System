// const mongoose = require('mongoose');
import mongoose from "mongoose";
const Schema = mongoose.Schema;

const orderSchema = mongoose.Schema(
    {
      email: {
        type: String,
        required: true,
      },
      items: [
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
            type: String,
          },
          qty: {
            type: String,
            required: true,
            default: 0,
          }
        }
      ],
      address : {
        type: String,
        // required: true,
      },
      totalCost: {
        type: Number,
        required: true,
        default: 0
      },
      totalQty: {
        type: Number,
        required: true,
        default: 0
      }
    }
)

export const Order = mongoose.model('Order', orderSchema);
import mongoose from "mongoose";
const Schema = mongoose.Schema;

const cartSchema = mongoose.Schema(
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
            ref: "Category",
          },
        }
      ],
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

export const Cart = mongoose.model('Cart', cartSchema);
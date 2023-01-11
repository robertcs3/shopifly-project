import mongoose from 'mongoose';

const item = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  stock: {
    type: Number,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
 
});

export default mongoose.model("Item", item);
import mongoose from 'mongoose';

const user = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  items: {
    type: Array
  },
  checkOutHistory: {
    type: Array
  }
});

export default mongoose.model("User", user);
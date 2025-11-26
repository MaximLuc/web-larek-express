import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  title: {
    type: String, minlength: 2, maxlength: 100, required: true, unique: true,
  },
  image: {
    type: {
      fileName: { type: String, required: true },
      originalName: { type: String, required: true },
    },
    required: true,
  },
  category: { type: String, required: true },
  description: { type: String },
  price: { type: Number, default: null },
});

const Product = mongoose.model('product', productSchema);
export default Product;

import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  title: {
    type: String, minlength: [2, 'Минимальная длина поля "title" - 2'], maxlength: [30, 'Максимальная длина поля "title" - 30'], required: [true, 'Поле "title" обязательно для заполнения'], unique: true,
  },
  image: {
    type: {
      fileName: { type: String, required: [true, 'Поле "image.fileName" должно быть заполнено'] },
      originalName: { type: String, required: [true, 'Поле "image.originalName" должно быть заполнено'] },
    },
    required: [true, 'Поле "image" должно быть заполнено'],
  },
  category: { type: String, required: [true, 'Поле "category" должно быть заполнено'] },
  description: { type: String },
  price: { type: Number, default: null },
});

const Product = mongoose.model('product', productSchema);
export default Product;

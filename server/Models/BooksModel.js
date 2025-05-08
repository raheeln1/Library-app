import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: String,
    rating: Number,
    isRead: Boolean,
    category: String,
    status: {
      type: String,
      enum: ['read', 'reading', 'wantToRead'],
      default: 'wantToRead',
    },
    createdAt: { type: Date, default: Date.now },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
  });
  

const BookModel = mongoose.model('listbooks', bookSchema);
export default BookModel;

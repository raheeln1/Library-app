import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import UsersModel from './Models/UsersModel.js';
import BookModel from './Models/BooksModel.js';
import dotenv from "dotenv";

const app = express();
app.use(express.json());
app.use(cors({
  origin: ["http://localhost:3000", "https://library-app-gtyn.onrender.com"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
dotenv.config();

const constr = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@personallibrary.zf5mldr.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority&appName=PersonalLibrary`;
mongoose.connect(constr);

app.post("/registerUser", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = new UsersModel({ name, email, password });
    await user.save();
    res.send({ user, msg: "User registered successfully" });
  } catch (error) {
    res.status(400).json({ error: "Unexpected error occurred" });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UsersModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    } else if (user.password !== password) {
      return res.status(401).json({ msg: "Incorrect password" });
    } else {
      return res.status(200).json({ user, msg: "Login successful" });
    }
  } catch (error) {
    res.status(500).json({ error: "An unexpected error occurred" });
  }
});


app.post("/logout", (req, res) => {
  res.status(200).json({ msg: "Logged out successfully" });
});


app.get('/listbooks', async (req, res) => {
  try {
    const books = await BookModel.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


app.post('/listbooks', async (req, res) => {
  try {
    const {
      title,
      author,
      rating,
      isRead,
      category,
      status,
      userId
    } = req.body;


    if (!title || !author || !category || !userId) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const cleanRating = Math.max(0, Math.min(5, parseFloat(rating) || 0)); 

    const book = new BookModel({
      title,
      author,
      rating: cleanRating,
      isRead: Boolean(isRead),
      category,
      status: status || 'pending',
      createdAt: new Date(),
      userId
    });

    const savedBook = await book.save();
    res.status(201).json(savedBook);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/listbooks/:id', async (req, res) => {
  try {
    const updates = req.body;

    if (updates.rating) {
      updates.rating = Math.max(0, Math.min(5, parseFloat(updates.rating)));
    }

  
    if (typeof updates.isRead !== "undefined") {
      updates.isRead = Boolean(updates.isRead);
    }

    const updatedBook = await BookModel.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true }
    );

    if (!updatedBook) {
      return res.status(404).json({ error: "Book not found" });
    }

    res.json(updatedBook);
  } catch (error) {
    res.status(500).json({ message: 'Error updating book' });
  }
});


app.delete('/listbooks/:id', async (req, res) => {
  try {
    await BookModel.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Book deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting book' });
  }
});


app.listen(process.env.PORT, () => {
  console.log("Server is running ");
});

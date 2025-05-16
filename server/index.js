import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import UsersModel from './Models/UsersModel.js';
import BookModel from './Models/BooksModel.js';
import dotenv from "dotenv";

const app = express();
app.use(express.json());
app.use(cors());
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
    console.log("Login request received:", email, password); // ← أضيفي هذا

    if (!email || !password) {
      return res.status(400).json({ msg: "Email and password are required" });
    }

    const user = await UsersModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    } else if (user.password !== password) {
      return res.status(401).json({ msg: "Password is incorrect" });
    }

    res.status(200).json({ user, msg: "Login Successful" });

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ msg: "Unexpected error occurred" });
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
app.put('/listbooks/:id/status', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  console.log("Received update for ID:", id, "New status:", status); // ← هذا يساعد

  try {
    const updatedBook = await BookModel.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    res.json(updatedBook);
  } catch (error) {
    console.error("Update status error:", error);
    res.status(500).json({ msg: "Failed to update status" });
  }
});


app.listen(process.env.PORT, () => {
  console.log("Server is running ");
});

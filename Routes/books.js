const express = require('express');
const router = express.Router();
const BooksModel = require('../Models/BooksModel');
const AuthorsModel = require('../Models/AuthorsModel');
const PublishersModel = require('../Models/PublishersModel');

// Route : /books/all
router.get('/all', async (req, res) => {
  try {
    const books = await BooksModel.find();
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route : /books/authors/:livrename
router.get('/authors/:livrename', async (req, res) => {
  const livreName = req.params.livrename;

  try {
    const book = await BooksModel.findOne({ name: livreName });

    if (!book) {
      return res.status(404).json({ message: 'Livre non trouvé' });
    }

    const author = await AuthorsModel.findById(book.authorId);
    
    res.json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route : /books/publishers/:livrename
router.get('/publishers/:livrename', async (req, res) => {
  const livreName = req.params.livrename;

  try {
    const book = await BooksModel.findOne({ name: livreName });

    if (!book) {
      return res.status(404).json({ message: 'Livre non trouvé' });
    }

    const publisher = await PublishersModel.findById(book.publisherId);
    res.json(publisher);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route : /books/listCategorie/:category
router.get('/listCategorie/:category', async (req, res) => {
  const bookCategory = req.params.category;

  try {
    const booksInCategory = await BooksModel.find({ category: bookCategory });
    res.json(booksInCategory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route : /books/list/:annee1/:annee2
router.get('/list/:annee1/:annee2', async (req, res) => {
  const annee1 = req.params.annee1;
  const annee2 = req.params.annee2;

  try {
    const booksBetweenYears = await BooksModel.find({
      releaseYear: { $gte: annee1, $lte: annee2 },
    });

    res.json(booksBetweenYears);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route : /books/add
router.post('/add', async (req, res) => {
  const { name, category, releaseYear, authorId, publisherId } = req.body;

  const newBook = new BooksModel({
    name,
    category,
    releaseYear,
    authorId,
    publisherId,
  });

  try {
    const savedBook = await newBook.save();
    res.status(201).json(savedBook);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Route : /books/update/:name
router.put('/update/:name', async (req, res) => {
  const bookName = req.params.name;
  const { category, releaseYear, authorId, publisherId } = req.body;

  try {
    const updatedBook = await BooksModel.findOneAndUpdate(
      { name: bookName },
      { $set: { category, releaseYear, authorId, publisherId } },
      { new: true }
    );

    res.json(updatedBook);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Route : /books/delete/:name
router.delete('/delete/:name', async (req, res) => {
  const bookName = req.params.name;

  try {
    const deletedBook = await BooksModel.findOneAndDelete({ name: bookName });

    res.json(deletedBook);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

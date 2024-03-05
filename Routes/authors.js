const express = require('express');
const router = express.Router();
const AuthorsModel = require('../Models/AuthorsModel');

// Route : /authors/all
router.get('/all', async (req, res) => {
  try {
    const authors = await AuthorsModel.find();
    res.json(authors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route : /authors/names
router.get('/names', async (req, res) => {
  try {
    const authorNames = await AuthorsModel.find({}, 'name');
    res.json(authorNames);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route : /authors/books
router.get('/books', async (req, res) => {
  try {
    const authorsWithBookCount = await AuthorsModel.aggregate([
      {
        $lookup: {
          from: 'books', // Assuming the collection name for books is 'books'
          localField: '_id',
          foreignField: 'authorId',
          as: 'books',
        },
      },
      {
        $project: {
          name: 1,
          bookCount: { $size: '$books' },
        },
      },
    ]);

    res.json(authorsWithBookCount);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route : /authors/add
router.post('/add', async (req, res) => {
  const { name, birthdate, nationality } = req.body;

  const newAuthor = new AuthorsModel({
    name,
    birthdate,
    nationality,
  });

  try {
    const savedAuthor = await newAuthor.save();
    res.status(201).json(savedAuthor);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Route : /authors/update/:name
router.put('/update/:name', async (req, res) => {
  const authorName = req.params.name;
  const { birthdate, nationality } = req.body;

  try {
    const updatedAuthor = await AuthorsModel.findOneAndUpdate(
      { name: authorName },
      { $set: { birthdate, nationality } },
      { new: true }
    );

    res.json(updatedAuthor);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Route : /authors/delete/:name
router.delete('/delete/:name', async (req, res) => {
  const authorName = req.params.name;

  try {
    const deletedAuthor = await AuthorsModel.findOneAndDelete({ name: authorName });

    res.json(deletedAuthor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

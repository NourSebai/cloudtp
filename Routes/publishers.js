const express = require('express');
const router = express.Router();
const PublishersModel = require('../Models/PublishersModel');

// Route : /publishers/all
router.get('/all', async (req, res) => {
  try {
    const publishers = await PublishersModel.find();
    res.json(publishers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route : /publishers/names
router.get('/names', async (req, res) => {
  try {
    const publisherNames = await PublishersModel.find({}, 'name');
    res.json(publisherNames);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route : /publishers
router.get('/publishers', async (req, res) => {
  try {
    const publishersWithBookCount = await PublishersModel.aggregate([
      {
        $lookup: {
          from: 'books', // Assuming the collection name for books is 'books'
          localField: '_id',
          foreignField: 'publisherId',
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

    res.json(publishersWithBookCount);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route : /publishers/add
router.post('/add', async (req, res) => {
  const { name, location } = req.body;

  const newPublisher = new PublishersModel({
    name,
    location,
  });

  try {
    const savedPublisher = await newPublisher.save();
    res.status(201).json(savedPublisher);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Route : /publishers/update/:name
router.put('/update/:name', async (req, res) => {
  const publisherName = req.params.name;
  const { location } = req.body;

  try {
    const updatedPublisher = await PublishersModel.findOneAndUpdate(
      { name: publisherName },
      { $set: { location } },
      { new: true }
    );

    res.json(updatedPublisher);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Route : /publishers/delete/:name
router.delete('/delete/:name', async (req, res) => {
  const publisherName = req.params.name;

  try {
    const deletedPublisher = await PublishersModel.findOneAndDelete({ name: publisherName });

    res.json(deletedPublisher);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

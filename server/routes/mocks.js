// server/routes/mocks.js
const express = require('express');
const router  = express.Router();
const authenticateToken = require('../middleware/auth');
const Mock    = require('../models/mock');

// POST /api/mocks
// Body: { questions: [ "Q1", "Q2", ... ] }
//    or  { questions: [ { text: "Q1", order: 0 }, ... ] }
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { questions } = req.body;
    if (!Array.isArray(questions) || questions.length === 0) {
      return res.status(400).json({ msg: 'A non-empty questions array is required.' });
    }

    // Normalize into [{ text: String, order: Number }, ...]
    const questionDocs = questions.map((q, idx) => {
      if (q && typeof q === 'object' && typeof q.text !== 'undefined') {
        return {
          text:  String(q.text),
          order: typeof q.order === 'number' ? q.order : idx
        };
      }
      return {
        text:  String(q),
        order: idx
      };
    });

    const mock = new Mock({ questions: questionDocs });
    await mock.save();
    res.status(201).json({ mockId: mock._id });
  } catch (err) {
    console.error('Error in POST /api/mocks:', err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// GET /api/mocks/:mockId
router.get('/:mockId', async (req, res) => {
  try {
    const mock = await Mock.findById(req.params.mockId);
    if (!mock) {
      return res.status(404).json({ msg: 'Mock not found.' });
    }
    res.json({ questions: mock.questions });
  } catch (err) {
    console.error('Error in GET /api/mocks/:mockId:', err);
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;

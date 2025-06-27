// server/models/mock.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const questionSchema = new Schema({
  text:  { type: String, required: true },
  order: { type: Number, required: true },
});

const mockSchema = new Schema({
  questions: [questionSchema],
}, { timestamps: true });

module.exports = mongoose.model('Mock', mockSchema);

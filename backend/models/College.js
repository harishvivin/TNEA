const mongoose = require('mongoose');

const collegeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  district: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['Autonomous', 'Non-Autonomous'],
    required: true,
  },
  previousYearCutoff: {
    type: Number,
    required: true,
  }
});

module.exports = mongoose.model('College', collegeSchema);

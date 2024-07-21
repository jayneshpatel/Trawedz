const mongoose = require('mongoose');

const resortSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  description: { type: String, required: true },
  facilities: {
    type: [String],
    enum: ['bathtub', 'balcony', 'desk', 'outdoor space', 'rain shower', 'air conditioning', 'coffee machine', 'garden view', 'kitchenette', 'mountain view', 'private pool', 'water'],
    required: true
  },
  category: {
    type: String,
    enum: ['family friend', 'sun&Beach', 'Hill stations', 'Ultra lux'],
    required: true
  }
});

const Resort = mongoose.model('Resort', resortSchema);

module.exports = Resort;

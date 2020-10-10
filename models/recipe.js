const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Recipe = new Schema(
  {
    name: { type: String, required: true },
    imgURL: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    ingredients: []
  },
  { timestamps: true }
)



module.exports = mongoose.model('recipes', Recipe)
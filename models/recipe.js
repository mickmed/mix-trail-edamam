const mongoose = require('mongoose')
const Schema = mongoose.Schema
var User = require('../models/user.js');

const Recipe = new Schema(
  {
    name: { type: String, required: true },
    imgURL: { type: String, required: false },
    description: { type: String, required: false },
    category: { type: String, required: false },
    ingredients: [],
    nutrientVals:[],
    
    user:{
      type: mongoose.Schema.Types.ObjectId,
      ref: User
    }

  },
  { timestamps: true }
)



module.exports = mongoose.model('recipes', Recipe)
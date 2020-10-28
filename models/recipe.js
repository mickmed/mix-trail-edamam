const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Recipe = new Schema(
  {
    name: { type: String, required: true },
    imgURL: { type: String, required: false },
    description: { type: String, required: false },
    category: { type: String, required: false },
    ingredients: [],
    nutrientVals:[],
    // user:{
    //   type: Schema.Types.ObjectId,
    //   ref:'User'
    // }

  },
  { timestamps: true }
)



module.exports = mongoose.model('recipes', Recipe)
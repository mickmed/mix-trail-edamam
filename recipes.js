const Recipe = require('../models/recipe')
const db = require('../db/connection')

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

const getRecipes = async (req, res) => {
  try{
    const recipes = await Recipe.find()
    res.json(recipes)
  }catch(error){
    res.status(500).json({error: error.message})
  }
}

const getRecipe = async (req, res) => {
  try{
    const {id} = req.params
    const recipe = await Recipe.findById(id)
    if(recipe){
      return res.json(recipe)
    }
    res.status(404).json({message: 'Product not found'})
  }catch(error){
    res.status(500).json({error: error.message})
  }
}

const createRecipe = async(req, res) => {
  try{
    const recipe = await new Recipe(req.body)
    await recipe.save()
    res.status(201).json(recipe)
  }catch(error){
    console.log(error)
    res.status(500).json({error: error.message})
  }
}


const Recipe = require("../models/recipe")
const db = require("../db/connection")

db.on("error", console.error.bind(console, "MongoDB connection error:"))

const getRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find().populate("user", "username -_id")

    res.json(recipes)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const getRecipe = async (req, res) => {
  try {
    const { id } = req.params
    const recipe = await Recipe.findById(id).populate("user", "username -_id")

    if (recipe) {
      return res.json(recipe)
    }
    res.status(404).json({ message: "Product not found" })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const createRecipe = async (req, res) => {
  try {
    const recipe = await new Recipe(req.body).populate("user", "username -_id")

    await recipe.save()

    res.status(201).json(recipe)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: error.message })
  }
}

const updateRecipe = async (req, res) => {
  const { id } = req.params

  await Recipe.findByIdAndUpdate(
    id,
    req.body,
    { new: true },
    (error, recipe) => {
      console.log('you got this far')
      if (error) {
        return res.status(500).json({ error: error.message })
      }
      if (!recipe) {
        return res.status(404).json({ message: "Product not found!" })
      }
      res.status(200).json(recipe)
    }
  ).populate("user", "username -_id")
}

const deleteRecipe = async (req, res) => {
  try {
    const { id } = req.params
    const deleted = await Recipe.findByIdAndDelete(id)
    if (deleted) {
      return res.status(200).send("Product deleted")
    }
    throw new Error("Product not found")
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

getRecipesByUser = async (req, res) => {
  console.log("params_id", req.params.id)
  try {
    const recipes = await Recipe.find({ user: req.params.id }).populate(
      "user",
      "username -_id"
    )

    return res.json(recipes)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// fixNutrientVals = async (req, res) => {
//   try {
//     const recipes = await Recipe.find()

//     const updatedRecipes = recipes.map((rec, idx) => {
//       rec.nutrientVals = rec.nutrientVals[0]
//       return rec
//     })

//     const newest = updatedRecipes.map(async(rec, idx) => {
//       await Recipe.findByIdAndUpdate(
//         rec._id,
//         rec,
//         { new: true },
//         (error, recipe) => {
//           console.log(recipe)
//           if (error) {
//             return res.status(500).json({ error: error.message })
//           }
//           if (!recipe) {
//             return res.status(404).json({ message: "Product not found!" })
//           }
          
//         }
//       )
//     })
//     res.status(200).json(newest)
//   } catch (error) {
//     res.status(500).json({ error: error.message })
//   }
// }

module.exports = {
  getRecipes,
  getRecipe,
  createRecipe,
  updateRecipe,
  deleteRecipe,

  getRecipesByUser,
  // fixNutrientVals,
}

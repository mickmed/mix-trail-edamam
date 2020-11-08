const db = require("../db/connection")
const Recipe = require("../models/recipe")
const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
db.on("error", console.error.bind(console, "MongoDB connection error:"))


db.dropCollection(
  "users",
  function(err, result){
    console.log('users dropped')
  }
)
db.dropCollection(
  "recipes",
  function(err, result){
    console.log('users dropped')
  }
)
const main = async () => {
  const recipes = [
    {
      name: "Carob Milk",
      imgURL:
        "https://images.unsplash.com/photo-1573521193826-58c7dc2e13e3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      category: "breakfast",
      
    },
  ]

  const savedRecipes = await Recipe.insertMany(recipes)
  console.log("Created recipes!")
  // const newPassword = await bcrypt.hash('password', SALT_ROUNDS)

  ///Make User to Associate with Recipe
   const user = await User.create({
    username: "marca",
    email: "marca@marca.com",
    password: await bcrypt.hash('shoonga', 11),
  })

  await user.save
  // const recipe = await Recipe.findOne().sort({ field: 'asc',  _id:-1 }).limit(1)

  // console.log('recipeid', recipe.id)
  // console.log(user.id)
  // console.log('savedRecipie', savedRecipes[0].id)


  //Associate the Recipe to a User
  const userRecipe = await Recipe.findByIdAndUpdate(
    savedRecipes[0].id,
    { user: user.id },
    { new: true, useFindandModify: false }
  )
  
}

const run = async () => {
  await main()
  db.close()
}

run()

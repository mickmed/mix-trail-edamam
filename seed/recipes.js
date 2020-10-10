const db = require('../db/connection')
const Recipe = require('../models/recipe')

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

const main = async () => {
    const recipes = 
    [
        {
          "name": "Orange Stew",
          "imgURL": "https://images.unsplash.com/photo-1573521193826-58c7dc2e13e3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
          "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
          "category": "breakfast",
          "ingredients":['one', 'two']
        },
        
      ]

    await Recipe.insertMany(recipes)
    console.log("Created recipes!")
}
const run = async () => {
    await main()
    db.close()
}

run()
import React, { useState, useEffect } from "react"

import axios from "axios"
import "./Recipes.scss"
import { Link, useHistory } from "react-router-dom"
import apiUrl from "./apiConfig"
import { deleteRecipe } from "../Services/recipes"

const Recipes = (props) => {
  const {
    recipes,
    userRecipes,
    filteredRecipes,
    searchString,
    setUserRecipes,
  } = props
  const history = useHistory()
  console.log(recipes, userRecipes, filteredRecipes)

  console.log(history)

  const deleteRecipeMsg = async (id, name) => {
    console.log(id)
    let confirm = prompt(`are you sure you want to delete ${name}`)
    const resp = confirm && (await deleteRecipe(id))
    console.log(resp)
    const newUserRecipes = userRecipes.filter((rec, idx) => rec._id !== id)

    setUserRecipes(newUserRecipes)
  }

  const mapRecipes = (array) => {
    return (
      <div className="recipe-list">
        <>your recipes</>
        <div className="recipe-list-title">
          <div>Recipe</div>
          <div>Kl</div>

          <div>Category</div>
        </div>
        <div className='recipe-list-results'>
          {array.map((recipe, idx) => (
            <div className="recipe-details" key={idx}>
              <Link to={`/recipes/${recipe._id}`}>
                <div className="recipe-name">{recipe.name}</div>
                <div className="calories">
                  {Math.round(recipe.nutrientVals[0].nf_calories)}
                </div>
                <div className="category">{recipe.category}</div>

              </Link>
              <div onClick={() => deleteRecipeMsg(recipe._id, recipe.name)}>
                X
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return !recipes ? (
    <div>...loading</div>
  ) : (
    <div className="recipes">
      {searchString.length > 2
        ? mapRecipes(filteredRecipes)
        : userRecipes
        ? mapRecipes(userRecipes)
        : mapRecipes(recipes)}
    </div>
  )
}

export default Recipes

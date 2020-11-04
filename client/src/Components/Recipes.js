import React, { useState, useEffect } from "react"

import axios from "axios"
import "./Recipes.scss"
import { Link, useHistory } from "react-router-dom"
import apiUrl from "./apiConfig"
import { deleteRecipe } from "../Services/recipes"

const Recipes = (props) => {

  const { recipes, userRecipes, filteredRecipes, searchString, setUserRecipes } = props
  const history = useHistory()
  console.log(recipes, userRecipes, filteredRecipes)

  console.log(history)

  const deleteRecipeMsg = async (id, name) => {
    console.log(id)
    alert(`are you sure you want to delete ${name}`)
    const resp = await deleteRecipe(id)
    console.log(resp)
    const r = userRecipes.filter((rec, idx)=> (
      rec._id !== id

    ))
    console.log(r)
    setUserRecipes(r)
  }

  const mapRecipes = (array) => {
    return array.map((recipe, idx) => (
      <div className="recipe-list" key={idx}>
        <Link to={`/recipes/${recipe._id}`}>
          <div className="recipe-name">{recipe.name}</div>
        </Link>
        <div onClick={() => deleteRecipeMsg(recipe._id, recipe.name)}>X</div>
      </div>
    ))
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

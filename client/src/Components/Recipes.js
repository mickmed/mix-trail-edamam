import React, { useState, useEffect } from "react"
import axios from "axios"
import "./Recipes.scss"
import { Link } from "react-router-dom"
import apiUrl from "./apiConfig"

const Recipes = (props) => {
  const { recipes } = props

  const deleteRecipe = async (id) => {
    console.log(id)
    const resp = await axios.delete(`${apiUrl}/recipes/${id}`)
    console.log(resp)
  }

  return (
    <div className="recipes">
      {recipes &&
        recipes.map((recipe, idx) => (
          <div key={idx}>
            <Link to={`/recipes/${recipe._id}`}>
              <div className="recipe-name">{recipe.name}</div>
            </Link>
            <div onClick={() => deleteRecipe(recipe._id)}>X</div>
          </div>
        ))}
    </div>
  )
}

export default Recipes

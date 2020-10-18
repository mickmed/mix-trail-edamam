import React, { useState, useEffect } from "react"
import axios from "axios"
import "./Recipes.scss"
import { Link } from "react-router-dom"
import apiUrl from "./apiConfig"

const Recipes = (props) => {
  const { recipes } = props

  const deleteRecipe = async (id, name) => {
    console.log(id)
    alert(`are you sure you want to delete ${name}`)
    const resp = await axios.delete(`${apiUrl}/recipes/${id}`)
    console.log(resp)
  }

  
  return !recipes ? (<div>...loading</div>) : (
    <div className="recipes">
      {recipes &&
        recipes.map((recipe, idx) => (
          <div className='recipe-list' key={idx}>
            <div onClick={() => deleteRecipe(recipe._id, recipe.name)}>X</div>
            <Link to={`/recipes/${recipe._id}`}>
              <div className="recipe-name">{recipe.name}</div>
            </Link>
            
          </div>
        ))}
    </div>
  )
}

export default Recipes

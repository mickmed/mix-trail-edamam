import React, { useState, useEffect } from "react"

import axios from "axios"
import "./Recipes.scss"
import { Link, useHistory } from "react-router-dom"
import apiUrl from "./apiConfig"
import { deleteRecipe } from "../Services/recipes"

const Recipes = (props) => {
  const [recipeOrder, setRecipeOrder] = useState(true)
  const [appWidth, setAppWidth] = useState(0)
  const {
    recipes,
    userRecipes,
    filteredRecipes,
    searchString,
    setUserRecipes,
  } = props

  useEffect(()=>{
    setAppWidth(props.appWidth.current && props.appWidth.current.clientWidth)

  }, [])


  const history = useHistory()

  // console.log(recipes, userRecipes)
  const deleteRecipeMsg = async (id, name) => {
    let confirm = prompt(`are you sure you want to delete ${name}`)
    const resp = confirm && (await deleteRecipe(id))

    const newUserRecipes = userRecipes.filter((rec, idx) => rec._id !== id)

    setUserRecipes(newUserRecipes)
  }

  const sortRecipes = (array, title) => {
    console.log(title, array)


  
    title =
      title === "Recipe"
        ? "name"
        : title === "Kl"
        ? 'nutrientVals.nf_calories'
        : title === "Category" && "category"


    title = title.split('.')
    console.log("title", title)

   
    if(title === 'category'){
      array.sort()
    }else{
    array.sort((a, b) => {
      let i=0
      // console.log(a, b)
      while(i<title.length){
        console.log(title[i])
        a = a[title[i]]
        b = b[title[i]]
        i++
      }
      console.log(a, b)

      if (a < b) {
        return -1
      }
      if (a > b) {
        return 1
      }
      return 0
    })
  }
    !recipeOrder && array.reverse()
    setRecipeOrder(!recipeOrder)
  }

  const mapRecipes = (array, str) => {
    const headerTitles = ["Recipe", "Kl", "Category", "User"]
    return (
      <div className="recipe-list">
        <div className="recipe-list-title">{str}</div>
        <div className="recipe-list-header">
          {headerTitles.map((title, idx) => {
            let display =
              title === "User"
                ? str !== "my recipes"
                  ? appWidth > 600
                    ? "flex"
                    : "none"
                  : "none"
                : "flex"

            return (
              <div
              
                style={{ display: display }}
                onClick={() => sortRecipes(array, title)}
              >
                {title}
              </div>
            )
          })}
        </div>
        <div className="recipe-list-results">
          {array.map((recipe, idx) => (
            <div className="recipe-details" key={idx}>
              <Link to={`/recipes/${recipe._id}`}>
                <div className="recipe-name">{recipe.name}</div>
                <div className="calories">
                  {Math.round(recipe.nutrientVals && recipe.nutrientVals.nf_calories)}
                </div>
                <div className="category">{recipe.category}</div>
                {str !== "my recipes" && recipe.user && appWidth > 600 && (
                  <div className="username">{recipe.user.username}</div>
                )}
              </Link>
              {str === 'my recipes' &&
              <div onClick={() => deleteRecipeMsg(recipe._id, recipe.name)}>
                X
              </div>}
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
        ? mapRecipes(filteredRecipes, "searched recipes")
        : userRecipes
        ? mapRecipes(userRecipes, "my recipes")
        : mapRecipes(recipes, "all recipes")}
    </div>
  )
}

export default Recipes

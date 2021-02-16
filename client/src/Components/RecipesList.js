import React from 'react'
import { Link } from 'react-router-dom'

const RecipesList = (props) => {

    const {type, recipe, idx, str, appWidth} = props

    if(type === 'list'){

        return (
          <>
            <Link to={`/recipes/${recipe._id}`}>
              <div className="recipe-name">{recipe.name}</div>
              <div className="calories">
                {Math.round(
                  recipe.nutrientVals && recipe.nutrientVals.nf_calories
                  // /recipe.servingsPerContainer
                )}
              </div>
              <div className="category">{recipe.category}</div>
              {str !== "Recipes" && recipe.user && appWidth > 600 && (
                <div className="username">
                  {str === "searched recipes" ? recipe.user.username : ""}
                </div>
              )}
              {/* <img src = {recipe.imgURL}/> */}
            </Link>
            {/* {console.log(str)} */}
            {/* {str === `${user && user.username}'s recipes` && (
              <div
                className="delete-x"
                onClick={() => deleteRecipeMsg(recipe._id, recipe.name)}
              >
                X
              </div>
            )} */}
          </>
        )

    }else{

        return (
          <>
            <img className="recipe-pic" src={recipe.imgURL} alt="pic" />
            <div className="recipe-name">{recipe.name}</div>
          </>
        );
    }
 
      

      


     
      


}

export default RecipesList
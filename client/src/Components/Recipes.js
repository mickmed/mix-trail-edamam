import React, { useState, useEffect } from "react";

import "./Recipes.scss";
import { Link } from "react-router-dom";
import { deleteRecipe, getUserRecipes } from "../Services/recipes";

const Recipes = (props) => {
  const [recipeOrder, setRecipeOrder] = useState(true);
  const [appWidth, setAppWidth] = useState(0);
  const [renderType, setRenderType] = useState(false);
  const {
    recipes,
    filteredRecipes,
    searchString,
    userRecipes,
    setUserRecipes,
    user,
  } = props;

  useEffect(() => {
    setAppWidth(props.appWidth.current && props.appWidth.current.clientWidth);
  }, []);

  const deleteRecipeMsg = async (id, name) => {
    let confirmResp = window.confirm(`are you sure you want to delete ${name}`);
    if (confirmResp) {
      await deleteRecipe(id);

      const newUserRecipes = userRecipes.filter((rec, idx) => rec._id !== id);

      setUserRecipes(newUserRecipes);
    }
  };

  const sortRecipes = (array, title) => {
    title =
      title === "Recipe"
        ? "name"
        : title === "Kl"
        ? "nutrientVals.nf_calories"
        : title === "Category" && "category";
    console.log(title);

    title = title.split(".");
    console.log(title);

    if (title === "category") {
      console.log(array);
      array.sort();
    } else {
      console.log(array, title);

      array.sort((a, b) => {
        let i = 0;
        // console.log(a, b)
        while (i < title.length) {
          // console.log(title[i])
          a = a[title[i]];
          b = b[title[i]];
          i++;
        }
        console.log(a, b);

        if (a < b) {
          return -1;
        }
        if (a > b) {
          return 1;
        }
        return 0;
      });
    }
    !recipeOrder && array.reverse();
    setRecipeOrder(!recipeOrder);
  };

  const mapRecipes = (array, str) => {
    const headerTitles = ["Recipe", "Kl", "Category"];
    return (
      <div className="recipe-list">
        <div className="recipe-list-title">
          <div className="title">
            <h3>Recipes   </h3> <p>&nbsp;&nbsp;for { user && user.username }</p>
          </div>
          <div className="controls">
            <select>
              {headerTitles.map((title) => (
                <option>{title}</option>
              ))}
            </select>
            {!renderType ? (
              <ion-icon
                className="list-type-icon"
                name="list-outline"
                onClick={changeView}
              ></ion-icon>
            ) : (
              <ion-icon
                className="list-type-icon"
                name="grid-outline"
                onClick={changeView}
              ></ion-icon>
            )}
          </div>
        </div>

        {/* <div className="recipe-list-header">
          {headerTitles.map((title, idx) => {
            return (
              <div
                key={idx}
                // style={{ display: display }}
                onClick={() => sortRecipes(array, title)}
              >
                {title}
              </div>
            );
          })}
        </div> */}
        <div
          className={`${
            renderType ? "recipe-grid-results" : "recipe-list-results"
          }`}
        >
          {array.map((recipe, idx) => (
            <div
              className={`${
                renderType ? "recipe-detail-grid" : "recipe-detail-item"
              }`}
              key={idx}
            >
              {renderType === false
                ? renderList(recipe, idx, str)
                : renderGrid(recipe, idx, str)}
            </div>
          ))}
        </div>
      </div>
    );
  };
  const renderGrid = (recipe, idx, str) => {
    return (
      <>
        <img className="recipe-pic" src={recipe.imgURL} />
        <div className="recipe-name">{recipe.name}</div>
      </>
    );
  };

  const renderList = (recipe, idx, str) => {
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
            <div className="username">{recipe.user.username}</div>
          )}
          {/* <img src = {recipe.imgURL}/> */}
        </Link>
        {str === "Recipes" && (
          <div
            className="delete-x"
            onClick={() => deleteRecipeMsg(recipe._id, recipe.name)}
          >
            X
          </div>
        )}
      </>
    );
  };

  const listView = (recipe, idx, str) => {
    return <img className="recipe-img" src={recipe.imgURL} />;
  };

  const changeView = () => {
    setRenderType(!renderType);
  };

  return !recipes ? (
    <div>...loading</div>
  ) : (
    <div className="recipes">
      {searchString.length > 2
        ? mapRecipes(filteredRecipes, "searched recipes")
        : userRecipes
        ? mapRecipes(userRecipes, "Recipes")
        : mapRecipes(recipes, "all recipes")}
    </div>
  );
};

export default Recipes;

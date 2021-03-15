import React, { useState, useEffect } from "react";
import RecipesList from "./RecipesList";
import "./Recipes.scss";
import { useLocation } from "react-router-dom";
import { getRecipes, getUserRecipes, searchRecipes } from "../Services/recipes";
import { sortRecipes } from "./Helpers";

// import { deleteRecipe } from "../Services/recipes";

const Recipes = (props) => {
  const [recipeOrder, setRecipeOrder] = useState(true);
  const [appWidth, setAppWidth] = useState(0);
  const [renderType, setRenderType] = useState(false);
  const [userRecipes, setUserRecipes] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [searchedRecipes, setSearchedRecipes] = useState([]);
  const [select, setSelect] = useState();
  const [buttonStatus, setButtonStatus] = useState('all recipes');
  const { searchString, user } = props;
  const location = useLocation();

  useEffect(() => {
    setAppWidth(props.appWidth.current && props.appWidth.current.clientWidth);
    const getAllRecipes = async () => {
      // console.log('user')
      const resp = await getRecipes();
      setRecipes(resp);
    };
    getAllRecipes();
  }, [props.appWidth, props.setAppWidth]);

  useEffect(() => {
    const userRecipes = async () => {
      // console.log(user)
      const resp = user && (await getUserRecipes(user._id || user.id));
      // console.log(resp)
      setUserRecipes(resp);
    };
    userRecipes();
  }, [user]);

  // useEffect(() => {
  //   const matchingRecipes =
  //     recipes.length &&
  //     setSearchedRecipes(
  //       recipes.filter((recipe, idx) => {
  //         return recipe.name
  //           .toLowerCase()
  //           .includes(location.state.toLowerCase());
  //       })
  //     );
  // }, [location]);

  // const deleteRecipeMsg = async (id, name) => {
  //   let confirmResp = window.confirm(`are you sure you want to delete ${name}`);
  //   if (confirmResp) {
  //     await deleteRecipe(id);

  //     const newUserRecipes = userRecipes.filter((rec, idx) => rec._id !== id);

  //     setUserRecipes(newUserRecipes);
  //   }
  // };

  const sortRecipeOrder = (array, title) => {
    console.log(array, title);
    sortRecipes(array, title);
    !recipeOrder && array.reverse();
    setRecipeOrder(!recipeOrder);
  };

  const getAllRecipes = async () => {
    if (buttonStatus === 'all recipes') {
      const recs = await getRecipes();
      setRecipes(await getRecipes());
      setSearchedRecipes([]);
      setUserRecipes([]);
      setButtonStatus('my recipes');
    } else {
      const resp = user && (await getUserRecipes(user._id || user.id));
      setUserRecipes(resp);

      setButtonStatus("all recipes");
    }

  };

  const mapRecipes = (array, str) => {
    // console.log(array, str);
    const headerTitles = ["Recipe", "Calories", "Category"];
    return (
      <div className="recipe-list">
        <div className="recipe-list-title">
          <div className="title">
            <h3>{str}</h3>
          </div>

          <div className="controls">
            <select onChange={(e) => sortRecipeOrder(array, e.target.value)}>
              {headerTitles.map((title, index) => (
                <option key={index} value={title}>
                  {title}
                </option>
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

        {!renderType && (
          <div className="recipe-list-header">
            {headerTitles.map((title, idx) => {
              return (
                <div
                  key={idx}
                  // style={{ display: display }}
                  onClick={() => sortRecipeOrder(array, title)}
                >
                  {str !== "searched recipes" && title === "user" ? "" : title}
                </div>
              );
            })}
          <button className='list-type' onClick={() => getAllRecipes()}>{buttonStatus}</button>

          </div>

        )}
        {/* {console.log(array)} */}
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
              {/* {console.log(recipe)} */}
              <RecipesList
                type={renderType === false ? "list" : "grid"}
                recipe={recipe}
                idx={idx}
                str={str}
                appWidth={appWidth}
              />
            </div>
          ))}
        </div>
      </div>
    );
  };

  // const listView = (recipe, idx, str) => {
  //   return <img className="recipe-img" src={recipe.imgURL} />;
  // };

  const changeView = () => {
    setRenderType(!renderType);
  };

  return !recipes ? (
    <div>{}...loading</div>
  ) : (
    <div className="recipes">
      {/* {console.log('here', searchedRecipes, user, userRecipes && userRecipes, recipes)} */}
      {searchedRecipes.length !== 0
        ? mapRecipes(searchedRecipes, "searched recipes")
        : user
        ? userRecipes && userRecipes.length
          ? mapRecipes(userRecipes, `${user && user.username}'s recipes`)
          : mapRecipes(recipes, "all recipes")
        : mapRecipes(recipes, "all recipes")}
      {/* // : mapRecipes(recipes, "all recipes")}{" "} */}
    </div>
  );
};

export default Recipes;

import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import { Route, Switch, useHistory } from "react-router-dom";
import { removeToken } from "./Services/auth";
// import axios from "axios"
import Splash from "./Components/Splash";
import RecipeDetail from "./Components/RecipeDetail";
import Recipes from "./Components/Recipes";
import Layout from "./Components/Shared/Layout";
import About from "./Components/About";
import SignUp from "./Components/Auth/SignUp";
import SignIn from "./Components/Auth/SignIn";
import { getRecipes } from './Services/recipes'

import { verifyUser } from "./Services/auth";

function App(props) {
  const [recipes, setRecipes] = useState([]);
  const [sidebar, setSidebar] = useState(false);
  const [user, setUser] = useState(null);
  const [userRecipes, setUserRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [searchString, setSearchString] = useState("");

  const history = useHistory();
  const appWidth = useRef(null);

  useEffect(() => {
    const getUser = async () => {
      const user = await verifyUser();
      setUser(user.user);
      const recipes = await getRecipes()
      setRecipes(recipes)
    };
    getUser();
  }, []);

   const handleLogout = () => {
    setSidebar(!sidebar);
    setUser(null);
    localStorage.removeItem("token");
    removeToken();
    history.push("/");
  };
  const handleChange = (e) => {
    if (e.target.value.length > 2) {
    //   const matchingRecipes = recipes.filter((recipe, idx) => {
    //     return recipe.name.includes(e.target.value);
    //   });

    //   if (matchingRecipes.length > 0) {
    //     history.push({path:"/recipes", search: e.target.value});
    //   }
    //   setFilteredRecipes(matchingRecipes);
    // } else {
      console.log('here')
      history.push({pathname:'/recipes', state:e.target.value});
      setFilteredRecipes([]);
    }
    setSearchString(e.target.value);
  };

  return (
    <div className="App" ref={appWidth}>
      {console.log("app render")}
      <Layout
        user={user}
        appWidth={appWidth}
        sidebar={sidebar}
        setSidebar={setSidebar}
        handleLogout={handleLogout}
        recipes={recipes}
        handleChange={handleChange}
        searchString={searchString}
      >
        <Switch>
          <Route exact path="/">
            <Splash user={user} />
          </Route>

          {/* <Route exact path="/recipes/search">
            <Recipes
              recipes={recipes}
              userRecipes={userRecipes}
              handleChange={handleChange}
              searchString={searchString}
              filteredRecipes={filteredRecipes}
              appWidth={appWidth}
            />
          </Route> */}
          <Route exact path="/recipes">
            <Recipes
              recipes={recipes}
              userRecipes={userRecipes}
              setUserRecipes={setUserRecipes}
              handleChange={handleChange}
              searchString={searchString}
              filteredRecipes={filteredRecipes}
              appWidth={appWidth}
              user={user}
            />
          </Route>

          <Route exact path="/recipes/:id">
            <RecipeDetail
              recipes={recipes}
              sidebar={sidebar}
              userRecipes={userRecipes}
              setUserRecipes={setUserRecipes}
              user={user}
              filteredRecipes={filteredRecipes}
              setRecipes={setRecipes}
            />
          </Route>
          <Route exact path="/about">
            <About />
          </Route>

          <Route
            path="/signin"
            render={(props) => (
              <SignIn {...props} user={user} setUser={setUser} />
            )}
          />
          <Route
            path="/signup"
            render={(props) => <SignUp {...props} setUser={setUser} />}
          />
        </Switch>
      </Layout>
    </div>
  );
}

export default App;

import React, { useState, useEffect, useRef } from "react"
import "./App.css"
import { Route, Switch, useHistory } from "react-router-dom"
import { removeToken } from "./Services/auth"
// import axios from "axios"
import Splash from "./Components/Splash"
import RecipeDetail from "./Components/RecipeDetail"
import Recipes from "./Components/Recipes"
import Layout from "./Components/Layout"
import About from "./Components/About"
import SignUp from "./Screens/SignUp"
import SignIn from "./Screens/SignIn"

import { verifyUser } from "./Services/auth"
import { getRecipes, getUserRecipes } from "./Services/recipes"

function App(props) {
  const [recipes, setRecipes] = useState([])
  const [sidebar, setSidebar] = useState(false)
  const [user, setUser] = useState(null)
  const [userRecipes, setUserRecipes] = useState([])
  const history = useHistory()
  const appWidth = useRef(null)

  useEffect(() => {
    const getData = async () => {
      console.log(await getRecipes())

      const user = await verifyUser()
      user && setUser(user.user)
      console.log(user.user.id)
      const recipes = await getRecipes()
      setRecipes(recipes)
      console.log(user)
      const userRecipes = await getUserRecipes(user.user.id)
      console.log(userRecipes)
      setUserRecipes(userRecipes)
    }
    getData()
  }, [])

  const handleLogout = () => {
    setSidebar(!sidebar)
    setUser(null)
    localStorage.removeItem("token")
    removeToken()
    history.push("/")
  }

  return (
    <div className="App" ref={appWidth}>
      <Layout
        user={user}
        appWidth={appWidth}
        sidebar={sidebar}
        setSidebar={setSidebar}
        handleLogout={handleLogout}
      >
        <Switch>
          <Route exact path="/">
            <Splash />
          </Route>
          <Route exact path="/recipes">
            <Recipes recipes={recipes} userRecipes={userRecipes} />
          </Route>

          <Route exact path="/recipes/:id">
            <RecipeDetail recipes={recipes} sidebar={sidebar} user={user} />
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
  )
}

export default App

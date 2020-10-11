import React, { useState, useEffect } from "react"
import "./App.css"
import { Route, Switch } from "react-router-dom"
// import axios from "axios"
import Splash from "./Components/Splash"
import Home from "./Components/Home"
import Nav from "./Components/Nav"
import Recipes from "./Components/Recipes"
import Recipe from "./Components/Recipe"
import Layout from "./Components/Layout"
import axios from "axios"
import apiUrl from './apiConfig'

function App() {
  const [recipes, setRecipes] = useState([])

  useEffect(() => {
    const getRecipes = async () => {
      const resp = await axios.get(`${apiUrl}/recipes`)
      setRecipes(resp.data)
    }
    getRecipes()
  }, [])

  return (
    <div className="App">
      <Layout>
        <Switch>
          <Route exact path="/">
            <Splash />
          </Route>
          <Route exact path="/recipes">
            <Recipes recipes={recipes} />
          </Route>
          <Route exact path="/recipes/new">
            <Home />
          </Route>
          <Route exact path="/recipes/:id">
            <Home recipes={recipes} />
          </Route>
        </Switch>
      </Layout>
    </div>
  )
}

export default App

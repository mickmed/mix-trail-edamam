import React, { useState, useEffect, useRef } from "react"
import "./App.css"
import { Route, Switch } from "react-router-dom"
// import axios from "axios"
import Splash from "./Components/Splash"
import Home from "./Components/Home"
import Nav from "./Components/Header"
import Recipes from "./Components/Recipes"
import Recipe from "./Components/Recipe"
import RecipeCreate from './Components/RecipeCreate'
import Layout from "./Components/Layout"
import axios from "axios"
import apiUrl from "./Components/apiConfig"
import About from "./Components/About"


function App() {
  const [recipes, setRecipes] = useState([])
  const [sidebar, setSidebar] = useState(false)
  const [shoonga, setShoonga] = useState(false)
  const appWidth = useRef(null)

  useEffect(()=>{
    console.log(appWidth.current.clientWidth)

  }, [])
  useEffect(() => {
    const getRecipes = async () => {
      console.log(apiUrl)
      const resp = await axios.get(`${apiUrl}/recipes`)
      setRecipes(resp.data)
    }
    getRecipes()
  }, [])

  
  return (
    <div className="App" ref={appWidth}>
      <Layout appWidth={appWidth} sidebar={sidebar} setSidebar={setSidebar}>
        <Switch>

          <Route exact path="/">
            <Splash />
          </Route>
          <Route exact path="/recipes">
            <Recipes recipes={recipes} />
          </Route>
          {/* <Route exact path="/recipes/new">
            <RecipeCreate />
          </Route> */}
          <Route exact path="/recipes/:id">
            <Home recipes={recipes} sidebar={sidebar} />
          </Route>
          <Route exact path="/about">
            <About />
          </Route>
          
        </Switch>
      </Layout>
    </div>
  )
}

export default App

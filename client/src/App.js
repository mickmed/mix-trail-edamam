import React from "react"
import "./App.css"
import { Route, Switch } from "react-router-dom"
// import axios from "axios"
import Splash from "./Components/Splash"
import Home from "./Components/Home"
import Nav from "./Components/Nav"
import Recipes from './Components/Recipes'
import Recipe from './Components/Recipe'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Nav />
      </header>
      <Switch>
        <Route exact path="/">
          <Splash />
        </Route>
        <Route path="/home">
          <Home></Home>
        </Route>
        <Route path="/recipes">
          <Recipes />
        </Route>
        <Route>
          <Recipe path='recipe/:id'/>
        </Route>
      </Switch>
    </div>
  )
}

export default App

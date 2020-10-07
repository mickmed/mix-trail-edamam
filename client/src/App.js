import React from "react"
import "./App.css"
import { Route, Switch } from "react-router-dom"
// import axios from "axios"
import Splash from './Components/Splash'
import Home from "./Components/Home"
// import Layout from "./Components/Layout"
import Nav from "./Components/Nav"

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Nav />
      </header>
      <Switch>
        <Route exact path ='/'>
          <Splash/>
        </Route>
        <Route path="/home">

          <Home></Home>
        </Route>
      </Switch>
    </div>
  )
}

export default App

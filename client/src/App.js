import React from "react"
import "./App.css"
import { Route, Switch } from "react-router-dom"
// import axios from "axios"
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
        <Route path="/">
          <Home></Home>
        </Route>
      </Switch>
    </div>
  )
}

export default App

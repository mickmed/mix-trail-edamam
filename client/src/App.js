import React, { useState, useEffect, useRef } from "react"
import "./App.scss"
import { Route, Switch } from "react-router-dom"
import axios from "axios"
import Home from "./Components/Home"
import Layout from "./Components/Layout"
import Nav from "./Components/Nav"

function App() {
  // // const [search, setSearch] = useState("")
  // const [currentItem, setCurrentItem] = useState([])
  // // const [items, setItems] = useState([])
  // const [nutrients, setNutrients] = useState()
  // const [loaded, setLoaded] = useState(false)

  

  
 
  

  // const handleUpdate = async (id, value) => {

  //   let resp = await getItem(value, 1)
  //   console.log(resp)
    
  //   setItems(prevState=>{
  //     let removed = prevState.splice(id, 1, resp)
  //     return([...prevState])
  //   })
      
  // }

  // const handleSubmit = (e) => {
  //   e.preventDefault()

  //   getQueryData()
  // }

  // const handleClick = (search) => {
  //   getQueryData(search)
  // }

  // if (!loaded) {
  //   return <h1>Loading...</h1>
  // }

  return (
    <div className="App">
      <header className="App-header">
        <Nav
        
        />
      </header>
      <Switch>
        <Route path="/">
          <Home
        
          ></Home>
        </Route>
      </Switch>
    </div>
  )
}

export default App

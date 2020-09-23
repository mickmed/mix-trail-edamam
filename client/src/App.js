import React, { useState, useEffect, useRef } from "react"
import "./App.scss"
import { Route, Switch } from "react-router-dom"
import axios from "axios"
import Home from "./Components/Home"
import Layout from "./Components/Layout"
import Nav from "./Components/Nav"
import { getItem } from "./Components/ApiHelper"

function App() {
  const [suggestions, setSuggestions] = useState("")
  const [search, setSearch] = useState("")
  const [currentItem, setCurrentItem] = useState([])
  const [items, setItems] = useState([])
  const [nutrients, setNutrients] = useState()
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    console.log("use")
    setSearch("")
  }, [])

  const getQueryData = async () => {
    let itemResp = await getItem(search, 1)
    setItems((prevState) => [...prevState, itemResp])
    // setNutrients(nutsResp.data)
    // setLoaded(true)
  }
  const getSuggestions = () => {
    const suggestions = getItem(search, 20)
    setSuggestions(suggestions)
  }
  const handleChange = (e) => {
    setSearch(e.target.value)
    e.target.value.length > 3 && getSuggestions(e.target.value)
  }

  const handleUpdate = async (id, value) => {

    let resp = await getItem(value, 1)
    items.splice(id, 1, resp)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    getQueryData()
  }

  const handleClick = (search) => {
    getQueryData(search)
  }

  // if (!loaded) {
  //   return <h1>Loading...</h1>
  // }

  return (
    <div className="App">
      <header className="App-header">
        <Nav
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          handleClick={handleClick}
          search={search}
          suggestions={suggestions}
        />
      </header>
      <Switch>
        <Route path="/">
          <Home
            search={search}
            nutrients={nutrients}
            currentItem={currentItem}
            items={items}
            setItems={setItems}
            suggestions={suggestions}
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            handleUpdate={handleUpdate}
          ></Home>
        </Route>
      </Switch>
    </div>
  )
}

export default App

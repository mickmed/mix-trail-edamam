import React, { useState, useEffect } from "react"
import "./App.scss"
import { Route, Switch } from "react-router-dom"
import axios from "axios"
import Home from "./Components/Home"
import Layout from "./Components/Layout"
import Nav from "./Components/Nav"

function App() {
  const [search, setSearch] = useState("4 eggs")
  const [currentItem, setCurrentItem] = useState([])
  const [items, setItems] = useState([])
  const [nutrients, setNutrients] = useState()
  const [loaded, setLoaded] = useState(false)
  const configHeaders = {
    headers: {
      "x-app-id": process.env.REACT_APP_NUTRITIONIX_X_APP_ID,
      "x-app-key": process.env.REACT_APP_NUTRITIONIX_X_APP_KEY,
      "x-remote-user-id": process.env.REACT_APP_NUTRITIONIX_X_REMOTE_USER_ID,
    },
  }

  useEffect(() => {
    console.log("use")
    getQueryData()
  }, [])

  const getQueryData = async () => {
    const appId = process.env.REACT_APP_EDAMAM_NUTRITION_DATA_APP_ID
    const appKey = process.env.REACT_APP_EDAMAM_NUTRITION_DATA_APP_KEY
    const url = `https://api.edamam.com/api/nutrition-data?app_id=${appId}&app_key=${appKey}&ingr=${search} `
   
    const itemResp = await axios(url)
    // const itemResp = await axios(
    //   `https://trackapi.nutritionix.com/v2/search/instant?query=${search}`,
    //   configHeaders
    // )
    // const nutsResp = await axios.post(
    //   `https://trackapi.nutritionix.com/v2/natural/nutrients`,
    //   {
    //     query: `${search}`,
    //   },
    //   configHeaders
    // )

    // console.log(itemResp.data)
    setCurrentItem(itemResp.data)
    setItems((prevState) => [...prevState, itemResp.data])
    // setNutrients(nutsResp.data)
    setLoaded(true)
  }

  const handleChange = (e) => {
    setSearch(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    getQueryData()
  }

  if (!loaded) {
    return <h1>Loading...</h1>
  }

  return (
    <div className="App">
      <header className="App-header">
        <Nav
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          search={search}
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
          ></Home>
        </Route>
      </Switch>
    </div>
  )
}

export default App

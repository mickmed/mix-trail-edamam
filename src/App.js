import React, { useState, useEffect } from "react"
import "./App.scss"
import { Route, Switch } from "react-router-dom"
import axios from "axios"
import Home from "./Components/Home"
import Layout from "./Components/Layout"
import Nav from "./Components/Nav"

function App() {
  const [search, setSearch] = useState("4 eggs")
  const [items, setItems] = useState([])
  const [nutrients, setNutrients] = useState()
  const [loaded, setLoaded] = useState(false)
  const configHeaders = {
    headers: {
      "x-app-id": "dac6d1da",
      "x-app-key": "bbffc1b688370fdc5263dd8179e97016",
      "x-remote-user-id": 0,
    },
  }

  useEffect(() => {
    console.log("use")
    getQueryData()
  }, [])

  const getQueryData = async () => {
    // console.log(search)
    // const url = `https://api.edamam.com/api/food-database/v2/parser?ingr=${search}&app_id=c61c44be&app_key=42a6edbcf5fc891ca1ba284f174c545c`
    // encodeURI(url)
    // console.log(url)
    const itemResp = await axios(
      `https://api.edamam.com/api/food-database/v2/parser?ingr=${search}&app_id=c61c44be&app_key=42a6edbcf5fc891ca1ba284f174c545c`
    )

    //api.edamam.com/api/food-database/v2/parser?ingr=apple&app_id=c61c44be&app_key=42a6edbcf5fc891ca1ba284f174c545c&health='vegan'
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
    console.log(itemResp.data)
    setItems(prevState=>(
     [...prevState, itemResp.data]
    ))
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
      <header className="App-header">Mix Trail</header>

      <Nav
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        search={search}
      />
      <Switch>
        <Route path="/">
          <Home nutrients={nutrients} items={items}></Home>
        </Route>
      </Switch>
    </div>
  )
}

export default App

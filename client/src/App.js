import React, { useState, useEffect, useRef } from "react"
import "./App.css"
import { Route, Switch, useHistory } from "react-router-dom"
import { removeToken } from './Services/auth'
// import axios from "axios"
import Splash from "./Components/Splash"
import Home from "./Components/Home"
import Nav from "./Components/Header"
import Recipes from "./Components/Recipes"
import Recipe from "./Components/Recipe"
import Layout from "./Components/Layout"
import axios from "axios"
import apiUrl from "./Components/apiConfig"
import About from "./Components/About"
import SignUp from "./Screens/SignUp"
import SignIn from "./Screens/SignIn"

import { verifyUser } from "./Services/auth"

function App(props) {
  const [recipes, setRecipes] = useState([])
  const [sidebar, setSidebar] = useState(false)
  const [user, setUser] = useState(null)
  const history = useHistory()
  const appWidth = useRef(null)

  useEffect(() => {
    const getRecipes = async () => {
      const resp = await axios.get(`${apiUrl}/recipes`)
      setRecipes(resp.data)
    }


    getRecipes()

    const getUser = async () => {
     
      const user = await verifyUser()
    
      user && setUser(user.user)
      console.log(user.user)
    }
    getUser()
  }, [])

  const handleLogout = () => {
    setSidebar(!sidebar)
    setUser(null);
    localStorage.removeItem('token');
    removeToken();
    history.push('/')
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
            <Recipes recipes={recipes} />
          </Route>

          <Route exact path="/recipes/:id">
            <Home recipes={recipes} sidebar={sidebar} />
          </Route>
          <Route exact path="/about">
            <About />
          </Route>

         
          <Route
            path="/signin"
            render={(props) => <SignIn {...props} user={user} setUser={setUser} />}
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

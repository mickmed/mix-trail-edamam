import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import "./Header.scss"
import Nav from "./Nav.js"
import Search from "./Search"

const Header = (props) => {
  // const appWidth = props.appWidth.current && props.appWidth.current.clientWidth

  const [width, setWidth] = useState(0)
  const [display, setDisplay] = useState()
  const { user, sidebar, setSidebar, handleChange, searchString, appWidth } = props
  useEffect(() => {
    let width = appWidth.current.clientWidth
    setWidth(width)

    setDisplay(width > 900 ? 'flex' : 'none')

    

  }, [appWidth])


  return (
    <header>
      <Link to="/">
        <h4>
          <span>S</span>caled&nbsp;
        </h4>
        {/* <p className="attribution">Powered by Nutritionix</p> */}
      </Link>

      {
        width > 900 && <Nav style={{display:display}} user={user} sidebar={sidebar} setSidebar={setSidebar} />
      }

      <Search handleChange={handleChange} searchString={searchString}></Search>
      {user ? (
        <div className="username" onClick={() => setSidebar(!sidebar)}>
          {user.username.charAt(0)}
        </div>
      ) : width < 900 ? (
        <div className="burger" onClick={() => props.setSidebar(!sidebar)}>
          <ion-icon name="menu-outline"></ion-icon>
        </div>
      ) : (
        <Link to="/signin">
          <div className="menu-items">
            <ion-icon name="person-outline"></ion-icon>
          </div>
        </Link>
      )}

      {/* {user ? (
        <Link>
          <div className="username" onClick={() => setSidebar(!sidebar)}>
            {console.log(user)}
            {user.username.charAt(0)}
          </div>
        </Link>
      ) : (
        <Link to="/signin">
          <div className="menu-items">
            <ion-icon name="person-outline"></ion-icon>
          </div>
        </Link>
      )} */}
    </header>
  )
}

export default Header

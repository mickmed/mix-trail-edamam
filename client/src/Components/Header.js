import React from "react"
import { useHistory, Link } from "react-router-dom"
import "./Header.scss"
import Nav from "./Nav"
import Search from "./Search"

const Header = (props) => {
  const appWidth = props.appWidth.current && props.appWidth.current.clientWidth
  const { user, sidebar, setSidebar, handleChange, searchString } = props

  // const style = appWidth < 600 ? { position: "relative", top: "100%" } : {}
  console.log("appWidth", appWidth)
  return (
    <header>
      <Link to="/">
        <h4>
          <span>S</span>caled&nbsp;
        </h4>
        {/* <p className="attribution">Powered by Nutritionix</p> */}
      </Link>

     {console.log("appWidth", appWidth)}
     {<Nav user={user} sidebar={sidebar} setSidebar={setSidebar} />}

      <Search handleChange={handleChange} searchString={searchString}></Search>
      {user ? (
        <div className="username" onClick={() => setSidebar(!sidebar)}>
          {console.log(user)}
          {user.username.charAt(0)}
        </div>
      ) : appWidth < 900 ? (
        <div className="burger" onClick={() => props.setSidebar(!sidebar)}>
          {console.log("less than no user")}
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

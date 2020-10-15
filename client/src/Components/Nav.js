import React from "react"
import { Link } from "react-router-dom"
import "./nav.scss"
import Search from "./Search.js"
// import SearchBar from "./SearchBar.js"

const Nav = (props) => {
  return (
    <header className="nav">
      <Link to="/">
        <h4>
          <span>S</span>caled&nbsp;
        </h4>
      </Link>
      <Link to='/recipes'><div>My Recipes</div></Link>
      <Link to='/recipes/new'><div>New Recipe</div></Link>
      <Link to='/about'><div>About</div></Link>


      


    </header>
  )
}

export default Nav

import React from "react"
import { Link } from "react-router-dom"
import "./nav.scss"
import Search from "./Search.js"
// import SearchBar from "./SearchBar.js"

const Nav = (props) => {
  return (
    <div className="nav">
      <Link to="/">
        <h4>
          <span>S</span>caled&nbsp;
        </h4>
        {/* <p>scale your nutrients</p> */}
      </Link>
    </div>
  )
}

export default Nav

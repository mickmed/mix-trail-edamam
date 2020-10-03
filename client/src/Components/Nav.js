import React from "react"
// import { Link } from "react-router-dom"
import "./nav.scss"
import Search from "./Search.js"
// import SearchBar from "./SearchBar.js"


const Nav = (props) => {
  const { handleChange, handleSubmit, search } = props
  // console.log(suggestions.foods)
  return (
    <div className="nav">
       <h4>Mix Trail</h4>
      <Search
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        search={search}
      />
   
    </div>
  )
}

export default Nav

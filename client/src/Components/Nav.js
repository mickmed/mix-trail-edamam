import React from "react"
import { Link } from "react-router-dom"
import "./nav.scss"
import Search from "./Search.js"
import SearchBar from "./SearchBar.js"


const Nav = (props) => {
  const { handleChange, handleSubmit, handleClick, search, selections } = props
  // console.log(suggestions.foods)
  return (
    <div className="nav">
      <Search
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        search={search}
      />
      {/* <div className="selections">
        {selections.foods.map((select) => (
          <div onClick={()=>handleClick(select.description)} className="selection">{select.description}</div>
         
        ))}
      </div> */}
      {/* <SearchBar/> */}
    </div>
  )
}

export default Nav

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
       <h4>~<span>M</span>ix <span>T</span>rail~</h4>
       <p>scale your nutrients</p>
     
   
    </div>
  )
}

export default Nav

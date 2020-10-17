import React from "react"
import { useHistory, Link } from "react-router-dom"

const Nav = (props) => {
  const history = useHistory()
  const {setSidebar} = props

  let links = ["my recipes", "create a recipe", "about"]

  const closeModal = (link) => {
    setSidebar(!props.sidebar)

    link =
      link === "my recipes"
        ? "recipes"
        : link === "create a recipe"
        ? "recipes/new"
        : link === "about" && "about"
    history.push(`/${link}`)
  }
  return (
    <nav>
      {links.map((link, idx) => (
        <div onClick={() => closeModal(link)}>{link}</div>
      ))}
    </nav>
  )
}

export default Nav

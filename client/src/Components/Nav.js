import React, { useState, useEffect } from "react"
import { useHistory, Link } from "react-router-dom"

const Nav = (props) => {
  const history = useHistory()
  const { setSidebar } = props
  // const [style, setStyle] = useState()

  let links = ["my recipes", "create a recipe", "about"]

  const style = props.origin === "sidebar" ? {
    display: "flex",
    flexDirection: "column",
  } : {}

  const closeModal = (link) => {
    console.log(props.origin)
    props.origin === "sidebar" && setSidebar(!props.sidebar)

    link =
      link === "my recipes"
        ? "recipes"
        : link === "create a recipe"
        ? "recipes/new"
        : link === "about" && "about"
    history.push(`/${link}`)
  }
  return (
    <nav style={style}>
      {links.map((link, idx) => (
        <a key={idx} onClick={() => closeModal(link)}>{link}</a>
      ))}
    </nav>
  )
}

export default Nav

import React, { } from "react"
import { useHistory, Link } from "react-router-dom"
import "./Nav.scss"

const Nav = (props) => {
  const history = useHistory()
  const { sidebar, setSidebar, origin, user } = props

  let links = ["recipes", "calculate", "about"]

  const closeModal = (link) => {
    origin === "sidebar" && setSidebar(!sidebar)

    link =
      link === "recipes"
        ? "recipes"
        : link === "calculate"
        ? user
          ? "recipes/new"
          : "signin"
        : link === "about" && "about"
console.log(link)
    history.push(`/${link}`)
  }

  return (
    <nav>
      {links.map((link, idx) => (
        // link = link === 'account' && <ion-icon name="person-outline"></ion-icon>
        <a className="menu-items" key={idx} onClick={() => closeModal(link)}>
          {link}
        </a>
      ))}
    </nav>
  )
}

export default Nav
